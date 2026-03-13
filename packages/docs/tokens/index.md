# Design Tokens

Cobalt uses [Style Dictionary](https://amzn.github.io/style-dictionary/) to generate design tokens in multiple formats.

## Available Formats

| Format                | Import                        |
| --------------------- | ----------------------------- |
| CSS Custom Properties | `@cobalt/tokens/css`          |
| Dark Theme            | `@cobalt/tokens/css/dark`     |
| Shoelace Mapping      | `@cobalt/tokens/css/shoelace` |
| SCSS Variables        | `@cobalt/tokens/scss`         |
| JS Constants          | `@cobalt/tokens`              |
| JSON (flat)           | `@cobalt/tokens/json`         |

## Usage

```css
@import '@cobalt/tokens/css';
@import '@cobalt/tokens/css/dark';
@import '@cobalt/tokens/css/shoelace';
```

```js
import { CoColorPrimary600 } from '@cobalt/tokens';
```

## Color Tokens

### Primary

| Token                    | Value                                                                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `--co-color-primary-50`  | <span style="display:inline-block;width:16px;height:16px;background:#eff6ff;border:1px solid #ccc;vertical-align:middle"></span> `#eff6ff` |
| `--co-color-primary-500` | <span style="display:inline-block;width:16px;height:16px;background:#3b82f6;border:1px solid #ccc;vertical-align:middle"></span> `#3b82f6` |
| `--co-color-primary-600` | <span style="display:inline-block;width:16px;height:16px;background:#2563eb;border:1px solid #ccc;vertical-align:middle"></span> `#2563eb` |
| `--co-color-primary-900` | <span style="display:inline-block;width:16px;height:16px;background:#1e3a8a;border:1px solid #ccc;vertical-align:middle"></span> `#1e3a8a` |

## Spacing Scale

| Token            | Value           |
| ---------------- | --------------- |
| `--co-spacing-1` | `0.25rem` (4px) |
| `--co-spacing-2` | `0.5rem` (8px)  |
| `--co-spacing-4` | `1rem` (16px)   |
| `--co-spacing-6` | `1.5rem` (24px) |
| `--co-spacing-8` | `2rem` (32px)   |
