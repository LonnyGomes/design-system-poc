# Forms & Validation

Forms are the primary way users provide input in an application. Consistent form patterns reduce cognitive load and help users complete tasks efficiently.

## Form Layout

Use a single-column layout for most forms. Multi-column layouts are acceptable only for closely related short fields such as city, state, and zip code.

```html
<cb-form>
  <cb-form-field>
    <cb-label for="name">Full name</cb-label>
    <cb-input id="name" required></cb-input>
  </cb-form-field>

  <cb-form-field>
    <cb-label for="email">Email address</cb-label>
    <cb-input id="email" type="email" required></cb-input>
    <cb-helper-text>We will never share your email.</cb-helper-text>
  </cb-form-field>

  <cb-form-actions>
    <cb-button type="submit" variant="primary">Submit</cb-button>
    <cb-button type="reset" variant="ghost">Cancel</cb-button>
  </cb-form-actions>
</cb-form>
```

## Required Field Indicators

Mark required fields with an asterisk and provide a legend at the top of the form. Optional fields should be labeled with "(optional)" when most fields are required.

```html
<cb-form>
  <p class="cb-form-legend">Fields marked with <span aria-hidden="true">*</span> are required.</p>

  <cb-form-field required>
    <cb-label for="company">Company name</cb-label>
    <cb-input id="company"></cb-input>
  </cb-form-field>

  <cb-form-field>
    <cb-label for="website">Website (optional)</cb-label>
    <cb-input id="website" type="url"></cb-input>
  </cb-form-field>
</cb-form>
```

## Validation States

### Inline Validation

Validate fields on blur, not on every keystroke. Display error messages directly below the invalid field.

```html
<cb-form-field invalid>
  <cb-label for="password">Password</cb-label>
  <cb-input id="password" type="password" aria-describedby="pw-error"></cb-input>
  <cb-error-text id="pw-error">Password must be at least 8 characters.</cb-error-text>
</cb-form-field>
```

> **Warning:** Never rely solely on color to indicate errors. Always pair the red border with an icon and descriptive text.

### Validation Summary

For complex forms, display a summary of all errors at the top of the form after a failed submission. Each error should link to the corresponding field.

```html
<cb-alert type="error" role="alert">
  <strong>Please fix the following errors:</strong>
  <ul>
    <li><a href="#name">Full name is required</a></li>
    <li><a href="#email">Enter a valid email address</a></li>
  </ul>
</cb-alert>
```

## Error Message Guidelines

| Guideline          | Good                                | Bad                             |
| ------------------ | ----------------------------------- | ------------------------------- |
| Be specific        | "Enter a date in MM/DD/YYYY format" | "Invalid input"                 |
| Use plain language | "This field is required"            | "Error: null value"             |
| Suggest a fix      | "Password needs a number"           | "Password invalid"              |
| Avoid blame        | "That email is already in use"      | "You entered a duplicate email" |

## Form Submission

Disable the submit button and show a loading indicator during submission. Restore the button state on success or failure.

```html
<cb-button type="submit" variant="primary" loading disabled>
  <cb-spinner size="sm" slot="prefix"></cb-spinner>
  Submitting...
</cb-button>
```

After successful submission, either redirect the user or display an inline success message. Do not use a toast for critical confirmations like payment processing.

## Accessibility Checklist

- All inputs have associated `<cb-label>` elements.
- Error messages are linked to inputs via `aria-describedby`.
- The validation summary uses `role="alert"` so screen readers announce it.
- Focus is moved to the first invalid field or the error summary after a failed submission.
- Form groups use `<cb-fieldset>` and `<cb-legend>` for related controls.
