# Cobalt Design System

A token-first design system built with [Lit](https://lit.dev/) and [Shoelace](https://shoelace.style/), with framework wrappers for React, Vue, and Angular.

## Prerequisites

- **Node.js** >= 18
- **pnpm** >= 9

## Getting Started

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start the docs site locally
pnpm dev
```

### Other Commands

| Command             | Description                                      |
| ------------------- | ------------------------------------------------ |
| `pnpm build`        | Build all packages                               |
| `pnpm clean`        | Remove all build artifacts and caches            |
| `pnpm rebuild`      | Clean + build in one step                        |
| `pnpm dev`          | Start the documentation dev server               |
| `pnpm test`         | Run component tests                              |
| `pnpm test:watch`   | Run component tests in watch mode                |
| `pnpm lint`         | Lint TypeScript source files                     |
| `pnpm format`       | Format all files with Prettier                   |
| `pnpm format:check` | Check formatting without writing changes         |
| `pnpm pack:local`   | Pack tarballs for local testing in external apps |

## Local Testing in External Apps

To test Cobalt packages in an external application without publishing to npm, use the `pack:local` script. This produces tarballs identical to what `npm publish` would create, so it validates package exports, file inclusion, and build output.

```bash
# Build all packages and create tarballs in ./local-packs/
pnpm pack:local

# If you already ran pnpm build, skip the build step:
pnpm pack:local --skip-build
```

Then install the tarballs in your app:

```bash
# Install all packages at once
npm install /path/to/cobalt/local-packs/*.tgz

# Or install specific packages
npm install /path/to/cobalt/local-packs/cobalt-components-0.0.1.tgz \
            /path/to/cobalt/local-packs/cobalt-tokens-0.0.1.tgz
```

After making changes in the monorepo, re-run `pnpm pack:local` and reinstall in your app.

**Alternative — `pnpm link`:** For faster iteration during active development, you can symlink packages directly with `pnpm link --global`. Changes are reflected after `pnpm build` without reinstalling. Note that linked packages can occasionally cause duplicate dependency issues at runtime; use `pack:local` if you hit problems.

## Packages

This monorepo is managed with [pnpm workspaces](https://pnpm.io/workspaces). All packages live under `packages/`.

### `@cobalt/tokens`

Design tokens — the single source of truth for colors, typography, spacing, elevation, motion, and breakpoints. Built with [Style Dictionary](https://amzn.github.io/style-dictionary/) and output in multiple formats:

- **CSS** custom properties (light and dark themes)
- **SCSS** variables
- **JavaScript/TypeScript** module
- **JSON**
- **Shoelace mapping** — bridges Cobalt tokens to Shoelace's `--sl-*` variables

### `@cobalt/components`

Framework-agnostic web components built with [Lit](https://lit.dev/) that wrap and theme [Shoelace](https://shoelace.style/) primitives. Each component applies Cobalt tokens and exposes a consistent API with slots, CSS custom properties, and custom events.

Components use the `co-` prefix (e.g., `<co-button>`).

### `@cobalt/react`

React wrappers generated with [`@lit/react`](https://lit.dev/docs/frameworks/react/). Provides native React components with proper prop and event binding.

**Peer dependencies:** React 18 or 19

### `@cobalt/vue`

Vue 3 wrappers using `defineComponent` for type-safe props and event forwarding.

**Peer dependencies:** Vue 3.4+

### `@cobalt/angular`

Angular directives that sync properties and forward custom events from the underlying web components.

**Peer dependencies:** Angular 17, 18, 19, 20, or 21

### `@cobalt/docs`

The documentation site, built with [VitePress](https://vitepress.dev/). Includes interactive component demos, a design token reference, a Phosphor icon gallery, and guides for designers, developers, and contributors.

### `@cobalt/icons`

Icon package (placeholder — not yet implemented).

## Project Structure

```
packages/
  tokens/        Design tokens (source JSON + generated output)
  components/    Lit web components (core library)
  react/         React wrapper components
  vue/           Vue wrapper components
  angular/       Angular wrapper directives
  docs/          VitePress documentation site
  icons/         Icon package (placeholder)
```

## License

MIT
