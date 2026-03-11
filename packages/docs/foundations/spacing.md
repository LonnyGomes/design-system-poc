# Spacing

Cobalt uses a **4 px base unit** spacing scale. Every spacing token is a multiple of 4, which keeps layouts aligned to a consistent grid and simplifies visual rhythm across components and pages.

## Scale

| Token             | Value | Common use                                |
| ----------------- | ----- | ----------------------------------------- |
| `--cb-spacing-4`  | 4 px  | Inline icon gap, tight padding            |
| `--cb-spacing-8`  | 8 px  | Input padding (inline), badge padding     |
| `--cb-spacing-12` | 12 px | Compact component padding                 |
| `--cb-spacing-16` | 16 px | Default component padding, card body      |
| `--cb-spacing-20` | 20 px | Form field gap                            |
| `--cb-spacing-24` | 24 px | Section padding on small screens          |
| `--cb-spacing-32` | 32 px | Card padding, modal body                  |
| `--cb-spacing-40` | 40 px | Section padding on medium screens         |
| `--cb-spacing-48` | 48 px | Large section gaps                        |
| `--cb-spacing-64` | 64 px | Page-level section separation             |
| `--cb-spacing-80` | 80 px | Hero area padding                         |
| `--cb-spacing-96` | 96 px | Maximum section padding on wide viewports |

## Usage in CSS

Reference spacing tokens with `var()`:

```css
.cb-card {
  padding: var(--cb-spacing-24);
  gap: var(--cb-spacing-16);
  display: flex;
  flex-direction: column;
}

.cb-stack > * + * {
  margin-top: var(--cb-spacing-16);
}
```

Tokens also work in `calc()` expressions when you need derived values:

```css
.cb-sidebar {
  width: calc(var(--cb-spacing-64) * 4); /* 256 px */
  padding: var(--cb-spacing-24) var(--cb-spacing-16);
}
```

## Choosing the right size

Use these guidelines to decide which token fits your context:

| Context                                    | Recommended tokens                     |
| ------------------------------------------ | -------------------------------------- |
| Inline elements (icon + label)             | `--cb-spacing-4` to `--cb-spacing-8`   |
| Inside compact controls (badges, chips)    | `--cb-spacing-4` to `--cb-spacing-8`   |
| Inside standard controls (buttons, inputs) | `--cb-spacing-8` to `--cb-spacing-12`  |
| Component internal padding (cards, alerts) | `--cb-spacing-16` to `--cb-spacing-24` |
| Between sibling components                 | `--cb-spacing-16` to `--cb-spacing-32` |
| Page sections                              | `--cb-spacing-48` to `--cb-spacing-96` |

> **Tip:** When in doubt, start with `--cb-spacing-16` and adjust up or down by one step. Jumping more than two steps between adjacent elements usually signals a missing layout container.

## Responsive spacing

Spacing tokens are static values, but you can combine them with breakpoint media queries to scale padding at different viewport sizes:

```css
.cb-section {
  padding-block: var(--cb-spacing-32);
}

@media (min-width: 768px) {
  .cb-section {
    padding-block: var(--cb-spacing-48);
  }
}

@media (min-width: 1280px) {
  .cb-section {
    padding-block: var(--cb-spacing-80);
  }
}
```

## Best practices

1. **Stick to the scale.** Avoid arbitrary values like `13px` or `1.125rem` — they break the 4 px grid.
2. **Use logical properties.** Prefer `padding-inline` and `margin-block` over `padding-left` for better RTL support.
3. **Keep related elements closer.** The Gestalt principle of proximity applies — tighter spacing signals grouping.
4. **Be generous with whitespace at the page level.** Sections separated by `--cb-spacing-64` or more feel less cluttered and improve scanning.

## Related

- [Breakpoints](./breakpoints.md) — responsive viewport tokens
- [Elevation](./elevation.md) — visual depth layers that complement spacing
