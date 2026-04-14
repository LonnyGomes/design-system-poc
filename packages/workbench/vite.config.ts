import { defineConfig, type Plugin } from 'vite';
import { resolve } from 'path';
import { execSync } from 'child_process';

const root = resolve(__dirname);
const repoRoot = resolve(__dirname, '../..');
const componentsDir = resolve(repoRoot, 'packages/components');
const tokensDir = resolve(repoRoot, 'packages/tokens');

/** HTML entry points for the Vite multi-page app. */
const inputs: Record<string, string> = {
  main: resolve(root, 'index.html'),
  preview: resolve(root, 'preview.html'),
};

/**
 * Watches component .styles.css files and regenerates .styles.ts via
 * the existing generate-styles script.
 */
function cobaltStylesPlugin(): Plugin {
  return {
    name: 'cobalt-styles-watch',
    configureServer(server) {
      const stylesGlob = resolve(componentsDir, 'src/**/*.styles.css');
      server.watcher.add(stylesGlob);

      server.watcher.on('change', (file) => {
        if (file.endsWith('.styles.css') && file.includes(componentsDir)) {
          console.log('\n[workbench] styles.css changed, regenerating styles.ts...');
          try {
            execSync('node scripts/generate-styles.js', {
              cwd: componentsDir,
              stdio: 'pipe',
            });
            console.log('[workbench] styles regenerated.');
          } catch (err: any) {
            console.error('[workbench] style generation failed:', err.stderr?.toString());
          }
        }
      });
    },
  };
}

/**
 * Watches token source JSON files and rebuilds the token pipeline
 * when changes are detected.
 */
function cobaltTokensPlugin(): Plugin {
  return {
    name: 'cobalt-tokens-watch',
    configureServer(server) {
      const tokenSources = resolve(tokensDir, 'tokens');
      const tokenSrc = resolve(tokensDir, 'src');
      server.watcher.add([resolve(tokenSources, '**/*.json'), resolve(tokenSrc, '**/*.css')]);

      server.watcher.on('change', (file) => {
        const isTokenSource = file.includes(tokenSources) && file.endsWith('.json');
        const isTokenCss = file.includes(tokenSrc) && file.endsWith('.css');

        if (isTokenSource || isTokenCss) {
          console.log('\n[workbench] token source changed, rebuilding tokens...');
          try {
            execSync('node config.js', {
              cwd: tokensDir,
              stdio: 'pipe',
            });
            console.log('[workbench] tokens rebuilt.');

            // Trigger full CSS reload
            server.ws.send({ type: 'full-reload' });
          } catch (err: any) {
            console.error('[workbench] token build failed:', err.stderr?.toString());
          }
        }
      });
    },
  };
}

export default defineConfig({
  root,
  resolve: {
    // Array form ensures exact matching — order matters: specific paths
    // before the catch-all so '@cobalt/components/button' doesn't get
    // swallowed by the '@cobalt/components' prefix.
    alias: [
      {
        find: '@cobalt/components/button',
        replacement: resolve(componentsDir, 'src/components/button/co-button.ts'),
      },
      {
        find: '@cobalt/components/icon',
        replacement: resolve(componentsDir, 'src/components/icon/co-icon.ts'),
      },
      {
        find: '@cobalt/components',
        replacement: resolve(componentsDir, 'src/index.ts'),
      },
    ],
  },
  build: {
    rollupOptions: {
      input: inputs,
    },
  },
  plugins: [cobaltStylesPlugin(), cobaltTokensPlugin()],
});
