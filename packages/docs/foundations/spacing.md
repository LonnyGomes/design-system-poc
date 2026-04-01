# Spacing

Cobalt uses a **4 px base unit** spacing scale. Every spacing token is a multiple of 4, which keeps layouts aligned to a consistent grid and simplifies visual rhythm across components and pages.

## Scale

| Token           | Value | Common use                                |
| --------------- | ----- | ----------------------------------------- |
| `--co-space-4`  | 4 px  | Inline icon gap, tight padding            |
| `--co-space-8`  | 8 px  | Input padding (inline), badge padding     |
| `--co-space-12` | 12 px | Compact component padding                 |
| `--co-space-16` | 16 px | Default component padding, card body      |
| `--co-space-20` | 20 px | Form field gap                            |
| `--co-space-24` | 24 px | Section padding on small screens          |
| `--co-space-32` | 32 px | Card padding, modal body                  |
| `--co-space-40` | 40 px | Section padding on medium screens         |
| `--co-space-48` | 48 px | Large section gaps                        |
| `--co-space-64` | 64 px | Page-level section separation             |
| `--co-space-80` | 80 px | Hero area padding                         |
| `--co-space-96` | 96 px | Maximum section padding on wide viewports |

## Usage in CSS

Reference spacing tokens with `var()`:

```css
.co-card {
  padding: var(--co-space-24);
  gap: var(--co-space-16);
  display: flex;
  flex-direction: column;
}

.co-stack > * + * {
  margin-top: var(--co-space-16);
}
```

Tokens also work in `calc()` expressions when you need derived values:

```css
.co-sidebar {
  width: calc(var(--co-space-64) * 4); /* 256 px */
  padding: var(--co-space-24) var(--co-space-16);
}
```

## Choosing the right size

Use these guidelines to decide which token fits your context:

| Context                                    | Recommended tokens                 |
| ------------------------------------------ | ---------------------------------- |
| Inline elements (icon + label)             | `--co-space-4` to `--co-space-8`   |
| Inside compact controls (badges, chips)    | `--co-space-4` to `--co-space-8`   |
| Inside standard controls (buttons, inputs) | `--co-space-8` to `--co-space-12`  |
| Component internal padding (cards, alerts) | `--co-space-16` to `--co-space-24` |
| Between sibling components                 | `--co-space-16` to `--co-space-32` |
| Page sections                              | `--co-space-48` to `--co-space-96` |

> **Tip:** When in doubt, start with `--co-space-16` and adjust up or down by one step. Jumping more than two steps between adjacent elements usually signals a missing layout container.

## Responsive spacing

Spacing tokens are static values, but you can combine them with breakpoint media queries to scale padding at different viewport sizes:

```css
.co-section {
  padding-block: var(--co-space-32);
}

@media (min-width: 768px) {
  .co-section {
    padding-block: var(--co-space-48);
  }
}

@media (min-width: 1280px) {
  .co-section {
    padding-block: var(--co-space-80);
  }
}
```

## Best practices

1. **Stick to the scale.** Avoid arbitrary values like `13px` or `1.125rem` — they break the 4 px grid.
2. **Use logical properties.** Prefer `padding-inline` and `margin-block` over `padding-left` for better RTL support.
3. **Keep related elements closer.** The Gestalt principle of proximity applies — tighter spacing signals grouping.
4. **Be generous with whitespace at the page level.** Sections separated by `--co-space-64` or more feel less cluttered and improve scanning.

## Related

- [Breakpoints](./breakpoints.md) — responsive viewport tokens
- [Elevation](./elevation.md) — visual depth layers that complement spacing
