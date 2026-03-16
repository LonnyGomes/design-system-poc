import { getComponents } from '../data-loader.js';

export const listComponentsDefinition = {
  name: 'list_components',
  description:
    'List all available Cobalt Design System components with their tag names, class names, and summaries.',
  inputSchema: {
    type: 'object' as const,
    properties: {},
  },
};

export function listComponents(): string {
  const components = getComponents();

  const result = components.map((c) => ({
    tagName: c.tagName,
    className: c.className,
    summary: c.summary,
  }));

  return JSON.stringify(result, null, 2);
}
