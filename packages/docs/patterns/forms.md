# Forms & Validation

Forms are where shared control semantics matter most. Inputs and actions should feel like part of the same system: consistent heights, radii, spacing, and text roles reduce friction for both users and implementers.

## Form Layout

Use a single-column layout for most forms. Keep the scan path short and group related actions at the end.

```html
<form class="co-flex co-flex-col co-gap-4 co-max-w-screen-sm">
  <co-input label="Full name" placeholder="Ada Lovelace"></co-input>

  <co-input
    label="Email address"
    helper-text="Use the address associated with your workspace."
    type="email"
    placeholder="name@example.com"
  ></co-input>

  <div class="co-flex co-gap-2">
    <co-button type="submit" variant="primary">Submit</co-button>
    <co-button type="button" variant="secondary">Cancel</co-button>
  </div>
</form>
```

## Required Fields

Mark required fields explicitly. Do not rely on placeholder text to communicate what the field needs.

```html
<co-input required label="Company name"></co-input>
<co-input label="Website" helper-text="Optional"></co-input>
```

## Validation States

Validate on blur or submit, not on every keystroke. Keep the message adjacent to the field.

```html
<co-input
  invalid
  label="Email address"
  type="email"
  value="not-an-email"
  error-text="Enter a valid email address."
></co-input>
```

## Input Affordances

Use prefix and suffix content only when it materially helps the task.

```html
<co-input label="Search" placeholder="Search projects">
  <co-icon slot="prefix" name="search"></co-icon>
  <span slot="suffix">⌘K</span>
</co-input>
```

## Submission

During async submission, disable the primary action and show loading on the button rather than freezing the whole form.

```html
<co-button type="submit" variant="primary" loading disabled> Saving changes </co-button>
```

## Error Messaging Guidelines

- Be specific: explain what is wrong and how to fix it
- Keep the message near the field
- Do not rely on color alone to signal invalid state
- Use one message per field whenever possible

## Accessibility Checklist

- Every input has a visible label
- Helper or error text is programmatically associated with the field
- Keyboard focus is obvious on both fields and actions
- Invalid state is conveyed with both text and visual treatment
- Touch targets remain at least 44×44 CSS pixels on touch surfaces
