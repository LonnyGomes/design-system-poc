# Feedback & Status

Feedback patterns communicate the outcome of user actions and the current state of the system. Choosing the right mechanism ensures users stay informed without unnecessary interruption.

## Choosing the Right Feedback Type

| Type                | Persistence       | User action required | Use for                             |
| ------------------- | ----------------- | -------------------- | ----------------------------------- |
| Toast               | Auto-dismiss (5s) | No                   | Non-critical confirmations          |
| Inline alert        | Persistent        | Dismiss or resolve   | Contextual warnings, errors         |
| Progress indicator  | Until complete    | No                   | Multi-step or long operations       |
| Confirmation dialog | Blocking          | Yes                  | Destructive or irreversible actions |

## Toast Notifications

Toasts appear at the top-right of the viewport and dismiss automatically. Use them for lightweight confirmations that do not require user action.

```html
<cb-toast type="success">
  <cb-icon name="check-circle" slot="icon"></cb-icon>
  Project saved successfully.
</cb-toast>
```

> **Tip:** Never use toasts for error messages. Errors require persistent visibility so the user can read and act on them.

### Toast Variants

| Variant   | Token                | Purpose                                |
| --------- | -------------------- | -------------------------------------- |
| `success` | `--cb-color-success` | Action completed                       |
| `info`    | `--cb-color-info`    | Non-critical information               |
| `warning` | `--cb-color-warning` | Potential issue, action may be needed  |
| `error`   | `--cb-color-error`   | Reserved for inline alerts, not toasts |

## Inline Alerts

Inline alerts are placed within the page content, near the element they relate to. They persist until dismissed or resolved.

```html
<cb-alert type="warning" dismissible>
  <cb-icon name="alert-triangle" slot="icon"></cb-icon>
  <strong>Storage almost full.</strong> You are using 92% of your allocated storage.
  <cb-link href="/settings/billing">Upgrade plan</cb-link>
</cb-alert>

<cb-alert type="error">
  <cb-icon name="x-circle" slot="icon"></cb-icon>
  <strong>Payment failed.</strong> Your card ending in 4242 was declined. Please update your payment
  method.
</cb-alert>
```

## Progress Indicators

### Determinate Progress

Use a progress bar when the completion percentage is known.

```html
<cb-progress value="65" max="100" label="Uploading files"> 65% complete </cb-progress>
```

### Indeterminate Progress

Use a spinner when the duration is unknown. Pair it with descriptive text.

```html
<cb-spinner size="md"></cb-spinner>
<p class="cb-text-secondary">Loading your dashboard...</p>
```

> **Warning:** Always provide a text label alongside spinners. A spinner alone gives no context about what is happening.

## Loading States

Apply loading states at the appropriate scope. Do not block the entire page when only one section is loading.

| Scope         | Pattern                       | Component            |
| ------------- | ----------------------------- | -------------------- |
| Full page     | Centered spinner with message | `cb-page-loader`     |
| Section       | Skeleton placeholders         | `cb-skeleton`        |
| Button action | Inline spinner in button      | `cb-button[loading]` |
| Data fetch    | Skeleton rows in table        | `cb-table-skeleton`  |

```html
<cb-card>
  <cb-card-header>Recent Activity</cb-card-header>
  <cb-card-body>
    <cb-skeleton variant="text" count="4"></cb-skeleton>
  </cb-card-body>
</cb-card>
```

## Success & Error Messaging

After a form submission or critical action, display persistent feedback within the page context.

```html
<cb-alert type="success" role="status">
  <cb-icon name="check-circle" slot="icon"></cb-icon>
  Your profile has been updated.
</cb-alert>

<cb-alert type="error" role="alert">
  <cb-icon name="x-circle" slot="icon"></cb-icon>
  <strong>Unable to save changes.</strong> Check your network connection and try again.
</cb-alert>
```

## Confirmation Dialogs

Use `cb-dialog` for destructive or irreversible actions. State the consequence clearly and label buttons with specific verbs instead of "OK."

```html
<cb-dialog open heading="Delete project?">
  <p>
    This will permanently delete <strong>Project Alpha</strong> and all associated data. This action
    cannot be undone.
  </p>
  <cb-button slot="secondary" variant="ghost">Cancel</cb-button>
  <cb-button slot="primary" variant="danger">Delete project</cb-button>
</cb-dialog>
```

## Accessibility

- Toasts and alerts use `role="status"` or `role="alert"` to announce changes to assistive technology.
- Confirmation dialogs trap focus and return focus to the triggering element when closed.
- Progress bars include `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` (handled by `cb-progress`).
