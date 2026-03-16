import { getComponents, getComponentDoc } from '../data-loader.js';

export const getComponentDefinition = {
  name: 'get_component',
  description:
    'Get detailed information about a specific Cobalt component including properties, events, slots, CSS parts, usage examples, and best practices.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      name: {
        type: 'string',
        description: 'Component name — tag name (e.g. "co-button") or class name (e.g. "CoButton")',
      },
      framework: {
        type: 'string',
        enum: ['web-component', 'react', 'vue', 'angular', 'all'],
        description: 'Filter usage examples to a specific framework. Defaults to "all".',
      },
    },
    required: ['name'],
  },
};

const FRAMEWORK_TEMPLATE_MAP: Record<string, string> = {
  'web-component': 'web-component',
  react: 'react',
  vue: 'vue',
  angular: 'angular',
};

interface FrameworkExample {
  framework: string;
  code: string;
}

function extractExamples(markdown: string, framework?: string): FrameworkExample[] {
  const examples: FrameworkExample[] = [];
  const regex = /<template #([\w-]+)>\s*\n([\s\S]*?)<\/template>/g;
  let match;

  while ((match = regex.exec(markdown)) !== null) {
    const templateName = match[1];
    // Extract code blocks from within the template
    const codeBlockRegex = /```\w*\n([\s\S]*?)```/g;
    let codeMatch;
    const codeBlocks: string[] = [];
    while ((codeMatch = codeBlockRegex.exec(match[2])) !== null) {
      codeBlocks.push(codeMatch[1].trim());
    }

    if (codeBlocks.length > 0) {
      examples.push({
        framework: templateName,
        code: codeBlocks.join('\n\n'),
      });
    }
  }

  if (framework && framework !== 'all') {
    const templateKey = FRAMEWORK_TEMPLATE_MAP[framework] ?? framework;
    return examples.filter((e) => e.framework === templateKey);
  }

  return examples;
}

function extractSection(markdown: string, heading: string): string | undefined {
  // Match ## heading or ### heading
  const regex = new RegExp(
    `^#{2,3}\\s+${heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\n([\\s\\S]*?)(?=^#{2,3}\\s|$)`,
    'mi',
  );
  const match = regex.exec(markdown);
  return match?.[1]?.trim();
}

export function getComponent(args: { name: string; framework?: string }): string {
  const components = getComponents();
  const nameNorm = args.name.toLowerCase().replace(/^co-/, '');

  const component = components.find(
    (c) =>
      c.tagName.toLowerCase() === args.name.toLowerCase() ||
      c.tagName.toLowerCase() === `co-${nameNorm}` ||
      c.className.toLowerCase() === nameNorm ||
      c.className.toLowerCase() === args.name.toLowerCase(),
  );

  if (!component) {
    return JSON.stringify({
      error: `Component "${args.name}" not found. Use list_components to see available components.`,
    });
  }

  const doc = getComponentDoc(component.tagName);

  const result: Record<string, unknown> = {
    tagName: component.tagName,
    className: component.className,
    summary: component.summary,
    properties: component.properties,
    events: component.events,
    slots: component.slots,
    cssParts: component.cssParts,
  };

  if (doc) {
    result.usageExamples = extractExamples(doc, args.framework);

    const bestPractices = extractSection(doc, 'Best Practices');
    if (bestPractices) {
      result.bestPractices = bestPractices;
    }
  }

  return JSON.stringify(result, null, 2);
}
