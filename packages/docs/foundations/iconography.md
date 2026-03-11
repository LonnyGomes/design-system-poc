# Iconography

Cobalt ships a curated icon set optimized for clarity at small sizes. Icons are delivered as inline SVGs through the `@cobalt/icons` package, giving you full control over color, size, and animation via CSS.

## Installation

```bash
npm install @cobalt/icons
```

## Icon sizes

All icons are designed on a 24 px grid but scale cleanly to the four supported sizes:

| Token          | Size  | Usage                                 |
| -------------- | ----- | ------------------------------------- |
| `--cb-icon-xs` | 16 px | Inline indicators inside badges, tags |
| `--cb-icon-sm` | 20 px | Inside buttons, form controls         |
| `--cb-icon-md` | 24 px | Standalone icons, navigation items    |
| `--cb-icon-lg` | 32 px | Empty states, feature highlights      |

## Usage with React

```tsx
import { IconCheck, IconChevronDown, IconAlertTriangle } from '@cobalt/icons';

function StatusBadge({ status }: { status: 'ok' | 'warn' }) {
  return (
    <span className="cb-badge">
      {status === 'ok' ? (
        <IconCheck size={16} aria-hidden="true" />
      ) : (
        <IconAlertTriangle size={16} aria-hidden="true" />
      )}
      {status === 'ok' ? 'Healthy' : 'Degraded'}
    </span>
  );
}
```

## Usage in HTML

When not using the React package, embed SVGs directly:

```html
<button class="cb-button cb-button--primary">
  <svg
    class="cb-icon"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    aria-hidden="true"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
  Continue
</button>
```

## Styling with CSS

Icons inherit `currentColor` by default, so they match the surrounding text color automatically:

```css
.cb-icon {
  width: var(--cb-icon-md);
  height: var(--cb-icon-md);
  flex-shrink: 0;
  stroke: currentColor;
  fill: none;
}

.cb-button .cb-icon {
  width: var(--cb-icon-sm);
  height: var(--cb-icon-sm);
}
```

To override color independently of text:

```css
.cb-status-icon--success {
  color: var(--cb-color-success-600);
}
```

## Accessibility

Icons fall into two categories — **decorative** and **informative** — and each requires different accessibility treatment.

### Decorative icons

Decorative icons sit next to visible text that already conveys the meaning. Hide them from assistive technology:

```html
<button>
  <svg aria-hidden="true"><!-- icon --></svg>
  Delete
</button>
```

### Informative icons

Informative icons are the only way the meaning is communicated (e.g., an icon-only button). They need a text alternative:

```html
<button aria-label="Close dialog">
  <svg aria-hidden="true"><!-- close icon --></svg>
</button>
```

| Scenario                   | Attribute                          | Example                   |
| -------------------------- | ---------------------------------- | ------------------------- |
| Icon next to visible label | `aria-hidden="true"` on SVG        | Button with text + icon   |
| Icon-only button           | `aria-label` on button             | Close button with X icon  |
| Icon conveying status      | `role="img"` + `aria-label` on SVG | Warning icon without text |

> **Tip:** Always test icon-only controls with a screen reader. If the announced label doesn't make sense without seeing the icon, you need a better `aria-label`.

## Best practices

1. **Use a single size per context.** Don't mix 16 px and 20 px icons in the same button.
2. **Maintain consistent stroke width.** All Cobalt icons use a 2 px stroke at the 24 px reference size.
3. **Avoid icon overload.** If a row of actions has more than four icon-only buttons, add visible labels.
4. **Align icons optically.** Some icons (e.g., play triangles) may need 1-2 px nudges to look visually centered.

## Related

- [Accessibility](./accessibility.md) — ARIA patterns and screen reader support
- [Colors](./colors.md) — icon color tokens
