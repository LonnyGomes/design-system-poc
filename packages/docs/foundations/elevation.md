# Elevation

Elevation tokens provide consistent shadow values that communicate depth and hierarchy in the Cobalt Design System. Higher elevation draws more attention and implies that an element floats above the content beneath it.

## Shadow levels

| Token            | CSS value                                                             | Typical use                                  |
| ---------------- | --------------------------------------------------------------------- | -------------------------------------------- |
| `--cb-shadow-sm` | `0 1px 2px 0 rgb(0 0 0 / 0.05)`                                       | Subtle lift — buttons at rest, input borders |
| `--cb-shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`    | Cards, dropdowns                             |
| `--cb-shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`  | Popovers, floating toolbars                  |
| `--cb-shadow-xl` | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` | Modals, dialogs                              |

A special **none** token is also available for explicitly removing shadows:

```css
--cb-shadow-none: 0 0 #0000;
```

## When to use each level

| Level  | Guidance                                                                                                |
| ------ | ------------------------------------------------------------------------------------------------------- |
| **sm** | Default resting state for interactive surfaces that need a slight lift (e.g., a card in a flat layout). |
| **md** | Elements that sit one layer above the page, such as cards with hover states or dropdown menus.          |
| **lg** | Floating elements that overlay page content temporarily — popovers, tooltips, date pickers.             |
| **xl** | Full-screen or near-full-screen overlays — modals, dialogs, command palettes.                           |

> **Tip:** Avoid stacking multiple elevated elements on top of each other. If a popover appears inside a modal, both should use `--cb-shadow-xl` to sit at the same perceived layer.

## Usage in CSS

```css
.cb-card {
  box-shadow: var(--cb-shadow-md);
  border-radius: var(--cb-radius-lg);
  background: var(--cb-color-neutral-0);
}

.cb-card:hover {
  box-shadow: var(--cb-shadow-lg);
}

.cb-dialog-overlay {
  position: fixed;
  inset: 0;
  background: rgb(0 0 0 / 0.4);
}

.cb-dialog {
  box-shadow: var(--cb-shadow-xl);
  border-radius: var(--cb-radius-xl);
  background: var(--cb-color-neutral-0);
}
```

## Dark mode considerations

In dark mode, shadows alone are not enough to communicate depth because the base background is already dark. Cobalt supplements shadows with subtle background-color shifts:

```css
[data-theme='dark'] {
  --cb-surface-raised: var(--cb-color-neutral-800);
  --cb-surface-overlay: var(--cb-color-neutral-700);
}
```

Components automatically apply these surface tokens, so shadows remain visible without becoming excessively dark.

## Transitions

Pair elevation changes with the motion system so shadows animate smoothly:

```css
.cb-card {
  transition: box-shadow var(--cb-duration-normal) var(--cb-ease);
}
```

See [Motion](./motion.md) for the full set of duration and easing tokens.

## Best practices

1. **Use elevation sparingly.** Not every surface needs a shadow. Flat surfaces with border tokens often suffice.
2. **Match elevation to interaction.** Resting elements stay at `sm` or `md`; active overlays move to `lg` or `xl`.
3. **Never combine border and heavy shadow.** Choose one depth cue per element to keep the visual language clean.
4. **Test in both themes.** Shadows render differently on light and dark backgrounds — always verify both.

## Related

- [Motion](./motion.md) — animating elevation transitions
- [Colors](./colors.md) — surface and background tokens
