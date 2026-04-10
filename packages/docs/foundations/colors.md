# Colors

<script setup>
import { data } from './colors.data';
</script>

The Cobalt color system is organized into **primitive palettes** and **semantic color tokens**. Primitive colors live in `primitives.color.json`; semantic color roles live in `semantic.theme.default.light.json` and `semantic.theme.default.dark.json` so the same UI role can adapt by theme or mode.

## Core palette

The core palette includes **Neutral** and the four colors used by semantic tokens (Blue, Red, Green, Orange).

<ColorSwatch :palettes="data.corePalettes" />

## Extended palette

Additional primitives available for illustrations, data visualization, status indicators, and brand expression. These do not have semantic aliases — reference them directly via `--co-color-primitive-{name}-{shade}`.

<ColorSwatch :palettes="data.extendedPalettes" />

## Semantic tokens

Semantic tokens abstract primitives so your UI adapts to theme changes without touching component code.

| Token                            | Light mode value | Dark mode value | Usage                             |
| -------------------------------- | ---------------- | --------------- | --------------------------------- |
| `--co-color-primary-base`        | `#154bcc`        | `#487eff`       | Primary actions, links            |
| `--co-color-surface-page`        | `#f7f7f7`        | `#0c0c0d`       | Page background                   |
| `--co-color-surface-raised`      | `#fcfcfc`        | `#1e1f21`       | Subtle backgrounds                |
| `--co-color-text-default`        | `#1e1f21`        | `#fcfcfc`       | Body text                         |
| `--co-color-text-tertiary`       | `#b1b1b1`        | `#919191`       | Low-emphasis text                 |
| `--co-color-danger-base`         | `#a61b12`        | `#d94e45`       | Destructive actions, errors       |
| `--co-color-success-base`        | `#16652a`        | `#49985d`       | Success states                    |
| `--co-color-warning-base`        | `#c78017`        | `#fab34a`       | Warning indicators                |
| `--co-color-interactive-default` | `#1a5eff`        | `#1a5eff`       | Default interactive backgrounds   |
| `--co-color-border-focus`        | `#1a5eff`        | `#487eff`       | Focus outlines and active borders |

## Usage in CSS

Reference tokens with `var()`:

```css
.co-button--primary {
  background-color: var(--co-color-interactive-default);
  color: var(--co-color-text-on-primary);
}

.co-alert--danger {
  background-color: var(--co-color-feedback-danger-bg);
  border-left: 4px solid var(--co-color-danger-base);
  color: var(--co-color-feedback-danger-text);
}
```

## Light and dark mode

Cobalt ships two published token layers today:

- `@cobalt/tokens/css` for the default light values
- `@cobalt/tokens/css/dark` for the default dark overrides

The recommended selector model for dark mode is `data-theme="default" data-mode="dark"`. For backward compatibility, the dark stylesheet also supports `data-theme="dark"` for the default dark theme.

```css
/* Automatically provided by @cobalt/tokens */
:root {
  --co-color-primary-base: #154bcc;
  --co-color-text-default: #1e1f21;
}

[data-theme='dark'],
[data-theme='default'][data-mode='dark'] {
  --co-color-primary-base: #487eff;
  --co-color-text-default: #fcfcfc;
}
```

No component CSS needs to change — the same `var(--co-color-primary-base)` resolves to the correct value in either mode.

> **Tip:** Always verify that foreground/background pairings meet a minimum contrast ratio of **4.5:1** for normal text and **3:1** for large text, as required by WCAG 2.1 AA.

## Accessibility

- All default semantic pairings satisfy WCAG 2.1 AA contrast requirements.
- Never rely on color alone to communicate meaning — always pair color with text, icons, or patterns.
- Use the `--co-color-border-focus` token for keyboard-focus outlines.

## Related

- [Accessibility Standards](./accessibility.md)
- [Tokens reference](../tokens/index.md)
