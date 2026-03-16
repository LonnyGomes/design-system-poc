import { getCodingStandards } from '../data-loader.js';

const VALID_SECTIONS = ['typescript', 'lit', 'css', 'testing', 'file-naming', 'commits'];

const SECTION_HEADING_MAP: Record<string, string> = {
  typescript: 'TypeScript Conventions',
  lit: 'Lit Component Patterns',
  css: 'CSS Custom Property Naming',
  testing: 'Testing Requirements',
  'file-naming': 'File Naming',
  commits: 'Commit Message Format',
};

export const getCodingStandardsDefinition = {
  name: 'get_coding_standards',
  description:
    'Get Cobalt coding standards and conventions. Optionally filter to a specific section.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      section: {
        type: 'string',
        enum: VALID_SECTIONS,
        description: 'Specific section to retrieve. Omit for the full document.',
      },
    },
  },
};

function extractSection(markdown: string, heading: string): string | undefined {
  const regex = new RegExp(
    `^##\\s+${heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\n([\\s\\S]*?)(?=^##\\s|$)`,
    'mi',
  );
  const match = regex.exec(markdown);
  return match?.[1]?.trim();
}

export function getCodingStandardsTool(args: { section?: string }): string {
  const doc = getCodingStandards();

  if (!args.section) {
    return doc;
  }

  const heading = SECTION_HEADING_MAP[args.section];
  if (!heading) {
    return JSON.stringify({
      error: `Unknown section "${args.section}". Valid sections: ${VALID_SECTIONS.join(', ')}`,
    });
  }

  const section = extractSection(doc, heading);
  if (!section) {
    return JSON.stringify({ error: `Section "${args.section}" not found in coding standards.` });
  }

  return `## ${heading}\n\n${section}`;
}
