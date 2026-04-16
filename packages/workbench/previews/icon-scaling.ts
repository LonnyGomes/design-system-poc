import '@cobalt/components/icon';

export const title = 'Icon Scaling Comparison';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
const sizeLabels: Record<string, string> = {
  xs: '16px',
  sm: '20px',
  md: '24px',
  lg: '32px',
  xl: '48px',
};

interface IconPair {
  label: string;
  custom: { name: string; fill?: boolean; animated?: boolean };
  material: { name: string; fill?: boolean };
}

const pairs: IconPair[] = [
  {
    label: 'co-placeholder vs image',
    custom: { name: 'co-placeholder' },
    material: { name: 'image' },
  },
  {
    label: 'co-placeholder (fill) vs image (fill)',
    custom: { name: 'co-placeholder', fill: true },
    material: { name: 'image', fill: true },
  },
  {
    label: 'picture-as-pdf (override) vs description',
    custom: { name: 'picture-as-pdf' },
    material: { name: 'description' },
  },
  {
    label: 'picture-as-pdf (fill, override) vs description (fill)',
    custom: { name: 'picture-as-pdf', fill: true },
    material: { name: 'description', fill: true },
  },
  {
    label: 'notifications (animated) vs notifications (material)',
    custom: { name: 'notifications', animated: true },
    material: { name: 'notifications' },
  },
  {
    label: 'check-circle (animated) vs check-circle (material)',
    custom: { name: 'check-circle', animated: true },
    material: { name: 'check-circle' },
  },
  {
    label: 'progress-activity (animated) vs progress-activity (material)',
    custom: { name: 'progress-activity', animated: true },
    material: { name: 'progress-activity' },
  },
];

const materialBaseline = ['home', 'search', 'settings', 'delete'];

function iconAttrs(
  icon: { name: string; fill?: boolean; animated?: boolean },
  size: string,
): string {
  if (size === 'xl') {
    let attrs = `name="${icon.name}" style="width: 48px; height: 48px"`;
    if (icon.fill) attrs += ' fill';
    if (icon.animated) attrs += ' animated';
    return attrs;
  }
  let attrs = `name="${icon.name}" size="${size}"`;
  if (icon.fill) attrs += ' fill';
  if (icon.animated) attrs += ' animated';
  return attrs;
}

function renderPairRow(pair: IconPair): string {
  const customCells = sizes
    .map((s) => `<td><co-icon ${iconAttrs(pair.custom, s)}></co-icon></td>`)
    .join('');
  const materialCells = sizes
    .map((s) => `<td><co-icon ${iconAttrs(pair.material, s)}></co-icon></td>`)
    .join('');
  return `
    <tr>
      <td class="row-label" rowspan="2">${pair.label}</td>
      <td class="source-label">Custom</td>
      ${customCells}
    </tr>
    <tr>
      <td class="source-label">Material</td>
      ${materialCells}
    </tr>`;
}

function renderBaselineRow(name: string): string {
  const cells = sizes
    .map((s) => `<td><co-icon name="${name}" size="${s}"></co-icon></td>`)
    .join('');
  return `
    <tr>
      <td class="row-label">${name}</td>
      <td class="source-label">Material</td>
      ${cells}
    </tr>`;
}

const sizeHeaders = sizes
  .map((s) => `<th>${s}<br><span class="size-px">${sizeLabels[s]}</span></th>`)
  .join('');

export const html = `
  <style>
    .scaling-table {
      border-collapse: collapse;
      width: 100%;
    }
    .scaling-table th,
    .scaling-table td {
      padding: var(--co-space-3) var(--co-space-4);
      text-align: center;
      vertical-align: middle;
      border-bottom: var(--co-shape-border-width-thin) solid var(--co-color-border-default);
    }
    .scaling-table th {
      font-weight: var(--co-font-weight-semibold);
      font-size: var(--co-font-size-sm);
      color: var(--co-color-text-secondary);
    }
    .size-px {
      font-family: var(--co-font-family-mono);
      font-size: var(--co-font-size-xs);
      font-weight: var(--co-font-weight-normal);
    }
    .row-label {
      text-align: left !important;
      font-size: var(--co-font-size-sm);
      font-weight: var(--co-font-weight-semibold);
      white-space: nowrap;
    }
    .source-label {
      text-align: left !important;
      font-size: var(--co-font-size-xs);
      font-family: var(--co-font-family-mono);
      color: var(--co-color-text-secondary);
      white-space: nowrap;
    }
    .scaling-table co-icon {
      vertical-align: middle;
    }
    .pair-divider td {
      border-bottom: 2px solid var(--co-color-border-strong);
    }
  </style>

  <section class="wb-section">
    <h2 class="wb-heading">Custom / Override / Animated vs Material</h2>
    <p style="margin-bottom: var(--co-space-4); font-size: var(--co-font-size-sm); color: var(--co-color-text-secondary)">
      Compare stroke weight and detail between custom icons (24×24 source) and Material Symbols (960×960 source) at each size.
    </p>
    <table class="scaling-table">
      <thead>
        <tr>
          <th style="text-align: left">Pair</th>
          <th style="text-align: left">Source</th>
          ${sizeHeaders}
        </tr>
      </thead>
      <tbody>
        ${pairs.map(renderPairRow).join('')}
      </tbody>
    </table>
  </section>

  <section class="wb-section" style="margin-top: var(--co-space-8)">
    <h2 class="wb-heading">Material-Only Baseline</h2>
    <p style="margin-bottom: var(--co-space-4); font-size: var(--co-font-size-sm); color: var(--co-color-text-secondary)">
      Material icons at all sizes for reference — this is what "normal" scaling looks like.
    </p>
    <table class="scaling-table">
      <thead>
        <tr>
          <th style="text-align: left">Icon</th>
          <th style="text-align: left">Source</th>
          ${sizeHeaders}
        </tr>
      </thead>
      <tbody>
        ${materialBaseline.map(renderBaselineRow).join('')}
      </tbody>
    </table>
  </section>
`;
