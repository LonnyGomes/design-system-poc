# Motion

Motion makes interfaces feel responsive and alive. The Cobalt motion system defines **duration tokens** and **easing curves** that keep animations consistent, purposeful, and accessible.

## Duration tokens

| Token                  | Value  | Use case                                        |
| ---------------------- | ------ | ----------------------------------------------- |
| `--cb-duration-fast`   | 100 ms | Micro-interactions — checkbox toggle, icon swap |
| `--cb-duration-normal` | 200 ms | Default — button hover, input focus ring        |
| `--cb-duration-slow`   | 300 ms | Expanding panels, dropdown open                 |
| `--cb-duration-slower` | 500 ms | Full-page transitions, skeleton fade-in         |

> **Tip:** Shorter durations feel snappier but can go unnoticed. Longer durations draw attention — reserve them for layout-level changes where the user needs to track what moved.

## Easing curves

| Token              | CSS value                           | Character                              |
| ------------------ | ----------------------------------- | -------------------------------------- |
| `--cb-ease`        | `cubic-bezier(0.25, 0.1, 0.25, 1)`  | General purpose — smooth and natural   |
| `--cb-ease-in`     | `cubic-bezier(0.42, 0, 1, 1)`       | Elements leaving the screen            |
| `--cb-ease-out`    | `cubic-bezier(0, 0, 0.58, 1)`       | Elements entering the screen           |
| `--cb-ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful overshoot — tooltips, popovers |

## Usage in CSS

### Transition shorthand

```css
.cb-button {
  background: var(--cb-color-primary-600);
  transition:
    background-color var(--cb-duration-normal) var(--cb-ease),
    box-shadow var(--cb-duration-normal) var(--cb-ease);
}

.cb-button:hover {
  background: var(--cb-color-primary-700);
  box-shadow: var(--cb-shadow-md);
}
```

### Keyframe animation

```css
@keyframes cb-fade-in {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.cb-dropdown-menu {
  animation: cb-fade-in var(--cb-duration-slow) var(--cb-ease-out);
}
```

### Expanding and collapsing

```css
.cb-accordion-body {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--cb-duration-slow) var(--cb-ease);
}

.cb-accordion[open] .cb-accordion-body {
  grid-template-rows: 1fr;
}
```

## Animation principles

1. **Be purposeful.** Every animation should serve a functional goal — guide attention, show causality, or maintain spatial context.
2. **Be brief.** Most transitions should complete within 200 ms. Users perceive delays above 400 ms as sluggish.
3. **Be consistent.** Use the same duration and easing for similar actions. All hover states should feel identical across components.
4. **Respect user preferences.** Honor the `prefers-reduced-motion` media query.

## Reduced motion

Always wrap non-essential animations in a motion query so users who have requested reduced motion see a static or simplified experience:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Cobalt ships this reset in `@cobalt/tokens/css/tokens.css`, so all components respect it by default.

## Related

- [Elevation](./elevation.md) — animating shadow transitions
- [Accessibility](./accessibility.md) — `prefers-reduced-motion` and inclusive design
