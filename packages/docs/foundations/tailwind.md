---
title: Tailwind Integration
description: Use Tailwind CSS utility classes backed by Cobalt design tokens.
---

# Tailwind Integration

The `@cobalt/tokens` package includes an opt-in Tailwind CSS preset that maps standard Tailwind utility classes to Cobalt design tokens via CSS custom properties. This means classes like `bg-primary-500`, `p-4`, and `rounded-lg` resolve to `var(--co-*)` values, so dark mode, theming, and runtime overrides propagate automatically.

## Why CSS variables?

The preset binds Tailwind theme values to `var(--co-*)` references rather than static hex/rem values. This gives you:

- **Automatic dark mode** — load `@cobalt/tokens/css/dark` and toggle `data-theme="dark"`. All Tailwind classes update instantly, no `darkMode` configuration needed.
- **Runtime theming** — override any `--co-*` variable in CSS and every Tailwind utility that references it updates.
- **Single source of truth** — tokens are defined once in the design system. Tailwind reads from the same variables as web components.

## Tailwind v3 Setup

### 1. Install

Your project needs `tailwindcss` (v3.x) and `@cobalt/tokens`:

```bash
npm install -D tailwindcss
npm install @cobalt/tokens
```

### 2. Configure

Add the Cobalt preset to your `tailwind.config.js`:

```js
// tailwind.config.js
import cobaltPreset from '@cobalt/tokens/tailwind';

export default {
  presets: [cobaltPreset],
  content: ['./src/**/*.{html,js,ts,jsx,tsx,vue}'],
};
```

### 3. Import tokens

In your main CSS file, import Cobalt tokens **before** Tailwind directives:

```css
@import '@cobalt/tokens/css'; /* required: defines --co-* variables */
@import '@cobalt/tokens/css/fonts'; /* optional: self-hosted fonts */

@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Tailwind v4 Setup

Tailwind v4 uses CSS-first configuration with `@theme` blocks.

### 1. Install

```bash
npm install -D tailwindcss@next
npm install @cobalt/tokens
```

### 2. Import

In your main CSS file:

```css
@import 'tailwindcss';
@import '@cobalt/tokens/css';
@import '@cobalt/tokens/tailwind/css';
@import '@cobalt/tokens/css/fonts'; /* optional */
```

No JavaScript config file needed.

## Token Mapping Reference

The preset maps every Cobalt token category to standard Tailwind theme keys:

### Colors

| Tailwind class                             | Cobalt token                                  |
| ------------------------------------------ | --------------------------------------------- |
| `bg-primary-500`, `text-primary-500`       | `var(--co-color-primary-500)`                 |
| `bg-neutral-200`                           | `var(--co-color-neutral-200)`                 |
| `bg-danger-500`, `text-danger-500`         | `var(--co-color-danger-500)`                  |
| `bg-success-500`                           | `var(--co-color-success-500)`                 |
| `bg-warning-500`                           | `var(--co-color-warning-500)`                 |
| `bg-background`, `bg-background-subtle`    | `var(--co-color-background-{default,subtle})` |
| `text-foreground`, `text-foreground-muted` | `var(--co-color-foreground-{default,muted})`  |
| `border-border`, `border-border-strong`    | `var(--co-color-border-{default,strong})`     |
| `bg-primitive-blue-500`                    | `var(--co-color-primitive-blue-500)`          |

Color scales (primary, neutral, danger, success, warning) use shade `500` as the `DEFAULT`, so `bg-primary` is equivalent to `bg-primary-500`.

### Spacing

| Tailwind class       | Cobalt token                                         |
| -------------------- | ---------------------------------------------------- |
| `p-0` through `p-24` | `var(--co-spacing-0)` through `var(--co-spacing-24)` |
| `m-4`, `gap-6`, etc. | Same spacing scale                                   |

Available steps: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, px.

### Border Radius

| Tailwind class      | Cobalt token            |
| ------------------- | ----------------------- |
| `rounded-none`      | `var(--co-radius-none)` |
| `rounded-sm`        | `var(--co-radius-sm)`   |
| `rounded` (default) | `var(--co-radius-md)`   |
| `rounded-lg`        | `var(--co-radius-lg)`   |
| `rounded-xl`        | `var(--co-radius-xl)`   |
| `rounded-2xl`       | `var(--co-radius-2xl)`  |
| `rounded-full`      | `var(--co-radius-full)` |

### Typography

| Tailwind class                                       | Cobalt token                    |
| ---------------------------------------------------- | ------------------------------- |
| `font-sans`                                          | `var(--co-font-family-sans)`    |
| `font-mono`                                          | `var(--co-font-family-mono)`    |
| `text-xs` through `text-4xl`                         | `var(--co-font-size-*)`         |
| `text-base`                                          | `var(--co-font-size-md)`        |
| `font-normal`                                        | `var(--co-font-weight-regular)` |
| `font-medium`, `font-semibold`, `font-bold`          | `var(--co-font-weight-*)`       |
| `leading-tight`, `leading-normal`, `leading-relaxed` | `var(--co-font-line-height-*)`  |

Note: Cobalt's `md` font size maps to Tailwind's `base` (`text-base`), and Cobalt's `regular` weight maps to Tailwind's `normal` (`font-normal`).

### Shadows

| Tailwind class                  | Cobalt token          |
| ------------------------------- | --------------------- |
| `shadow-sm`                     | `var(--co-shadow-sm)` |
| `shadow` (default), `shadow-md` | `var(--co-shadow-md)` |
| `shadow-lg`                     | `var(--co-shadow-lg)` |
| `shadow-xl`                     | `var(--co-shadow-xl)` |
| `shadow-none`                   | `none`                |

### Z-Index

| Tailwind class     | Cobalt token                       |
| ------------------ | ---------------------------------- |
| `z-dropdown`       | `var(--co-z-index-dropdown)`       |
| `z-sticky`         | `var(--co-z-index-sticky)`         |
| `z-fixed`          | `var(--co-z-index-fixed)`          |
| `z-modal-backdrop` | `var(--co-z-index-modal-backdrop)` |
| `z-modal`          | `var(--co-z-index-modal)`          |
| `z-popover`        | `var(--co-z-index-popover)`        |
| `z-tooltip`        | `var(--co-z-index-tooltip)`        |

### Transitions

| Tailwind class                          | Cobalt token                           |
| --------------------------------------- | -------------------------------------- |
| `duration-fast`                         | `var(--co-transition-duration-fast)`   |
| `duration` (default), `duration-normal` | `var(--co-transition-duration-normal)` |
| `duration-slow`                         | `var(--co-transition-duration-slow)`   |
| `ease` (default)                        | `var(--co-transition-easing-default)`  |
| `ease-in`                               | `var(--co-transition-easing-in)`       |
| `ease-out`                              | `var(--co-transition-easing-out)`      |
| `ease-in-out`                           | `var(--co-transition-easing-in-out)`   |

### Breakpoints

| Tailwind prefix | Value    |
| --------------- | -------- |
| `sm:`           | `640px`  |
| `md:`           | `768px`  |
| `lg:`           | `1024px` |
| `xl:`           | `1280px` |
| `2xl:`          | `1536px` |

## Dark Mode

Dark mode works automatically. Import the dark theme tokens and toggle the `data-theme` attribute:

```html
<html data-theme="dark"></html>
```

```css
@import '@cobalt/tokens/css';
@import '@cobalt/tokens/css/dark';
```

Because the Tailwind preset references `var(--co-*)` values, when dark theme overrides those variables, every Tailwind utility updates. No `darkMode` configuration is needed in `tailwind.config.js`.

## Relationship to Utility Classes

The `@cobalt/tokens/css/utilities` export provides a standalone set of utility classes with `co-` prefixes (e.g., `.co-flex`, `.co-gap-4`). These are useful when Tailwind is not part of your stack.

If you are using the Tailwind preset, **you do not need** `@cobalt/tokens/css/utilities` — Tailwind's own utility classes cover the same functionality with the standard Tailwind naming convention.

## Known Limitations

1. **Breakpoints use raw pixel values** — CSS `@media` queries cannot evaluate `var()` expressions, so the `screens` config contains literal values (`640px`, `768px`, etc.) instead of CSS variable references. If you change breakpoint tokens, rebuild the preset.

2. **Shadow color modifiers don't work** — Tailwind's `shadow-primary-500` syntax requires decomposed shadow values. Cobalt shadow tokens are full expressions, so use them as-is: `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`.

3. **Z-index in JS plugins** — The `var()` references work in CSS output but not in Tailwind plugins that expect numeric values for JavaScript calculations.

4. **`fontFamily` wrapping (v3)** — Font families are wrapped as single-element arrays (`['var(--co-font-family-sans)']`). The browser resolves the CSS variable to the full font stack at runtime.
