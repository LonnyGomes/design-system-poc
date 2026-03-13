# Changelog

All notable changes to the Cobalt Design System will be documented on this page.

This project follows [Semantic Versioning](https://semver.org/) and uses [Changesets](https://github.com/changesets/changesets) to manage releases across the monorepo. Each package within the `@cobalt` npm scope is versioned independently, but this changelog tracks the overall system milestones.

> During the `0.x` phase, minor versions may include breaking changes. We will stabilize the public API before the `1.0` release.

---

## [0.1.0] - 2026-03-10

_Initial alpha release of the Cobalt Design System._

### Added

- **`co-button` component** — first production-ready web component with full variant support (`primary`, `secondary`, `ghost`, `danger`), three sizes (`sm`, `md`, `lg`), and disabled/loading states.
- **Design tokens** — complete token sets covering color, typography, spacing, elevation, motion, and breakpoints, authored in Style Dictionary format.
- **React wrapper** (`@cobalt/react`) — auto-generated React bindings for all `co-*` web components with full TypeScript definitions and prop forwarding.
- **VitePress documentation site** (`@cobalt/docs`) — searchable docs with live component previews, token reference tables, and contribution guidelines.
- **Token build pipeline** — generates CSS custom properties, SCSS variables, and ES module exports from a single token source.

### Changed

- Upgraded Lit from v2 to v3 for improved SSR support and smaller bundle size.
- Moved all component styles to use design tokens exclusively — no hard-coded values remain.

### Fixed

- Resolved an issue where `co-button` focus ring was not visible in Windows High Contrast Mode.
- Corrected token naming convention to follow the `co-{category}-{concept}-{variant}-{state}` pattern consistently.

---

## [0.0.2] - 2026-02-14

_Dark mode support, theming infrastructure, and interactive demos._

### Added

- **Dark mode token set** — semantic color tokens now resolve to light or dark palettes based on a `data-theme` attribute on the document root.
- **Shoelace theme mapping** — bridge layer that maps Cobalt design tokens to Shoelace CSS custom properties, enabling incremental adoption alongside existing Shoelace components.
- **Interactive component demos** — embedded playgrounds in the docs site powered by `<co-demo>`, supporting live prop editing and source code display.
- **Color contrast checker** — docs utility that validates WCAG 2.1 AA/AAA compliance for any foreground/background token pair.

### Changed

- Refactored token build to support multiple theme outputs from a single source definition.
- Updated the docs sidebar navigation to group pages by category.

### Fixed

- Fixed a flash of unstyled content (FOUC) when loading components in lazy-loaded routes.
- Resolved incorrect `font-weight` token values for the `heading-sm` typography scale.

---

## [0.0.1] - 2026-01-20

_Project scaffolding and foundational infrastructure._

### Added

- **Monorepo setup** — Turborepo-based workspace with packages for `@cobalt/tokens`, `@cobalt/web-components`, `@cobalt/react`, and `@cobalt/docs`.
- **CI/CD pipeline** — GitHub Actions workflows for linting, testing, building, and publishing packages to npm on release.
- **Initial token definitions** — primitive color palette (gray, blue, green, red, yellow) and base spacing scale (`4px` increments).
- **Development tooling** — ESLint, Prettier, Stylelint, and Commitlint configurations shared across all packages.
- **Changeset integration** — automated version bumps and changelog generation via `@changesets/cli`.

### Fixed

- Corrected workspace dependency resolution for internal `@cobalt/*` packages when running parallel builds.

---

_Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)._
