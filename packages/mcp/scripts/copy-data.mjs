/**
 * Copies reference data from sibling packages into data/ for bundling with the npm package.
 * Run as part of prebuild: `node scripts/copy-data.mjs`
 */

import { cpSync, mkdirSync, readdirSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const data = join(root, 'data');

// Ensure target directories exist
mkdirSync(join(data, 'docs', 'components'), { recursive: true });

const copies = [
  {
    src: resolve(root, '..', 'components', 'custom-elements.json'),
    dest: join(data, 'custom-elements.json'),
  },
  {
    src: resolve(root, '..', 'tokens', 'dist', 'tokens.json'),
    dest: join(data, 'tokens.json'),
  },
  {
    src: resolve(root, '..', 'docs', 'contributing', 'coding-standards.md'),
    dest: join(data, 'docs', 'coding-standards.md'),
  },
  {
    src: resolve(root, '..', 'docs', 'getting-started', 'developers.md'),
    dest: join(data, 'docs', 'developers.md'),
  },
];

// Copy individual files
for (const { src, dest } of copies) {
  try {
    cpSync(src, dest);
    console.log(`Copied ${src} → ${dest}`);
  } catch (err) {
    console.warn(`Warning: could not copy ${src}: ${err.message}`);
  }
}

// Copy all component docs
const componentDocsDir = resolve(root, '..', 'docs', 'components');
try {
  const files = readdirSync(componentDocsDir).filter((f) => f.endsWith('.md'));
  for (const file of files) {
    cpSync(join(componentDocsDir, file), join(data, 'docs', 'components', file));
    console.log(`Copied component doc: ${file}`);
  }
} catch (err) {
  console.warn(`Warning: could not copy component docs: ${err.message}`);
}

console.log('Data copy complete.');
