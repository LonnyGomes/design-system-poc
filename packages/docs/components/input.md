# Input

The `co-input` component provides a themed text field with a built-in label, helper text, invalid state, and optional prefix/suffix affordances.

## Preview

<ClientOnly>
<div style="display: grid; gap: 16px; margin: 16px 0 24px; max-width: 420px;">
  <co-input label="Email address" helper-text="Use the address associated with your workspace." placeholder="name@example.com"></co-input>
  <co-input label="Search" placeholder="Search projects">
    <co-icon slot="prefix" name="search"></co-icon>
    <span slot="suffix">⌘K</span>
  </co-input>
  <co-input invalid label="Project name" error-text="Project name is required." value=""></co-input>
</div>
</ClientOnly>

## Sizes

<ClientOnly>
<div style="display: grid; gap: 12px; margin: 16px 0 24px; max-width: 420px;">
  <co-input size="sm" label="Small input" placeholder="Compact field"></co-input>
  <co-input size="md" label="Medium input" placeholder="Default field"></co-input>
  <co-input size="lg" label="Large input" placeholder="Prominent field"></co-input>
</div>
</ClientOnly>

## Usage

<CodeTabs :tabs="['Web Component', 'React', 'Vue', 'Angular']">

<template #web-component>

```html
<script type="module">
  import '@cobalt/components/input';
  import '@cobalt/components/icon';
</script>

<co-input
  label="Email address"
  helper-text="Use the address associated with your workspace."
  placeholder="name@example.com"
></co-input>

<co-input invalid label="Project name" error-text="Project name is required."></co-input>

<co-input label="Search" placeholder="Search projects">
  <co-icon slot="prefix" name="search"></co-icon>
  <span slot="suffix">⌘K</span>
</co-input>
```

</template>

<template #react>

```tsx
import { CoInput } from '@cobalt/react';

export function SearchField() {
  return (
    <CoInput
      label="Search"
      helperText="Search by name, ID, or owner."
      placeholder="Search projects"
    />
  );
}
```

</template>

<template #vue>

```vue
<script setup>
import { CoInput } from '@cobalt/vue';
</script>

<template>
  <CoInput
    label="Search"
    helper-text="Search by name, ID, or owner."
    placeholder="Search projects"
  />
</template>
```

</template>

<template #angular>

```typescript
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CoInput } from '@cobalt/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CoInput],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <co-input
      [label]="'Email address'"
      [helperText]="'Use the address associated with your workspace.'"
      [placeholder]="'name@example.com'"
    ></co-input>
  `,
})
export class AppComponent {}
```

</template>

</CodeTabs>

## API

### Properties

| Property      | Type                                                            | Default  | Description                                     |
| ------------- | --------------------------------------------------------------- | -------- | ----------------------------------------------- |
| `label`       | `string`                                                        | `''`     | Visible field label rendered above the control  |
| `helper-text` | `string`                                                        | `''`     | Supporting message shown below the field        |
| `error-text`  | `string`                                                        | `''`     | Error message shown when `invalid` is true      |
| `size`        | `'sm' \| 'md' \| 'lg'`                                          | `'md'`   | Control size                                    |
| `type`        | `'text' \| 'email' \| 'password' \| 'search' \| 'tel' \| 'url'` | `'text'` | Native input type                               |
| `value`       | `string`                                                        | `''`     | Current input value                             |
| `placeholder` | `string`                                                        | `''`     | Placeholder text                                |
| `disabled`    | `boolean`                                                       | `false`  | Disables the field                              |
| `invalid`     | `boolean`                                                       | `false`  | Applies invalid styling and accessibility state |
| `required`    | `boolean`                                                       | `false`  | Marks the field as required                     |
| `readonly`    | `boolean`                                                       | `false`  | Makes the field read-only                       |

### Slots

| Slot     | Description                    |
| -------- | ------------------------------ |
| `prefix` | Content before the input value |
| `suffix` | Content after the input value  |
