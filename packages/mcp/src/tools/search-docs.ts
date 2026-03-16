import { getAllDocs } from '../data-loader.js';

export const searchDocsDefinition = {
  name: 'search_docs',
  description:
    'Search across all Cobalt documentation, component APIs, and design tokens. Returns matching results with source and context.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      query: {
        type: 'string',
        description:
          'Search query (searches component names, token names/values, and documentation text)',
      },
    },
    required: ['query'],
  },
};

interface SearchResult {
  source: string;
  type: string;
  matchContext: string;
}

function extractContext(content: string, query: string, contextChars: number = 200): string {
  const lowerContent = content.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const index = lowerContent.indexOf(lowerQuery);

  if (index === -1) return content.slice(0, contextChars);

  const start = Math.max(0, index - contextChars / 2);
  const end = Math.min(content.length, index + query.length + contextChars / 2);

  let context = content.slice(start, end).trim();
  if (start > 0) context = '…' + context;
  if (end < content.length) context = context + '…';

  return context;
}

export function searchDocs(args: { query: string }): string {
  const allDocs = getAllDocs();
  const query = args.query.toLowerCase();

  const results: SearchResult[] = [];

  for (const doc of allDocs) {
    if (doc.content.toLowerCase().includes(query)) {
      results.push({
        source: doc.source,
        type: doc.type,
        matchContext: extractContext(doc.content, args.query),
      });
    }
  }

  if (results.length === 0) {
    return JSON.stringify({ message: `No results found for "${args.query}".`, results: [] });
  }

  return JSON.stringify({ resultCount: results.length, results }, null, 2);
}
