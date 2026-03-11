# Typography

Typography in Cobalt is built on a purposeful set of font families, a harmonious type scale, and consistent weight and line-height tokens. These choices ensure readability and visual rhythm across every screen size.

## Font families

| Token            | Stack                                                          | Usage                          |
| ---------------- | -------------------------------------------------------------- | ------------------------------ |
| `--cb-font-sans` | `'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif` | Body text, UI labels, headings |
| `--cb-font-mono` | `'JetBrains Mono', ui-monospace, 'Cascadia Code', monospace`   | Code blocks, technical values  |

Install the recommended web fonts via your package manager or a CDN:

```bash
npm install @fontsource/inter @fontsource/jetbrains-mono
```

```css
@import '@fontsource/inter/variable.css';
@import '@fontsource/jetbrains-mono/variable.css';
```

> **Tip:** If you cannot load Inter, the token stack falls back to the operating system's default sans-serif font — no blank text will ever appear.

## Type scale

The scale uses a modular ratio that produces consistent visual hierarchy.

| Token            | Size  | Rem       | Typical use              |
| ---------------- | ----- | --------- | ------------------------ |
| `--cb-text-xs`   | 12 px | 0.75 rem  | Captions, badges         |
| `--cb-text-sm`   | 14 px | 0.875 rem | Helper text, table cells |
| `--cb-text-base` | 16 px | 1 rem     | Body copy                |
| `--cb-text-lg`   | 18 px | 1.125 rem | Subtitles, card titles   |
| `--cb-text-xl`   | 20 px | 1.25 rem  | Section headings         |
| `--cb-text-2xl`  | 24 px | 1.5 rem   | Page sub-headings        |
| `--cb-text-3xl`  | 30 px | 1.875 rem | Page titles              |

## Font weights

| Token                | Value | Usage                        |
| -------------------- | ----- | ---------------------------- |
| `--cb-font-regular`  | 400   | Body text                    |
| `--cb-font-medium`   | 500   | Labels, navigation items     |
| `--cb-font-semibold` | 600   | Sub-headings, emphasis       |
| `--cb-font-bold`     | 700   | Page titles, strong emphasis |

## Line heights

| Token                  | Value | Pairing                            |
| ---------------------- | ----- | ---------------------------------- |
| `--cb-leading-tight`   | 1.25  | Headings (`text-xl` and above)     |
| `--cb-leading-normal`  | 1.5   | Body text (`text-base`, `text-sm`) |
| `--cb-leading-relaxed` | 1.75  | Long-form reading, help text       |

## Usage examples

### CSS

```css
.cb-heading {
  font-family: var(--cb-font-sans);
  font-size: var(--cb-text-2xl);
  font-weight: var(--cb-font-bold);
  line-height: var(--cb-leading-tight);
  color: var(--cb-color-neutral-900);
}

.cb-body {
  font-family: var(--cb-font-sans);
  font-size: var(--cb-text-base);
  font-weight: var(--cb-font-regular);
  line-height: var(--cb-leading-normal);
  color: var(--cb-color-neutral-700);
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
- Pair `--cb-leading-tight` with headings and `--cb-leading-normal` with body text for optimal readability.

## Related

- [Colors](./colors.md) — text color tokens
- [Accessibility](./accessibility.md) — readable font sizes and contrast
