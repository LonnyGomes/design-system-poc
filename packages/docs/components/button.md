# Button

The `cb-button` component is a themed wrapper around Shoelace's `sl-button`.

## Demo

<ClientOnly>
  <cb-button variant="primary">Primary</cb-button>
  <cb-button variant="secondary">Secondary</cb-button>
  <cb-button variant="danger">Danger</cb-button>
  <cb-button variant="ghost">Ghost</cb-button>
</ClientOnly>

## Sizes

<ClientOnly>
  <cb-button size="sm">Small</cb-button>
  <cb-button size="md">Medium</cb-button>
  <cb-button size="lg">Large</cb-button>
</ClientOnly>

## States

<ClientOnly>
  <cb-button disabled>Disabled</cb-button>
  <cb-button loading>Loading</cb-button>
</ClientOnly>

## Slots

<ClientOnly>
  <cb-button>
    <span slot="prefix">★</span>
    With Prefix
  </cb-button>
  <cb-button>
    With Suffix
    <span slot="suffix">→</span>
  </cb-button>
</ClientOnly>

## Usage

### HTML

```html
<cb-button variant="primary" size="md">Click me</cb-button>
<cb-button variant="danger" disabled>Disabled</cb-button>
```

### React

```tsx
import { Button } from '@cobalt/react';

function App() {
  return (
    <Button variant="primary" onCbFocus={() => console.log('focused')}>
      Click me
    </Button>
  );
}
```

## API

| Property   | Type                                              | Default     | Description             |
| ---------- | ------------------------------------------------- | ----------- | ----------------------- |
| `variant`  | `'primary' \| 'secondary' \| 'danger' \| 'ghost'` | `'primary'` | The button variant      |
| `size`     | `'sm' \| 'md' \| 'lg'`                            | `'md'`      | The button size         |
| `disabled` | `boolean`                                         | `false`     | Disables the button     |
| `loading`  | `boolean`                                         | `false`     | Shows a loading spinner |
| `type`     | `'submit' \| 'reset' \| 'button'`                 | `'button'`  | The button type         |
| `href`     | `string`                                          | —           | Renders as a link       |
| `target`   | `'_blank' \| '_self' \| '_parent' \| '_top'`      | —           | Link target             |

## Events

| Event      | Description                         |
| ---------- | ----------------------------------- |
| `cb-focus` | Emitted when the button is focused  |
| `cb-blur`  | Emitted when the button loses focus |

## Slots

| Name     | Description              |
| -------- | ------------------------ |
| default  | The button label         |
| `prefix` | Content before the label |
| `suffix` | Content after the label  |

## CSS Parts

| Part     | Description                   |
| -------- | ----------------------------- |
| `base`   | The underlying button element |
| `label`  | The button label container    |
| `prefix` | The prefix container          |
| `suffix` | The suffix container          |
