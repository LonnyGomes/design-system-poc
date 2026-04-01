# CSS Cascade Layers

Cobalt uses [CSS cascade layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) to give consumers predictable control over style overrides — no specificity battles required.

## What are cascade layers?

When you integrate a third-party CSS library, you often end up fighting specificity. A library selector like `.btn.btn-primary` requires increasingly specific selectors to override, leading to fragile, hard-to-maintain stylesheets.

**`@layer` solves this.** It groups CSS rules into named layers with a declared priority order. Rules in a higher-priority layer _always_ beat rules in a lower-priority layer, regardless of selector specificity.

```css
@layer base, overrides;

@layer base {
  .button {
    color: blue;
  }
}

@layer overrides {
  .button {
    color: red; /* wins — "overrides" is declared after "base" */
  }
}
```

Because `overrides` is declared after `base`, the red color wins even though both selectors have the same specificity. You could even use a less specific selector in the higher layer and it would still win.

## Cobalt's layer stack

Cobalt declares six layers in a fixed order. Later layers always take priority over earlier ones:

| Priority    | Layer          | Purpose                                       | Who edits         |
| ----------- | -------------- | --------------------------------------------- | ----------------- |
| 1 (lowest)  | `co.reset`     | CSS resets                                    | Consumer          |
| 2           | `co.base`      | Opt-in base element styles (`[data-co-base]`) | System            |
| 3           | `co.tokens`    | Light-mode token definitions (`:root`)        | System            |
| 4           | `co.theme`     | Dark-mode + custom theme overrides            | System / Consumer |
| 5           | `co.utilities` | Utility classes (`.co-*`)                     | System            |
| 6 (highest) | `co.overrides` | Consumer brand customizations                 | Consumer          |

The layer order is declared by `@cobalt/tokens/css`:

```css
@layer co.reset, co.base, co.tokens, co.theme, co.utilities, co.overrides;
```

## Import order

`@cobalt/tokens/css` **must be imported first** because it declares the layer order. All subsequent Cobalt stylesheets place their rules into the appropriate layer.

```js
import '@cobalt/tokens/css'; // 1. Layer order + token definitions
import '@cobalt/tokens/css/fonts'; // 2. Self-hosted font faces
import '@cobalt/tokens/css/base'; // 3. Opt-in base element styles
import '@cobalt/tokens/css/utilities'; // 4. Optional utility classes
```

If you import another stylesheet before `@cobalt/tokens/css`, the browser may create a different layer order and Cobalt's overrides won't work as intended.

## Customizing with the override layer

Need to change a token value for your brand? Place your overrides in `co.overrides` and they'll beat every other Cobalt layer — no `!important`, no specificity tricks:

```css
@layer co.overrides {
  :root {
    --co-color-primary-base: #8b5cf6;
    --co-shape-radius-md: 8px;
  }
}
```

This works because `co.overrides` is the highest-priority layer in the stack. Even if Cobalt's internal styles use a more specific selector, your override layer wins.

## Placing your reset

If your app uses a CSS reset (like Normalize or a custom one), place it inside `co.reset` so it sits below all Cobalt styles:

```css
@layer co.reset {
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
  }
}
```

Because `co.reset` is the lowest-priority layer, it will never accidentally override Cobalt's token values or component styles.

## Related

- [Colors](/foundations/colors) — Theming and color tokens
- [Utility Classes](/foundations/utilities) — Token-mapped CSS utility classes
- [Tailwind Integration](/foundations/tailwind) — Using Tailwind alongside Cobalt
