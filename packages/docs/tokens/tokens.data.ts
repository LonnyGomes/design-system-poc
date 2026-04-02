import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tokensCssPath = path.resolve(__dirname, '../../tokens/dist/css/tokens.css');

export interface TokenEntry {
  name: string;
  value: string;
  category: string;
}

export interface TokensData {
  tokens: TokenEntry[];
}

const CATEGORY_MAP: Record<string, string> = {
  space: 'Space',
  color: 'Color',
  font: 'Font',
  shape: 'Shape',
  elevation: 'Elevation',
  motion: 'Motion',
  sizing: 'Sizing',
  opacity: 'Opacity',
  breakpoint: 'Breakpoint',
};

function deriveCategory(name: string): string {
  // name is like "--co-color-primary-base"
  const withoutPrefix = name.replace(/^--co-/, '');
  const firstSegment = withoutPrefix.split('-')[0];
  return CATEGORY_MAP[firstSegment] ?? firstSegment;
}

export default {
  watch: ['../../tokens/dist/css/tokens.css'],
  load(): TokensData {
    const css = fs.readFileSync(tokensCssPath, 'utf-8');
    const tokens: TokenEntry[] = [];
    const re = /--(co-[\w-]+)\s*:\s*([^;]+);/g;
    let match;

    while ((match = re.exec(css)) !== null) {
      const name = `--${match[1]}`;
      const value = match[2].trim();
      tokens.push({
        name,
        value,
        category: deriveCategory(name),
      });
    }

    return { tokens };
  },
};
