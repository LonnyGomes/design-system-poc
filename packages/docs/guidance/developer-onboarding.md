# Developer Onboarding

This guide walks you through everything you need to start building with Cobalt — from installing prerequisites to rendering your first component.

---

## Prerequisites

Ensure your environment meets these minimum requirements before proceeding.

| Tool           | Minimum version                            | Check command    |
| -------------- | ------------------------------------------ | ---------------- |
| Node.js        | 18.x                                       | `node --version` |
| npm            | 9.x                                        | `npm --version`  |
| Git            | 2.x                                        | `git --version`  |
| Modern browser | Chrome/Edge 120+, Firefox 118+, Safari 17+ | —                |

> **Tip:** We recommend using [nvm](https://github.com/nvm-sh/nvm) to manage Node versions. The repository includes an `.nvmrc` file.

---

## Environment setup

```bash
git clone https://github.com/your-org/cobalt-design-system.git
cd cobalt-design-system
npm ci
npm run dev          # starts dev server at http://localhost:5173
```

If your organization uses a private registry, configure it first: `npm config set @cobalt:registry https://registry.your-org.com`.

---

## Project structure overview

```
cobalt-design-system/
├── packages/
│   ├── tokens/       # Design tokens (JSON → CSS custom properties)
│   ├── core/         # Shared utilities, mixins, base styles
│   ├── components/   # Web components (co-button, co-input, etc.)
│   └── docs/         # Documentation site (you are here)
├── tools/            # CLI and testing utilities
├── package.json      # Root workspace configuration
└── turbo.json        # Turborepo pipeline definitions
```

---

## How to consume components

### Installation

```bash
npm install @cobalt/co-button @cobalt/co-input @cobalt/tokens
```

### Usage in HTML

```html
<script type="module">
  import '@cobalt/co-button';
  import '@cobalt/co-input';
</script>

<co-input label="Email address" type="email"></co-input>
<co-button variant="primary">Sign in</co-button>
```

### Usage with a framework

Cobalt components are standard web components and work in any framework. For improved DX, install a framework-specific wrapper:

```bash
npm install @cobalt/react    # React wrapper
ng add @cobalt/angular       # Angular schematic
```

---

## How to override tokens

Cobalt ships with a default theme expressed as CSS custom properties. Override any token at the root level or scope overrides to a specific subtree.

```css
/* Global override */
:root {
  --co-color-primary-500: #1a6dff;
  --co-space-300: 1rem;
}

/* Scoped override for a dark section */
.dark-panel {
  --co-color-surface: #1e1e2e;
  --co-color-on-surface: #e0e0e0;
}
```

> **Important:** Only override token values — never replace the token names themselves. This ensures forward compatibility when upgrading Cobalt.

---

## Testing with web components

Web components require a DOM environment. We recommend **@open-wc/testing** combined with **Web Test Runner**.

```bash
npm install -D @open-wc/testing @web/test-runner
```

```js
import { html, fixture, expect } from '@open-wc/testing';
import '@cobalt/co-button';

describe('co-button', () => {
  it('renders with the correct label', async () => {
    const el = await fixture(html`<co-button>Click me</co-button>`);
    expect(el.shadowRoot.querySelector('button').textContent).to.equal('Click me');
  });
});
```

Run tests with: `npx web-test-runner --node-resolve`.

---

## Common pitfalls

| Pitfall                                          | Solution                                                                          |
| ------------------------------------------------ | --------------------------------------------------------------------------------- |
| Components render as empty boxes                 | Ensure you imported the component module before using the tag.                    |
| Styles leak into or out of components            | Cobalt uses Shadow DOM. Use CSS custom properties (tokens) to style from outside. |
| SSR hydration mismatch                           | Use `@cobalt/ssr` for server-side declarative shadow DOM support.                 |
| Flash of unstyled content (FOUC)                 | Add `co-cloak` attribute to the body and import `@cobalt/tokens/cloak.css`.       |
| Tests fail with "custom element already defined" | Run each test file in its own browser context or use `--isolation` flag.          |
| Bundle size unexpectedly large                   | Check that tree-shaking is enabled and you are not importing barrel files.        |
