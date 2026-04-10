# Typography

Typography in Cobalt is built on a purposeful set of font families, a type scale, and consistent weight and line-height tokens. Today these foundations are exposed as primitive font tokens in `primitives.json`.

## Font families

| Token                   | Stack                                                                                     | Usage                          |
| ----------------------- | ----------------------------------------------------------------------------------------- | ------------------------------ |
| `--co-font-family-sans` | `'Inter', 'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` | Body text, UI labels, headings |
| `--co-font-family-mono` | `'JetBrains Mono', 'Fira Code', monospace`                                                | Code blocks, technical values  |

Import the self-hosted fonts from `@cobalt/tokens` — no additional packages needed:

```css
@import '@cobalt/tokens/css/fonts';
```

> **Tip:** Inter is the primary UI font. Noto Sans is included as a fallback for extended character sets (CJK, Cyrillic, Greek, math symbols, etc.). If neither loads, the token stack falls back to the operating system's default sans-serif font.

## Type scale

The scale uses a modular ratio that produces consistent visual hierarchy.

| Token                | Size  | Rem       | Typical use              |
| -------------------- | ----- | --------- | ------------------------ |
| `--co-font-size-xs`  | 12 px | 0.75 rem  | Captions, badges         |
| `--co-font-size-sm`  | 14 px | 0.875 rem | Helper text, table cells |
| `--co-font-size-md`  | 16 px | 1 rem     | Body copy                |
| `--co-font-size-lg`  | 18 px | 1.125 rem | Subtitles, card titles   |
| `--co-font-size-xl`  | 20 px | 1.25 rem  | Section headings         |
| `--co-font-size-2xl` | 24 px | 1.5 rem   | Page sub-headings        |
| `--co-font-size-3xl` | 30 px | 1.875 rem | Page titles              |
| `--co-font-size-4xl` | 36 px | 2.25 rem  | Hero headings            |

## Font weights

| Token                       | Value | Usage                        |
| --------------------------- | ----- | ---------------------------- |
| `--co-font-weight-regular`  | 400   | Body text                    |
| `--co-font-weight-medium`   | 500   | Labels, navigation items     |
| `--co-font-weight-semibold` | 600   | Sub-headings, emphasis       |
| `--co-font-weight-bold`     | 700   | Page titles, strong emphasis |

## Line heights

| Token                           | Value | Pairing                                    |
| ------------------------------- | ----- | ------------------------------------------ |
| `--co-font-line-height-tight`   | 1.25  | Headings (`font-size-xl` and above)        |
| `--co-font-line-height-normal`  | 1.5   | Body text (`font-size-md`, `font-size-sm`) |
| `--co-font-line-height-relaxed` | 1.75  | Long-form reading, help text               |

## Usage examples

### CSS

```css
.co-heading {
  font-family: var(--co-font-family-sans);
  font-size: var(--co-font-size-2xl);
  font-weight: var(--co-font-weight-bold);
  line-height: var(--co-font-line-height-tight);
  color: var(--co-color-text-default);
}

.co-body {
  font-family: var(--co-font-family-sans);
  font-size: var(--co-font-size-md);
  font-weight: var(--co-font-weight-regular);
  line-height: var(--co-font-line-height-normal);
  color: var(--co-color-text-default);
}
```

### React / TSX

```tsx
import styles from './Article.module.css';

export function Article({ title, body }: { title: string; body: string }) {
  return (
    <article>
      <h1 className={styles.heading}>{title}</h1>
      <p className={styles.body}>{body}</p>
    </article>
  );
}
```

## Best practices

- Set `font-size: 100%` on `<html>` so rem values respect user browser settings.
- Avoid absolute units (`px`) for font sizes in component CSS; rely on the token rem values instead.
- Limit the number of sizes on a single screen to three or four to maintain clear hierarchy.
- Pair `--co-font-line-height-tight` with headings and `--co-font-line-height-normal` with body text for optimal readability.

## Related

- [Colors](./colors.md) — text color tokens
- [Accessibility](./accessibility.md) — readable font sizes and contrast
