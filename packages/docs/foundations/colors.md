# Colors

The Cobalt color system is organized into **primitive palettes** and **semantic tokens**. Primitives define the raw hues and shades; semantic tokens map those primitives to UI roles so that themes and dark mode work automatically.

## Primitive palette

Each primitive scale runs from `50` (lightest) to `950` (darkest).

| Scale | Blue      | Gray      | Green     | Red       | Amber     |
| ----- | --------- | --------- | --------- | --------- | --------- |
| 50    | `#eff6ff` | `#f9fafb` | `#f0fdf4` | `#fef2f2` | `#fffbeb` |
| 100   | `#dbeafe` | `#f3f4f6` | `#dcfce7` | `#fee2e2` | `#fef3c7` |
| 200   | `#bfdbfe` | `#e5e7eb` | `#bbf7d0` | `#fecaca` | `#fde68a` |
| 300   | `#93c5fd` | `#d1d5db` | `#86efac` | `#fca5a5` | `#fcd34d` |
| 400   | `#60a5fa` | `#9ca3af` | `#4ade80` | `#f87171` | `#fbbf24` |
| 500   | `#3b82f6` | `#6b7280` | `#22c55e` | `#ef4444` | `#f59e0b` |
| 600   | `#2563eb` | `#4b5563` | `#16a34a` | `#dc2626` | `#d97706` |
| 700   | `#1d4ed8` | `#374151` | `#15803d` | `#b91c1c` | `#b45309` |
| 800   | `#1e40af` | `#1f2937` | `#166534` | `#991b1b` | `#92400e` |
| 900   | `#1e3a8a` | `#111827` | `#14532d` | `#7f1d1d` | `#78350f` |
| 950   | `#172554` | `#030712` | `#052e16` | `#450a0a` | `#451a03` |

## Semantic tokens

Semantic tokens abstract primitives so your UI adapts to theme changes without touching component code.

| Token                    | Light mode value | Dark mode value | Usage                       |
| ------------------------ | ---------------- | --------------- | --------------------------- |
| `--cb-color-primary-600` | Blue 600         | Blue 400        | Primary actions, links      |
| `--cb-color-neutral-100` | Gray 100         | Gray 800        | Subtle backgrounds          |
| `--cb-color-neutral-900` | Gray 900         | Gray 50         | Body text                   |
| `--cb-color-danger-600`  | Red 600          | Red 400         | Destructive actions, errors |
| `--cb-color-success-600` | Green 600        | Green 400       | Success states              |
| `--cb-color-warning-500` | Amber 500        | Amber 300       | Warning indicators          |

## Usage in CSS

Reference tokens with `var()`:

```css
.cb-button--primary {
  background-color: var(--cb-color-primary-600);
  color: var(--cb-color-neutral-0);
}

.cb-alert--danger {
  background-color: var(--cb-color-danger-50);
  border-left: 4px solid var(--cb-color-danger-600);
  color: var(--cb-color-danger-900);
}
```

## Light and dark mode

Cobalt ships two token layers. The default layer uses light-mode values. When the `[data-theme="dark"]` attribute is set on a parent element (typically `<html>`), the dark layer overrides the semantic tokens.

```css
/* Automatically provided by @cobalt/tokens */
:root {
  --cb-color-primary-600: #2563eb;
  --cb-color-neutral-0: #ffffff;
}

[data-theme='dark'] {
  --cb-color-primary-600: #60a5fa;
  --cb-color-neutral-0: #0a0a0a;
}
```

No component CSS needs to change — the same `var(--cb-color-primary-600)` resolves to the correct value in either mode.

> **Tip:** Always verify that foreground/background pairings meet a minimum contrast ratio of **4.5:1** for normal text and **3:1** for large text, as required by WCAG 2.1 AA.

## Accessibility

- All default semantic pairings satisfy WCAG 2.1 AA contrast requirements.
- Never rely on color alone to communicate meaning — always pair color with text, icons, or patterns.
- Use the `--cb-color-focus-ring` token (`Blue 500` at 50 % opacity) for keyboard-focus outlines.

## Related

- [Accessibility Standards](./accessibility.md)
- [Tokens reference](../tokens/index.md)
