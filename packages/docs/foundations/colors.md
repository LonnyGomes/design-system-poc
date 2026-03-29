# Colors

<script setup>
import { data } from './colors.data';
</script>

The Cobalt color system is organized into **primitive palettes** and **semantic tokens**. Primitives define the raw hues and shades; semantic tokens map those primitives to UI roles so that themes and dark mode work automatically.

## Core palette

The core palette includes **Neutral** and the four colors used by semantic tokens (Blue, Red, Green, Orange).

<ColorSwatch :palettes="data.corePalettes" />

## Extended palette

Additional primitives available for illustrations, data visualization, status indicators, and brand expression. These do not have semantic aliases — reference them directly via `--co-color-primitive-{name}-{shade}`.

<ColorSwatch :palettes="data.extendedPalettes" />

## Semantic tokens

Semantic tokens abstract primitives so your UI adapts to theme changes without touching component code.

| Token                    | Primitive   | Light mode value | Dark mode value | Usage                       |
| ------------------------ | ----------- | ---------------- | --------------- | --------------------------- |
| `--co-color-primary-600` | Blue 600    | `#154bcc`        | Blue 300        | Primary actions, links      |
| `--co-color-neutral-100` | Neutral 100 | `#f2f2f2`        | Neutral 800     | Subtle backgrounds          |
| `--co-color-neutral-900` | Neutral 900 | `#1e1f21`        | Neutral 50      | Body text                   |
| `--co-color-danger-600`  | Red 600     | `#a61b12`        | Red 300         | Destructive actions, errors |
| `--co-color-success-600` | Green 600   | `#16652a`        | Green 300       | Success states              |
| `--co-color-warning-500` | Orange 500  | `#f8a01c`        | Orange 400      | Warning indicators          |

## Usage in CSS

Reference tokens with `var()`:

```css
.co-button--primary {
  background-color: var(--co-color-primary-600);
  color: var(--co-color-foreground-on-primary);
}

.co-alert--danger {
  background-color: var(--co-color-danger-50);
  border-left: 4px solid var(--co-color-danger-600);
  color: var(--co-color-danger-900);
}
```

## Light and dark mode

Cobalt ships two token layers. The default layer uses light-mode values. When the `[data-theme="dark"]` attribute is set on a parent element (typically `<html>`), the dark layer overrides the semantic tokens.

```css
/* Automatically provided by @cobalt/tokens */
:root {
  --co-color-primary-600: #154bcc;
  --co-color-neutral-900: #1e1f21;
}

[data-theme='dark'] {
  --co-color-primary-600: #769eff;
  --co-color-neutral-900: #f2f2f2;
}
```

No component CSS needs to change — the same `var(--co-color-primary-600)` resolves to the correct value in either mode.

> **Tip:** Always verify that foreground/background pairings meet a minimum contrast ratio of **4.5:1** for normal text and **3:1** for large text, as required by WCAG 2.1 AA.

## Accessibility

- All default semantic pairings satisfy WCAG 2.1 AA contrast requirements.
- Never rely on color alone to communicate meaning — always pair color with text, icons, or patterns.
- Use the `--co-color-focus-ring` token for keyboard-focus outlines.

## Related

- [Accessibility Standards](./accessibility.md)
- [Tokens reference](../tokens/index.md)
