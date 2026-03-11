import StyleDictionary from 'style-dictionary';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Shoelace mapping generator ──────────────────────────────────────────────
// Maps --sl-* custom properties to --cb-* tokens so Shoelace picks up our theme.
function generateShoelaceMapping(dictionary) {
  const mappings = [
    // Primary
    ['--sl-color-primary-50', '--cb-color-primary-50'],
    ['--sl-color-primary-100', '--cb-color-primary-100'],
    ['--sl-color-primary-200', '--cb-color-primary-200'],
    ['--sl-color-primary-300', '--cb-color-primary-300'],
    ['--sl-color-primary-400', '--cb-color-primary-400'],
    ['--sl-color-primary-500', '--cb-color-primary-500'],
    ['--sl-color-primary-600', '--cb-color-primary-600'],
    ['--sl-color-primary-700', '--cb-color-primary-700'],
    ['--sl-color-primary-800', '--cb-color-primary-800'],
    ['--sl-color-primary-900', '--cb-color-primary-900'],

    // Neutral
    ['--sl-color-neutral-50', '--cb-color-neutral-50'],
    ['--sl-color-neutral-100', '--cb-color-neutral-100'],
    ['--sl-color-neutral-200', '--cb-color-neutral-200'],
    ['--sl-color-neutral-300', '--cb-color-neutral-300'],
    ['--sl-color-neutral-400', '--cb-color-neutral-400'],
    ['--sl-color-neutral-500', '--cb-color-neutral-500'],
    ['--sl-color-neutral-600', '--cb-color-neutral-600'],
    ['--sl-color-neutral-700', '--cb-color-neutral-700'],
    ['--sl-color-neutral-800', '--cb-color-neutral-800'],
    ['--sl-color-neutral-900', '--cb-color-neutral-900'],

    // Danger
    ['--sl-color-danger-50', '--cb-color-danger-50'],
    ['--sl-color-danger-100', '--cb-color-danger-100'],
    ['--sl-color-danger-200', '--cb-color-danger-200'],
    ['--sl-color-danger-300', '--cb-color-danger-300'],
    ['--sl-color-danger-400', '--cb-color-danger-400'],
    ['--sl-color-danger-500', '--cb-color-danger-500'],
    ['--sl-color-danger-600', '--cb-color-danger-600'],
    ['--sl-color-danger-700', '--cb-color-danger-700'],
    ['--sl-color-danger-800', '--cb-color-danger-800'],
    ['--sl-color-danger-900', '--cb-color-danger-900'],

    // Success
    ['--sl-color-success-50', '--cb-color-success-50'],
    ['--sl-color-success-100', '--cb-color-success-100'],
    ['--sl-color-success-200', '--cb-color-success-200'],
    ['--sl-color-success-300', '--cb-color-success-300'],
    ['--sl-color-success-400', '--cb-color-success-400'],
    ['--sl-color-success-500', '--cb-color-success-500'],
    ['--sl-color-success-600', '--cb-color-success-600'],
    ['--sl-color-success-700', '--cb-color-success-700'],
    ['--sl-color-success-800', '--cb-color-success-800'],
    ['--sl-color-success-900', '--cb-color-success-900'],

    // Warning
    ['--sl-color-warning-50', '--cb-color-warning-50'],
    ['--sl-color-warning-100', '--cb-color-warning-100'],
    ['--sl-color-warning-200', '--cb-color-warning-200'],
    ['--sl-color-warning-300', '--cb-color-warning-300'],
    ['--sl-color-warning-400', '--cb-color-warning-400'],
    ['--sl-color-warning-500', '--cb-color-warning-500'],
    ['--sl-color-warning-600', '--cb-color-warning-600'],
    ['--sl-color-warning-700', '--cb-color-warning-700'],
    ['--sl-color-warning-800', '--cb-color-warning-800'],
    ['--sl-color-warning-900', '--cb-color-warning-900'],

    // Typography
    ['--sl-font-sans', '--cb-font-family-sans'],
    ['--sl-font-mono', '--cb-font-family-mono'],
    ['--sl-font-size-small', '--cb-font-size-sm'],
    ['--sl-font-size-medium', '--cb-font-size-md'],
    ['--sl-font-size-large', '--cb-font-size-lg'],
    ['--sl-font-size-x-large', '--cb-font-size-xl'],

    // Spacing
    ['--sl-spacing-3x-small', '--cb-spacing-1'],
    ['--sl-spacing-2x-small', '--cb-spacing-1'],
    ['--sl-spacing-x-small', '--cb-spacing-2'],
    ['--sl-spacing-small', '--cb-spacing-3'],
    ['--sl-spacing-medium', '--cb-spacing-4'],
    ['--sl-spacing-large', '--cb-spacing-6'],
    ['--sl-spacing-x-large', '--cb-spacing-8'],
    ['--sl-spacing-2x-large', '--cb-spacing-10'],
    ['--sl-spacing-3x-large', '--cb-spacing-12'],

    // Border radius
    ['--sl-border-radius-small', '--cb-radius-sm'],
    ['--sl-border-radius-medium', '--cb-radius-md'],
    ['--sl-border-radius-large', '--cb-radius-lg'],
    ['--sl-border-radius-x-large', '--cb-radius-xl'],
    ['--sl-border-radius-pill', '--cb-radius-full'],

    // Shadows
    ['--sl-shadow-x-small', '--cb-shadow-sm'],
    ['--sl-shadow-small', '--cb-shadow-sm'],
    ['--sl-shadow-medium', '--cb-shadow-md'],
    ['--sl-shadow-large', '--cb-shadow-lg'],
    ['--sl-shadow-x-large', '--cb-shadow-xl'],

    // Transitions
    ['--sl-transition-x-fast', '--cb-transition-duration-fast'],
    ['--sl-transition-fast', '--cb-transition-duration-normal'],
    ['--sl-transition-medium', '--cb-transition-duration-slow'],
    ['--sl-transition-slow', '--cb-transition-duration-slow'],
  ];

  let css = '/* Auto-generated Shoelace → Cobalt token mapping */\n';
  css += '/* This file maps Shoelace CSS custom properties to Cobalt design tokens */\n\n';
  css += ':root {\n';
  for (const [slVar, cbVar] of mappings) {
    css += `  ${slVar}: var(${cbVar});\n`;
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
