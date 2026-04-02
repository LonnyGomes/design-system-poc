# Token Reference

<script setup>
import { data } from './tokens.data';
</script>

Browse and search all Cobalt design tokens. Click any token name to copy it to your clipboard.

<TokenTable :tokens="data.tokens" />

## Available Formats

Tokens are available in multiple formats via the `@cobalt/tokens` package:

| Format                | Import                    |
| --------------------- | ------------------------- |
| CSS Custom Properties | `@cobalt/tokens/css`      |
| Dark Theme            | `@cobalt/tokens/css/dark` |
| SCSS Variables        | `@cobalt/tokens/scss`     |
| JS Constants          | `@cobalt/tokens`          |
| JSON (flat)           | `@cobalt/tokens/json`     |

### CSS

```css
@import '@cobalt/tokens/css';
@import '@cobalt/tokens/css/dark'; /* opt-in dark theme */

.card {
  padding: var(--co-space-inset-md);
  border-radius: var(--co-shape-radius-md);
  background: var(--co-color-surface-raised);
}
```

### JavaScript / TypeScript

```js
import { CoSpaceInsetMd, CoShapeRadiusMd } from '@cobalt/tokens';
```
