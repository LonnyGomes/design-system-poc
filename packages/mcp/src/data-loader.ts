import { readFileSync, readdirSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(__dirname, '..', 'data');

function readJson<T>(relativePath: string): T {
  const content = readFileSync(join(dataDir, relativePath), 'utf-8');
  return JSON.parse(content) as T;
}

function readText(relativePath: string): string {
  return readFileSync(join(dataDir, relativePath), 'utf-8');
}

// --- Custom Elements Manifest types ---

interface CemMember {
  kind: string;
  name: string;
  type?: { text: string };
  default?: string;
  description?: string;
  attribute?: string;
  reflects?: boolean;
  privacy?: string;
  readonly?: boolean;
}

interface CemEvent {
  name: string;
  type?: { text: string };
  description?: string;
}

interface CemSlot {
  name: string;
  description?: string;
}

interface CemCssPart {
  name: string;
  description?: string;
}

interface CemDeclaration {
  kind: string;
  name: string;
  tagName?: string;
  summary?: string;
  description?: string;
  customElement?: boolean;
  members?: CemMember[];
  events?: CemEvent[];
  slots?: CemSlot[];
  cssParts?: CemCssPart[];
}

interface CemModule {
  kind: string;
  path: string;
  declarations?: CemDeclaration[];
}

interface CustomElementsManifest {
  schemaVersion: string;
  modules: CemModule[];
}

export interface ComponentInfo {
  tagName: string;
  className: string;
  summary: string;
  properties: Array<{
    name: string;
    type: string;
    default: string;
    description: string;
    reflects: boolean;
  }>;
  events: CemEvent[];
  slots: CemSlot[];
  cssParts: CemCssPart[];
}

export interface TokenInfo {
  name: string;
  cssVariable: string;
  value: string;
  category: string;
}

// --- Cached data ---

let componentsCache: ComponentInfo[] | undefined;
let tokensCache: TokenInfo[] | undefined;
let componentDocsCache: Map<string, string> | undefined;
let codingStandardsCache: string | undefined;
let developerGuideCache: string | undefined;

// --- Component helpers ---

function parseComponents(): ComponentInfo[] {
  const manifest = readJson<CustomElementsManifest>('custom-elements.json');

  const components: ComponentInfo[] = [];

  for (const mod of manifest.modules) {
    // Filter to src/ modules only (avoid dist/ duplicates)
    if (!mod.path.startsWith('src/')) continue;
    if (!mod.declarations) continue;

    for (const decl of mod.declarations) {
      if (decl.kind !== 'class' || !decl.customElement || !decl.tagName) continue;

      const properties = (decl.members ?? [])
        .filter((m) => m.kind === 'field' && m.privacy !== 'private' && m.attribute)
        .map((m) => ({
          name: m.name,
          type: m.type?.text ?? 'unknown',
          default: m.default ?? '—',
          description: m.description ?? '',
          reflects: m.reflects ?? false,
        }));

      components.push({
        tagName: decl.tagName,
        className: decl.name,
        summary: decl.summary ?? decl.description ?? '',
        properties,
        events: decl.events ?? [],
        slots: decl.slots ?? [],
        cssParts: decl.cssParts ?? [],
      });
    }
  }

  return components;
}

// --- Token helpers ---

function camelToCssVar(name: string): string {
  // CoColorPrimary500 → --co-color-primary-500
  // CoBreakpoint2xl → --co-breakpoint-2xl
  // CoFontSize3xl → --co-font-size-3xl
  const withDashes = name
    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-z])(\d)/g, '$1-$2')
    .toLowerCase();
  return `--${withDashes}`;
}

function categorizeToken(name: string): string {
  const lower = name.toLowerCase();
  if (lower.startsWith('cocolor')) return 'color';
  if (lower.startsWith('cospacing')) return 'spacing';
  if (lower.startsWith('coradius')) return 'radius';
  if (lower.startsWith('coshadow')) return 'shadow';
  if (lower.startsWith('cofont')) return 'font';
  if (lower.startsWith('cozindex')) return 'z-index';
  if (lower.startsWith('cotransition')) return 'transition';
  if (lower.startsWith('cobreakpoint')) return 'breakpoint';
  return 'other';
}

function parseTokens(): TokenInfo[] {
  const raw = readJson<Record<string, string>>('tokens.json');
  return Object.entries(raw).map(([name, value]) => ({
    name,
    cssVariable: camelToCssVar(name),
    value,
    category: categorizeToken(name),
  }));
}

// --- Component docs ---

function loadComponentDocs(): Map<string, string> {
  const docs = new Map<string, string>();
  const docsDir = join(dataDir, 'docs', 'components');

  try {
    const files = readdirSync(docsDir).filter((f) => f.endsWith('.md'));
    for (const file of files) {
      const name = file.replace('.md', '');
      docs.set(name, readText(join('docs', 'components', file)));
    }
  } catch {
    // No component docs available
  }

  return docs;
}

// --- Public API ---

export function getComponents(): ComponentInfo[] {
  if (!componentsCache) {
    componentsCache = parseComponents();
  }
  return componentsCache;
}

export function getTokens(): TokenInfo[] {
  if (!tokensCache) {
    tokensCache = parseTokens();
  }
  return tokensCache;
}

export function getComponentDoc(name: string): string | undefined {
  if (!componentDocsCache) {
    componentDocsCache = loadComponentDocs();
  }
  // Try exact name, then strip co- prefix
  const normalized = name.replace(/^co-/, '');
  return componentDocsCache.get(normalized) ?? componentDocsCache.get(name);
}

export function getCodingStandards(): string {
  if (!codingStandardsCache) {
    codingStandardsCache = readText(join('docs', 'coding-standards.md'));
  }
  return codingStandardsCache;
}

export function getDeveloperGuide(): string {
  if (!developerGuideCache) {
    developerGuideCache = readText(join('docs', 'developers.md'));
  }
  return developerGuideCache;
}

export function getAllDocs(): Array<{ source: string; type: string; content: string }> {
  const docs: Array<{ source: string; type: string; content: string }> = [];

  // Components
  for (const comp of getComponents()) {
    docs.push({
      source: comp.tagName,
      type: 'component',
      content: `${comp.tagName} (${comp.className}): ${comp.summary}. Properties: ${comp.properties.map((p) => p.name).join(', ')}. Events: ${comp.events.map((e) => e.name).join(', ')}.`,
    });
  }

  // Tokens
  for (const token of getTokens()) {
    docs.push({
      source: token.cssVariable,
      type: 'token',
      content: `${token.name} ${token.cssVariable}: ${token.value} (${token.category})`,
    });
  }

  // Markdown docs
  if (!componentDocsCache) {
    componentDocsCache = loadComponentDocs();
  }
  for (const [name, content] of componentDocsCache) {
    docs.push({ source: `docs/components/${name}.md`, type: 'doc', content });
  }

  docs.push({ source: 'docs/coding-standards.md', type: 'doc', content: getCodingStandards() });
  docs.push({ source: 'docs/developers.md', type: 'doc', content: getDeveloperGuide() });

  return docs;
}
