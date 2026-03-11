# Design Foundations

Foundations are the visual and structural building blocks of the Cobalt Design System. They ensure consistency across every component and layout by defining shared rules for color, typography, spacing, and more.

## Overview

Each foundation category provides a set of **design tokens** — named values that you use in CSS, JavaScript, or design tools instead of hard-coded literals. Tokens make it easy to update the entire system from a single source of truth.

| Foundation                          | Purpose                                                             |
| ----------------------------------- | ------------------------------------------------------------------- |
| [Colors](./colors.md)               | Primitive palette and semantic color tokens for light and dark mode |
| [Typography](./typography.md)       | Font families, type scale, weights, and line heights                |
| [Spacing](./spacing.md)             | Consistent spacing units based on a 4 px grid                       |
| [Elevation](./elevation.md)         | Shadow levels that convey depth and hierarchy                       |
| [Motion](./motion.md)               | Duration and easing tokens for animations and transitions           |
| [Breakpoints](./breakpoints.md)     | Responsive viewport breakpoints for layout adaptation               |
| [Iconography](./iconography.md)     | Icon sizing, usage patterns, and accessibility                      |
| [Accessibility](./accessibility.md) | WCAG 2.1 AA standards, focus management, and ARIA patterns          |

## Using tokens

All foundation tokens are distributed via the `@cobalt/tokens` package and are available as CSS custom properties prefixed with `--cb-`.

```bash
npm install @cobalt/tokens
```

Import the tokens stylesheet at the root of your application:

```css
@import '@cobalt/tokens/css/tokens.css';
```

Then reference any token in your styles:

```css
.card {
  background: var(--cb-color-neutral-0);
  padding: var(--cb-spacing-16);
  border-radius: var(--cb-radius-md);
  box-shadow: var(--cb-shadow-md);
}
```

> **Tip:** Prefer semantic tokens (e.g. `--cb-color-primary-600`) over raw hex values. This ensures your UI adapts correctly to theme changes and dark mode.

## Guiding principles

1. **Consistency** — Use tokens everywhere; avoid magic numbers.
2. **Scalability** — Foundations are designed to grow. New primitives can be added without breaking existing usage.
3. **Accessibility** — Every foundation decision accounts for WCAG 2.1 AA compliance. Color contrast, focus visibility, and motion sensitivity are first-class concerns.
4. **Themability** — Tokens map to CSS custom properties, making runtime theme switching straightforward.

## Further reading

- [Getting Started](/getting-started/) — installation and setup
- [Components](/components/button) — UI components built on these foundations
- [Tokens reference](/tokens/) — full list of available design tokens
