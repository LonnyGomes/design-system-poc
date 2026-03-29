#!/usr/bin/env node

/**
 * Generates per-component changelog JSON files from conventional commit history.
 *
 * For each component directory in packages/components/src/components/,
 * this script extracts commits whose subject matches the component scope
 * (e.g., `feat(co-button): ...`) and writes structured JSON to
 * packages/docs/.generated/changelogs/{component}.json.
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const componentsDir = path.resolve(__dirname, '../../components/src/components');
const outputDir = path.resolve(__dirname, '../.generated/changelogs');

// Ensure output directory exists
fs.mkdirSync(outputDir, { recursive: true });

// Discover component scopes from the filesystem
const components = fs
  .readdirSync(componentsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => `co-${d.name}`);

const COMMIT_TYPE_PATTERN = /^(\w+)\(([^)]+)\):\s*(.+)$/;

for (const component of components) {
  let raw = '';
  try {
    raw = execSync(`git log --format='%H|%s|%aI' --grep='(${component})'`, {
      cwd: path.resolve(__dirname, '../../..'),
      encoding: 'utf-8',
    }).trim();
  } catch {
    // No commits found or git not available
  }

  const entries = [];

  if (raw) {
    for (const line of raw.split('\n')) {
      if (!line) continue;
      const [hash, subject, dateStr] = line.split('|');
      if (!hash || !subject) continue;

      const match = subject.match(COMMIT_TYPE_PATTERN);
      if (!match) continue;

      const [, type, scope, description] = match;
      // Only include commits scoped exactly to this component
      if (scope !== component) continue;

      entries.push({
        hash: hash.slice(0, 7),
        type,
        description: description.trim(),
        date: dateStr ? dateStr.slice(0, 10) : '',
      });
    }
  }

  const changelog = { component, entries };
  fs.writeFileSync(path.join(outputDir, `${component}.json`), JSON.stringify(changelog, null, 2));
}

console.log(`Generated changelogs for ${components.length} components.`);
