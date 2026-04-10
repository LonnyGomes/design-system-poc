# Input

The `co-input` component provides a themed text field with built-in label, helper/error messaging, and optional prefix or suffix content.

## Interactive Demo

<ComponentDemo
  tag="co-input"
  :defaults="{
    label: 'Email address',
    helperText: 'Use the address associated with your workspace.',
    placeholder: 'name@example.com',
    size: 'md',
    type: 'text',
    name: 'email',
  }"
  :options="{ size: ['sm', 'md', 'lg'], type: ['text', 'email', 'password', 'search', 'tel', 'url'] }"
  :booleans="['disabled', 'invalid', 'required', 'readOnly']"
  :textInputs="['label', 'helperText', 'errorText', 'placeholder', 'value', 'name']"
/>

## Types

Use the native `type` attribute to match the expected input behavior and browser affordances.

<ClientOnly>
<div style="display: grid; gap: 12px; margin: 16px 0 24px; max-width: 420px;">
  <co-input type="text" label="Text" placeholder="Enter a project name"></co-input>
  <co-input type="email" label="Email" placeholder="name@example.com"></co-input>
  <co-input type="password" label="Password" value="hunter2"></co-input>
  <co-input type="search" label="Search" placeholder="Search projects"></co-input>
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

## States

<ClientOnly>
<div style="display: grid; gap: 12px; margin: 16px 0 24px; max-width: 420px;">
  <co-input
    label="Default"
    helper-text="Use your work email."
    placeholder="name@example.com"
  ></co-input>
  <co-input
    invalid
    label="Invalid"
    error-text="Enter a valid email address."
    value="not-an-email"
  ></co-input>
  <co-input
    required
    label="Required"
    helper-text="This field is required before submission."
  ></co-input>
  <co-input disabled label="Disabled" value="Disabled value"></co-input>
  <co-input readOnly label="Read-only" value="Read only value"></co-input>
</div>
</ClientOnly>

## Slots

Use the `prefix` and `suffix` slots for inline icons, shortcuts, status, or supporting affordances.

<ClientOnly>
<div style="display: grid; gap: 12px; margin: 16px 0 24px; max-width: 420px;">
  <co-input label="Search" placeholder="Search projects">
    <co-icon slot="prefix" name="search"></co-icon>
  </co-input>
  <co-input label="Command palette" placeholder="Search projects">
    <co-icon slot="prefix" name="search"></co-icon>
    <span slot="suffix">⌘K</span>
  </co-input>
</div>
</ClientOnly>

## Usage

<CodeTabs :tabs="['Web Component', 'React', 'Vue', 'Angular']">

<template #web-component>

```html
<!-- Import once in your app -->
<script type="module">
  import '@cobalt/components/input';
  import '@cobalt/components/icon';
</script>

<!-- Basic usage -->
<co-input
  label="Email address"
  helper-text="Use the address associated with your workspace."
  name="email"
  placeholder="name@example.com"
></co-input>

<!-- Invalid state -->
<co-input invalid label="Project name" error-text="Project name is required."></co-input>

<!-- With slots -->
<co-input label="Search" placeholder="Search projects">
  <co-icon slot="prefix" name="search"></co-icon>
  <span slot="suffix">⌘K</span>
</co-input>

<!-- Events -->
<co-input id="email-field" label="Email"></co-input>
<script>
  const input = document.getElementById('email-field');
  input.addEventListener('co-focus', () => console.log('focused'));
  input.addEventListener('co-blur', () => console.log('blurred'));
</script>
```

</template>

<template #react>

```tsx
import { useState } from 'react';
import { CoInput } from '@cobalt/react';

function App() {
  const [value, setValue] = useState('');

  return (
    <>
      {/* Basic */}
      <CoInput
        label="Email address"
        helperText="Use the address associated with your workspace."
        name="email"
        placeholder="name@example.com"
      />

      {/* Controlled value */}
      <CoInput
        label="Project name"
        value={value}
        onInput={(event) => setValue((event.target as HTMLInputElement).value)}
      />

      {/* Invalid state */}
      <CoInput
        invalid
        label="Project name"
        errorText="Project name is required."
        onCoFocus={() => console.log('focused')}
      />
    </>
  );
}
```

</template>

<template #vue>

```vue
<script setup>
import { ref } from 'vue';
import { CoInput } from '@cobalt/vue';

const value = ref('');

function handleInput(event) {
  value.value = event.target.value;
}

function handleFocus() {
  console.log('focused');
}
</script>

<template>
  <!-- Basic -->
  <CoInput
    label="Email address"
    helper-text="Use the address associated with your workspace."
    name="email"
    placeholder="name@example.com"
  />

  <!-- Controlled value -->
  <CoInput label="Project name" :value="value" @input="handleInput" />

  <!-- Invalid state -->
  <CoInput
    invalid
    label="Project name"
    error-text="Project name is required."
    @co-focus="handleFocus"
  />
</template>
```

</template>

<template #angular>

```typescript
// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CoInput } from '@cobalt/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CoInput],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
})
export class AppComponent {
  email = '';

  onInput(event: Event) {
    this.email = (event.target as HTMLInputElement).value;
  }

  onFocus(event: CustomEvent) {
    console.log('focused', event);
  }
}
```

```html
<!-- app.component.html -->

<!-- Basic -->
<co-input
  [label]="'Email address'"
  [helperText]="'Use the address associated with your workspace.'"
  [name]="'email'"
  [placeholder]="'name@example.com'"
></co-input>

<!-- Bound value -->
<co-input [label]="'Project name'" [value]="email" (input)="onInput($event)"></co-input>

<!-- Invalid state + events -->
<co-input
  [invalid]="true"
  [label]="'Project name'"
  [errorText]="'Project name is required.'"
  (coFocus)="onFocus($event)"
></co-input>
```

</template>

</CodeTabs>

## Best Practices

### When to use

- Use for short, single-line text entry such as names, emails, URLs, and search
- Use when the field needs a visible label and supporting helper or error text
- Use prefix and suffix slots for low-complexity inline affordances like search icons or shortcuts
- Use the native `type` that matches the expected data so browsers can provide the right keyboard and validation hints

### When NOT to use

- Do not use for long-form, multi-line content; use a textarea instead
- Do not use prefix or suffix slots for primary actions that should be separate buttons
- Do not rely on placeholder text as the only field label
- Do not use it for masked or highly formatted inputs until those behaviors are intentionally supported

### Content guidelines

- Keep labels short and specific: "Email address" is better than "Contact information"
- Use helper text for guidance before the user makes a mistake
- Use error text for specific recovery instructions, not generic failure messages
- Mark required fields intentionally and keep required/error messaging consistent across a form

## API

### Properties

| Property       | Type                                                            | Default  | Description                                     |
| -------------- | --------------------------------------------------------------- | -------- | ----------------------------------------------- |
| `size`         | `'sm' \| 'md' \| 'lg'`                                          | `'md'`   | Controls min-height, padding, and font size     |
| `type`         | `'text' \| 'email' \| 'password' \| 'search' \| 'tel' \| 'url'` | `'text'` | Native input type                               |
| `label`        | `string`                                                        | `''`     | Visible field label rendered above the control  |
| `helper-text`  | `string`                                                        | `''`     | Supporting message shown below the field        |
| `error-text`   | `string`                                                        | `''`     | Error message shown when `invalid` is true      |
| `value`        | `string`                                                        | `''`     | Current input value                             |
| `placeholder`  | `string`                                                        | `''`     | Placeholder text                                |
| `name`         | `string`                                                        | `''`     | Native input name attribute                     |
| `autocomplete` | `string`                                                        | —        | Native autocomplete hint                        |
| `disabled`     | `boolean`                                                       | `false`  | Prevents interaction                            |
| `invalid`      | `boolean`                                                       | `false`  | Applies invalid styling and accessibility state |
| `required`     | `boolean`                                                       | `false`  | Marks the field as required                     |
| `readonly`     | `boolean`                                                       | `false`  | Allows selection while preventing value changes |

### Events

| Event      | Detail | Description                         |
| ---------- | ------ | ----------------------------------- |
| `co-focus` | —      | Fired when the input receives focus |
| `co-blur`  | —      | Fired when the input loses focus    |

### Slots

| Name     | Description                                   |
| -------- | --------------------------------------------- |
| `prefix` | Content before the input value, such as icon  |
| `suffix` | Content after the input value, such as status |

### CSS Parts

| Part      | Description                    |
| --------- | ------------------------------ |
| `label`   | The field label                |
| `base`    | The input surface wrapper      |
| `input`   | The native input element       |
| `prefix`  | The prefix slot wrapper        |
| `suffix`  | The suffix slot wrapper        |
| `message` | The helper or error text block |

## Accessibility

<ClientOnly>
<A11yReport component="co-input" />
</ClientOnly>

### Keyboard interaction

| Key         | Action                                              |
| ----------- | --------------------------------------------------- |
| `Tab`       | Moves focus to the input                            |
| `Shift+Tab` | Moves focus to the previous focusable element       |
| Text keys   | Uses native text input editing behavior             |
| `Enter`     | Uses native form behavior when the input is in form |

### ARIA notes

- The rendered native `<input>` keeps native text field semantics automatically
- When helper or error text is present, the input links it with `aria-describedby`
- When `invalid` is set, the input exposes `aria-invalid="true"` and the error message uses `role="alert"`
- When `required` is set, the native input exposes `required` and the visual label shows an asterisk

## Changelog

<ComponentChangelog component="co-input" />
