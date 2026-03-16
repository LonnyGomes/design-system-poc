import { getDeveloperGuide } from '../data-loader.js';

const VALID_SECTIONS = [
  'installation',
  'react',
  'vue',
  'angular',
  'vanilla',
  'tokens',
  'theming',
  'troubleshooting',
];

const SECTION_HEADING_MAP: Record<string, { heading: string; level: number }> = {
  installation: { heading: 'Installation', level: 2 },
  react: { heading: 'React', level: 3 },
  vue: { heading: 'Vue', level: 3 },
  angular: { heading: 'Angular', level: 3 },
  vanilla: { heading: 'Vanilla HTML', level: 3 },
  tokens: { heading: 'Using Design Tokens', level: 2 },
  theming: { heading: 'Theming', level: 2 },
  troubleshooting: { heading: 'Troubleshooting', level: 2 },
};

export const getDeveloperGuideDefinition = {
  name: 'get_developer_guide',
  description:
    'Get the Cobalt developer guide covering installation, framework setup, tokens, and theming. Optionally filter to a specific section.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      section: {
        type: 'string',
        enum: VALID_SECTIONS,
        description: 'Specific section to retrieve. Omit for the full guide.',
      },
    },
  },
};

function extractSection(markdown: string, heading: string, level: number): string | undefined {
  const prefix = '#'.repeat(level);
  const escapedHeading = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // Match this heading and capture content until the next heading of same or higher level
  const regex = new RegExp(
    `^${prefix}\\s+${escapedHeading}\\s*\\n([\\s\\S]*?)(?=^#{${level}}(?!#)\\s|$)`,
    'mi',
  );
  const match = regex.exec(markdown);
  return match?.[1]?.trim();
}

export function getDeveloperGuideTool(args: { section?: string }): string {
  const doc = getDeveloperGuide();

  if (!args.section) {
    return doc;
  }

  const mapping = SECTION_HEADING_MAP[args.section];
  if (!mapping) {
    return JSON.stringify({
      error: `Unknown section "${args.section}". Valid sections: ${VALID_SECTIONS.join(', ')}`,
    });
  }

  const section = extractSection(doc, mapping.heading, mapping.level);
  if (!section) {
    return JSON.stringify({ error: `Section "${args.section}" not found in developer guide.` });
  }

  const prefix = '#'.repeat(mapping.level);
  return `${prefix} ${mapping.heading}\n\n${section}`;
}
