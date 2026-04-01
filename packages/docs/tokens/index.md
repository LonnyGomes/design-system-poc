# Design Tokens

Cobalt uses [Style Dictionary](https://amzn.github.io/style-dictionary/) to generate design tokens in multiple formats.

## Available Formats

| Format                | Import                    |
| --------------------- | ------------------------- |
| CSS Custom Properties | `@cobalt/tokens/css`      |
| Dark Theme            | `@cobalt/tokens/css/dark` |
| SCSS Variables        | `@cobalt/tokens/scss`     |
| JS Constants          | `@cobalt/tokens`          |
| JSON (flat)           | `@cobalt/tokens/json`     |

## Usage

```css
@import '@cobalt/tokens/css';
@import '@cobalt/tokens/css/dark';
```

```js
import { CoColorPrimary600 } from '@cobalt/tokens';
```

## Color Tokens

### Primary

| Token                         | Value                                                                                                                                      |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `--co-color-primary-subtle`   | <span style="display:inline-block;width:16px;height:16px;background:#e8efff;border:1px solid #ccc;vertical-align:middle"></span> `#e8efff` |
| `--co-color-primary-light`    | <span style="display:inline-block;width:16px;height:16px;background:#a3bfff;border:1px solid #ccc;vertical-align:middle"></span> `#a3bfff` |
| `--co-color-primary-base`     | <span style="display:inline-block;width:16px;height:16px;background:#154bcc;border:1px solid #ccc;vertical-align:middle"></span> `#154bcc` |
| `--co-color-primary-dark`     | <span style="display:inline-block;width:16px;height:16px;background:#0a2666;border:1px solid #ccc;vertical-align:middle"></span> `#0a2666` |
| `--co-color-primary-contrast` | <span style="display:inline-block;width:16px;height:16px;background:#ffffff;border:1px solid #ccc;vertical-align:middle"></span> `#ffffff` |

## Spacing Scale

| Token          | Value           |
| -------------- | --------------- |
| `--co-space-1` | `0.25rem` (4px) |
| `--co-space-2` | `0.5rem` (8px)  |
| `--co-space-4` | `1rem` (16px)   |
| `--co-space-6` | `1.5rem` (24px) |
| `--co-space-8` | `2rem` (32px)   |
