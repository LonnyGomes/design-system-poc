# Content & Writing Guidelines

Words are part of the interface. This page defines the Cobalt voice and provides concrete rules for writing UI text that is clear, consistent, and helpful.

---

## Voice and tone

Cobalt's voice is **confident, concise, and supportive**. We write as a knowledgeable colleague — never condescending, never vague.

| Attribute  | What it means                                        | Example                                                                               |
| ---------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Confident  | State facts directly; avoid hedging.                 | "Your file was saved." not "Your file should have been saved."                        |
| Concise    | Use as few words as possible without losing meaning. | "Delete project?" not "Are you sure you want to delete this project from the system?" |
| Supportive | Guide the user toward success.                       | "Enter a valid email, like name@example.com."                                         |

---

## Capitalization

Use **sentence case** for all UI elements unless the text is a proper noun or an acronym.

| Element       | Correct                 | Incorrect               |
| ------------- | ----------------------- | ----------------------- |
| Button labels | "Create account"        | "Create Account"        |
| Page headings | "Notification settings" | "Notification Settings" |
| Tab labels    | "Billing history"       | "Billing History"       |
| Tooltips      | "Copy to clipboard"     | "Copy To Clipboard"     |

> **Exception:** Product names (Cobalt, Cobalt Design System) and acronyms (API, URL, SSO) retain their standard casing.

---

## Action labels

Buttons and links that trigger an action should begin with a **strong verb** that describes what will happen.

| Context             | Recommended      | Avoid              |
| ------------------- | ---------------- | ------------------ |
| Saving data         | "Save changes"   | "OK" or "Submit"   |
| Deleting a resource | "Delete project" | "Yes" or "Confirm" |
| Navigation          | "View details"   | "Click here"       |
| File upload         | "Upload file"    | "Browse"           |
| Cancelling          | "Cancel"         | "Never mind"       |

For destructive actions, pair the verb with the noun: "Delete account" rather than just "Delete." This removes ambiguity in confirmation dialogs.

---

## Error messages

Effective error messages follow three rules: **say what happened**, **explain why**, and **offer a next step**.

```
✘  "An error occurred."
✔  "We couldn't save your changes because the session expired. Sign in again to continue."
```

Guidelines for writing error messages:

- Be specific about the cause. Avoid generic phrases like "Something went wrong."
- Suggest a resolution whenever possible.
- Never blame the user. Write "The email format is invalid" not "You entered a bad email."
- Keep the message under two sentences in most contexts.

---

## Placeholder text

Placeholder text inside form fields should show a **realistic example**, not an instruction.

| Field  | Correct placeholder    | Incorrect placeholder |
| ------ | ---------------------- | --------------------- |
| Email  | `name@example.com`     | `Enter your email`    |
| Phone  | `(555) 123-4567`       | `Type phone number`   |
| Search | `Search by name or ID` | `Search...`           |

> **Important:** Placeholders disappear on focus. Never use placeholder text as a substitute for a visible label.

---

## Date and time formatting

Use the following defaults across all Cobalt applications. Allow locale overrides when the component supports it.

| Format         | Example                 | Usage                         |
| -------------- | ----------------------- | ----------------------------- |
| Short date     | `Mar 11, 2026`          | Tables, cards, metadata       |
| Long date      | `March 11, 2026`        | Page headers, reports         |
| Time (12-hour) | `2:30 PM`               | Timestamps, schedules         |
| Relative time  | `3 minutes ago`         | Activity feeds, notifications |
| Date + time    | `Mar 11, 2026, 2:30 PM` | Logs, audit trails            |

Use `co-date` and `co-time` components for automatic locale-aware formatting. Avoid hardcoding date strings.

---

## Number formatting

| Type          | Example         | Notes                                           |
| ------------- | --------------- | ----------------------------------------------- |
| Integers      | `1,234`         | Use locale-appropriate thousands separator.     |
| Decimals      | `1,234.56`      | Default to two decimal places for currency.     |
| Percentages   | `42%`           | No space before the percent sign.               |
| File sizes    | `2.4 MB`        | Use binary units (KB, MB, GB).                  |
| Abbreviations | `12.5K`, `3.2M` | Use for large numbers in dashboards and charts. |

> **Tip:** Use the `co-number` component with `format="currency"` or `format="compact"` to handle these rules automatically.

---

## Quick reference checklist

- [ ] Sentence case everywhere (except proper nouns and acronyms)
- [ ] Buttons start with a verb
- [ ] Error messages explain cause and suggest a fix
- [ ] Placeholders show examples, not instructions
- [ ] Dates and numbers use Cobalt formatting components
