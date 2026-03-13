import StyleDictionary from 'style-dictionary';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Shoelace mapping generator ──────────────────────────────────────────────
// Maps --sl-* custom properties to --co-* tokens so Shoelace picks up our theme.
function generateShoelaceMapping(dictionary) {
  const mappings = [
    // Primary
    ['--sl-color-primary-50', '--co-color-primary-50'],
    ['--sl-color-primary-100', '--co-color-primary-100'],
    ['--sl-color-primary-200', '--co-color-primary-200'],
    ['--sl-color-primary-300', '--co-color-primary-300'],
    ['--sl-color-primary-400', '--co-color-primary-400'],
    ['--sl-color-primary-500', '--co-color-primary-500'],
    ['--sl-color-primary-600', '--co-color-primary-600'],
    ['--sl-color-primary-700', '--co-color-primary-700'],
    ['--sl-color-primary-800', '--co-color-primary-800'],
    ['--sl-color-primary-900', '--co-color-primary-900'],

    // Neutral
    ['--sl-color-neutral-50', '--co-color-neutral-50'],
    ['--sl-color-neutral-100', '--co-color-neutral-100'],
    ['--sl-color-neutral-200', '--co-color-neutral-200'],
    ['--sl-color-neutral-300', '--co-color-neutral-300'],
    ['--sl-color-neutral-400', '--co-color-neutral-400'],
    ['--sl-color-neutral-500', '--co-color-neutral-500'],
    ['--sl-color-neutral-600', '--co-color-neutral-600'],
    ['--sl-color-neutral-700', '--co-color-neutral-700'],
    ['--sl-color-neutral-800', '--co-color-neutral-800'],
    ['--sl-color-neutral-900', '--co-color-neutral-900'],

    // Danger
    ['--sl-color-danger-50', '--co-color-danger-50'],
    ['--sl-color-danger-100', '--co-color-danger-100'],
    ['--sl-color-danger-200', '--co-color-danger-200'],
    ['--sl-color-danger-300', '--co-color-danger-300'],
    ['--sl-color-danger-400', '--co-color-danger-400'],
    ['--sl-color-danger-500', '--co-color-danger-500'],
    ['--sl-color-danger-600', '--co-color-danger-600'],
    ['--sl-color-danger-700', '--co-color-danger-700'],
    ['--sl-color-danger-800', '--co-color-danger-800'],
    ['--sl-color-danger-900', '--co-color-danger-900'],

    // Success
    ['--sl-color-success-50', '--co-color-success-50'],
    ['--sl-color-success-100', '--co-color-success-100'],
    ['--sl-color-success-200', '--co-color-success-200'],
    ['--sl-color-success-300', '--co-color-success-300'],
    ['--sl-color-success-400', '--co-color-success-400'],
    ['--sl-color-success-500', '--co-color-success-500'],
    ['--sl-color-success-600', '--co-color-success-600'],
    ['--sl-color-success-700', '--co-color-success-700'],
    ['--sl-color-success-800', '--co-color-success-800'],
    ['--sl-color-success-900', '--co-color-success-900'],

    // Warning
    ['--sl-color-warning-50', '--co-color-warning-50'],
    ['--sl-color-warning-100', '--co-color-warning-100'],
    ['--sl-color-warning-200', '--co-color-warning-200'],
    ['--sl-color-warning-300', '--co-color-warning-300'],
    ['--sl-color-warning-400', '--co-color-warning-400'],
    ['--sl-color-warning-500', '--co-color-warning-500'],
    ['--sl-color-warning-600', '--co-color-warning-600'],
    ['--sl-color-warning-700', '--co-color-warning-700'],
    ['--sl-color-warning-800', '--co-color-warning-800'],
    ['--sl-color-warning-900', '--co-color-warning-900'],

    // Typography
    ['--sl-font-sans', '--co-font-family-sans'],
    ['--sl-font-mono', '--co-font-family-mono'],
    ['--sl-font-size-small', '--co-font-size-sm'],
    ['--sl-font-size-medium', '--co-font-size-md'],
    ['--sl-font-size-large', '--co-font-size-lg'],
    ['--sl-font-size-x-large', '--co-font-size-xl'],

    // Spacing
    ['--sl-spacing-3x-small', '--co-spacing-1'],
    ['--sl-spacing-2x-small', '--co-spacing-1'],
    ['--sl-spacing-x-small', '--co-spacing-2'],
    ['--sl-spacing-small', '--co-spacing-3'],
    ['--sl-spacing-medium', '--co-spacing-4'],
    ['--sl-spacing-large', '--co-spacing-6'],
    ['--sl-spacing-x-large', '--co-spacing-8'],
    ['--sl-spacing-2x-large', '--co-spacing-10'],
    ['--sl-spacing-3x-large', '--co-spacing-12'],

    // Border radius
    ['--sl-border-radius-small', '--co-radius-sm'],
    ['--sl-border-radius-medium', '--co-radius-md'],
    ['--sl-border-radius-large', '--co-radius-lg'],
    ['--sl-border-radius-x-large', '--co-radius-xl'],
    ['--sl-border-radius-pill', '--co-radius-full'],

    // Shadows
    ['--sl-shadow-x-small', '--co-shadow-sm'],
    ['--sl-shadow-small', '--co-shadow-sm'],
    ['--sl-shadow-medium', '--co-shadow-md'],
    ['--sl-shadow-large', '--co-shadow-lg'],
    ['--sl-shadow-x-large', '--co-shadow-xl'],

    // Transitions
    ['--sl-transition-x-fast', '--co-transition-duration-fast'],
    ['--sl-transition-fast', '--co-transition-duration-normal'],
    ['--sl-transition-medium', '--co-transition-duration-slow'],
    ['--sl-transition-slow', '--co-transition-duration-slow'],
  ];

  let css = '/* Auto-generated Shoelace → Cobalt token mapping */\n';
  css += '/* This file maps Shoelace CSS custom properties to Cobalt design tokens */\n\n';
  css += ':root {\n';
  for (const [slVar, coVar] of mappings) {
    css += `  ${slVar}: var(${coVar});\n`;
  }
  css += '}\n';
  return css;
}

// ── Light theme build ───────────────────────────────────────────────────────
const lightSD = new StyleDictionary({
  source: ['src/global/**/*.json', 'src/semantic/color.light.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/css/',
      prefix: '',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            selector: ':root',
            outputReferences: true,
          },
        },
      ],
    },
    scss: {
      transformGroup: 'scss',
      buildPath: 'dist/scss/',
      files: [
        {
          destination: '_tokens.scss',
          format: 'scss/variables',
          options: { outputReferences: true },
        },
      ],
    },
    js: {
      transformGroup: 'js',
      buildPath: 'dist/js/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6',
        },
      ],
    },
    json: {
      transformGroup: 'js',
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json/flat',
        },
      ],
    },
  },
});

// ── Dark theme build ────────────────────────────────────────────────────────
const darkSD = new StyleDictionary({
  source: ['src/global/**/*.json', 'src/semantic/color.dark.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'tokens-dark.css',
          format: 'css/variables',
          options: {
            selector: '[data-theme="dark"]',
            outputReferences: true,
          },
        },
      ],
    },
  },
});

async function build() {
  console.log('Building light tokens...');
  await lightSD.buildAllPlatforms();

  console.log('Building dark tokens...');
  await darkSD.buildAllPlatforms();

  // Generate Shoelace mapping
  console.log('Generating Shoelace mapping...');
  const mappingCSS = generateShoelaceMapping();
  mkdirSync(join(__dirname, 'dist/css'), { recursive: true });
  writeFileSync(join(__dirname, 'dist/css/shoelace-mapping.css'), mappingCSS);

  // Generate TypeScript declarations
  console.log('Generating TypeScript declarations...');
  const jsContent = readFileSync(join(__dirname, 'dist/js/tokens.js'), 'utf-8');
  const dtsLines = jsContent
    .split('\n')
    .filter((line) => line.startsWith('export const'))
    .map((line) => {
      const match = line.match(/export const (\w+)/);
      return match ? `export declare const ${match[1]}: string;` : '';
    })
    .filter(Boolean);
  writeFileSync(join(__dirname, 'dist/js/tokens.d.ts'), dtsLines.join('\n') + '\n');

  console.log('Token build complete!');
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
