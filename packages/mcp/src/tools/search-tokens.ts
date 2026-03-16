import { getTokens } from '../data-loader.js';

const VALID_CATEGORIES = [
  'color',
  'spacing',
  'radius',
  'shadow',
  'font',
  'z-index',
  'transition',
  'breakpoint',
];

export const searchTokensDefinition = {
  name: 'search_tokens',
  description:
    'Search Cobalt design tokens by name or category. Returns token names, CSS custom property variables, values, and categories. With no parameters, returns all tokens.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      query: {
        type: 'string',
        description:
          'Search query to filter tokens by name or CSS variable (e.g. "primary", "spacing", "blue-500")',
      },
      category: {
        type: 'string',
        enum: VALID_CATEGORIES,
        description: 'Filter by token category',
      },
    },
  },
};

export function searchTokens(args: { query?: string; category?: string }): string {
  let tokens = getTokens();

  if (args.category) {
    tokens = tokens.filter((t) => t.category === args.category);
  }

  if (args.query) {
    const q = args.query.toLowerCase();
    tokens = tokens.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.cssVariable.toLowerCase().includes(q) ||
        t.value.toLowerCase().includes(q),
    );
  }

  return JSON.stringify(tokens, null, 2);
}
