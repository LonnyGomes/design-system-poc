# Typography

Cobalt typography now has two layers:

- foundational font tokens for raw scale, weight, and family values
- semantic text-role tokens for stable UI and content roles

Use the semantic roles when you want consistency across components and screens. Reach for the foundational scale only when you are defining or revising the system itself.

## Foundations

The foundational layer defines the reusable font families, type scale, weights, and line heights.

| Foundation token               | Value                   | Purpose                               |
| ------------------------------ | ----------------------- | ------------------------------------- |
| `--co-font-family-sans`        | Inter / Noto Sans stack | Primary UI and content font           |
| `--co-font-family-mono`        | JetBrains Mono stack    | Code and technical values             |
| `--co-font-size-sm`            | `0.875rem`              | Compact UI text                       |
| `--co-font-size-md`            | `1rem`                  | Default body/control size             |
| `--co-font-size-lg`            | `1.125rem`              | Prominent controls and short headings |
| `--co-font-size-4xl`           | `2.25rem`               | Large page titles                     |
| `--co-font-weight-regular`     | `400`                   | Body text                             |
| `--co-font-weight-medium`      | `500`                   | Labels and controls                   |
| `--co-font-weight-semibold`    | `600`                   | Sub-headings                          |
| `--co-font-weight-bold`        | `700`                   | Primary headings                      |
| `--co-font-line-height-tight`  | `1.25`                  | Headings and controls                 |
| `--co-font-line-height-normal` | `1.5`                   | Body and caption text                 |

## Semantic Roles

The semantic layer turns those foundations into named roles that components and documentation can depend on.

| Semantic token group                | Purpose                                           |
| ----------------------------------- | ------------------------------------------------- |
| `--co-text-body-*`                  | Default reading and paragraph text                |
| `--co-text-control-*`               | Button labels and control chrome                  |
| `--co-text-label-*`                 | Form labels and dense UI labels                   |
| `--co-text-caption-*`               | Helper text, metadata, and supporting copy        |
| `--co-text-code-*`                  | Inline code and technical snippets                |
| `--co-text-heading-h1-*` ... `h6-*` | Content hierarchy for editorial and docs surfaces |

## Recommended Usage

### Body text

```css
.article-copy {
  font-family: var(--co-text-body-font-family);
  font-size: var(--co-text-body-size);
  font-weight: var(--co-text-body-weight);
  line-height: var(--co-text-body-line-height);
  color: var(--co-color-text-default);
}
```

### Controls

```css
.primary-action {
  font-family: var(--co-text-control-font-family);
  font-size: var(--co-text-control-size);
  font-weight: var(--co-text-control-weight);
  line-height: var(--co-text-control-line-height);
}
```

### Field labels and helper text

```css
.field-label {
  font-family: var(--co-text-label-font-family);
  font-size: var(--co-text-label-size);
  font-weight: var(--co-text-label-weight);
  line-height: var(--co-text-label-line-height);
}

.field-help {
  font-family: var(--co-text-caption-font-family);
  font-size: var(--co-text-caption-size);
  font-weight: var(--co-text-caption-weight);
  line-height: var(--co-text-caption-line-height);
}
```

## Current System Mapping

These semantic roles are already wired into the system:

- base rich-text styles consume `body`, `caption`, `code`, and `heading` roles
- `co-button` consumes `text.control`
- `co-input` consumes `text.body`, `text.label`, and `text.caption`

## Governance Rule

- Use `co.text.*` tokens in component and docs styling when you mean a stable role
- Use `co.font.*` primitives only when defining new semantic roles or making intentional one-off exceptions

## Related

- [Colors](./colors.md)
- [Accessibility](./accessibility.md)
- [Token Reference](/tokens/)
