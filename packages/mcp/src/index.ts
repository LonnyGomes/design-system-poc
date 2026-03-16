#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

import { listComponents } from './tools/list-components.js';
import { getComponent } from './tools/get-component.js';
import { searchTokens } from './tools/search-tokens.js';
import { getCodingStandardsTool } from './tools/get-coding-standards.js';
import { getDeveloperGuideTool } from './tools/get-developer-guide.js';
import { searchDocs } from './tools/search-docs.js';

const server = new McpServer({
  name: 'cobalt-design-system',
  version: '0.0.1',
});

// --- Tool registration ---

server.tool(
  'list_components',
  'List all available Cobalt Design System components with their tag names, class names, and summaries.',
  {},
  async () => ({
    content: [{ type: 'text' as const, text: listComponents() }],
  }),
);

server.tool(
  'get_component',
  'Get detailed information about a specific Cobalt component including properties, events, slots, CSS parts, usage examples, and best practices.',
  {
    name: z
      .string()
      .describe('Component name — tag name (e.g. "co-button") or class name (e.g. "CoButton")'),
    framework: z
      .enum(['web-component', 'react', 'vue', 'angular', 'all'])
      .optional()
      .describe('Filter usage examples to a specific framework. Defaults to "all".'),
  },
  async (args) => ({
    content: [{ type: 'text' as const, text: getComponent(args) }],
  }),
);

server.tool(
  'search_tokens',
  'Search Cobalt design tokens by name or category. Returns token names, CSS custom property variables, values, and categories. With no parameters, returns all tokens.',
  {
    query: z
      .string()
      .optional()
      .describe(
        'Search query to filter tokens by name or CSS variable (e.g. "primary", "spacing", "blue-500")',
      ),
    category: z
      .enum(['color', 'spacing', 'radius', 'shadow', 'font', 'z-index', 'transition', 'breakpoint'])
      .optional()
      .describe('Filter by token category'),
  },
  async (args) => ({
    content: [{ type: 'text' as const, text: searchTokens(args) }],
  }),
);

server.tool(
  'get_coding_standards',
  'Get Cobalt coding standards and conventions. Optionally filter to a specific section.',
  {
    section: z
      .enum(['typescript', 'lit', 'css', 'testing', 'file-naming', 'commits'])
      .optional()
      .describe('Specific section to retrieve. Omit for the full document.'),
  },
  async (args) => ({
    content: [{ type: 'text' as const, text: getCodingStandardsTool(args) }],
  }),
);

server.tool(
  'get_developer_guide',
  'Get the Cobalt developer guide covering installation, framework setup, tokens, and theming. Optionally filter to a specific section.',
  {
    section: z
      .enum([
        'installation',
        'react',
        'vue',
        'angular',
        'vanilla',
        'tokens',
        'theming',
        'troubleshooting',
      ])
      .optional()
      .describe('Specific section to retrieve. Omit for the full guide.'),
  },
  async (args) => ({
    content: [{ type: 'text' as const, text: getDeveloperGuideTool(args) }],
  }),
);

server.tool(
  'search_docs',
  'Search across all Cobalt documentation, component APIs, and design tokens. Returns matching results with source and context.',
  {
    query: z
      .string()
      .describe(
        'Search query (searches component names, token names/values, and documentation text)',
      ),
  },
  async (args) => ({
    content: [{ type: 'text' as const, text: searchDocs(args) }],
  }),
);

// --- Start server ---

async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error: unknown) => {
  console.error('Failed to start Cobalt MCP server:', error);
  process.exit(1);
});
