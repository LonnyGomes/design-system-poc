# Layout Patterns

Layout patterns define how content is structured and arranged on a page. Consistent layout creates visual rhythm, improves scannability, and ensures responsive behavior across screen sizes.

## Page Structure

A standard Cobalt application page consists of a top navigation, an optional sidebar, a main content area, and a footer. Use `cb-app-shell` as the root layout container.

```html
<cb-app-shell>
  <cb-top-nav slot="header"><!-- Global navigation --></cb-top-nav>
  <cb-side-nav slot="sidebar"><!-- Section navigation --></cb-side-nav>

  <cb-main slot="content">
    <cb-page-header><h1>Dashboard</h1></cb-page-header>
    <cb-page-body><!-- Page content --></cb-page-body>
  </cb-main>

  <cb-footer slot="footer"><!-- Footer content --></cb-footer>
</cb-app-shell>
```

## Grid System

Cobalt uses a 12-column fluid grid. Columns are defined with `cb-grid` and `cb-col`. Gutters default to `--cb-spacing-400` (16px).

```html
<cb-grid>
  <cb-col span="8">
    <!-- Primary content -->
  </cb-col>
  <cb-col span="4">
    <!-- Sidebar or supplementary content -->
  </cb-col>
</cb-grid>
```

### Common Grid Configurations

| Layout            | Columns                 | Use case                |
| ----------------- | ----------------------- | ----------------------- |
| Full width        | `span="12"`             | Articles, focused tasks |
| Content + sidebar | `span="8"` + `span="4"` | Detail pages, settings  |
| Equal halves      | `span="6"` + `span="6"` | Comparison views        |
| Three columns     | `span="4"` x 3          | Card grids, dashboards  |
| Narrow center     | `offset="2" span="8"`   | Forms, onboarding flows |

## Responsive Breakpoints

Cobalt defines four breakpoints. Use responsive column attributes to adjust layouts per breakpoint.

| Token                | Name        | Min width | Typical device |
| -------------------- | ----------- | --------- | -------------- |
| `--cb-breakpoint-sm` | Small       | 640px     | Large phones   |
| `--cb-breakpoint-md` | Medium      | 768px     | Tablets        |
| `--cb-breakpoint-lg` | Large       | 1024px    | Small laptops  |
| `--cb-breakpoint-xl` | Extra large | 1280px    | Desktops       |

```html
<cb-grid>
  <cb-col span="12" md="6" lg="4">
    <cb-card>Item 1</cb-card>
  </cb-col>
  <cb-col span="12" md="6" lg="4">
    <cb-card>Item 2</cb-card>
  </cb-col>
  <cb-col span="12" md="12" lg="4">
    <cb-card>Item 3</cb-card>
  </cb-col>
</cb-grid>
```

> **Tip:** Design for mobile first, then add complexity at larger breakpoints. The `span` attribute sets the mobile default.

## Sidebar Layouts

For pages with persistent side navigation, use the sidebar slot on `cb-app-shell`. The sidebar collapses to a drawer on viewports narrower than `--cb-breakpoint-md`.

```html
<cb-app-shell sidebar-width="260px" sidebar-collapsible>
  <cb-side-nav slot="sidebar">
    <cb-nav-item href="/settings/general" icon="settings">General</cb-nav-item>
    <cb-nav-item href="/settings/security" icon="shield">Security</cb-nav-item>
  </cb-side-nav>
  <cb-main slot="content"><!-- Settings page content --></cb-main>
</cb-app-shell>
```

## Content Areas

Use `cb-container` to constrain content width within the main area. This prevents long line lengths on wide displays.

| Variant | Max width | Use case                     |
| ------- | --------- | ---------------------------- |
| `sm`    | 640px     | Focused forms, login pages   |
| `md`    | 960px     | Standard content pages       |
| `lg`    | 1200px    | Dashboards, data-heavy pages |
| `fluid` | 100%      | Full-bleed layouts           |

## Spacing Rhythm

Consistent spacing creates visual hierarchy and grouping. Use spacing tokens rather than arbitrary pixel values.

| Token               | Value | Usage                         |
| ------------------- | ----- | ----------------------------- |
| `--cb-spacing-100`  | 4px   | Tight inline elements         |
| `--cb-spacing-200`  | 8px   | Related items, icon gaps      |
| `--cb-spacing-400`  | 16px  | Grid gutters, form field gaps |
| `--cb-spacing-600`  | 24px  | Section padding               |
| `--cb-spacing-800`  | 32px  | Page section separation       |
| `--cb-spacing-1200` | 48px  | Major content divisions       |

> **Warning:** Avoid mixing spacing tokens with hard-coded values. Inconsistent spacing is one of the most common causes of visual drift across products.

## Stack and Inline Layouts

Use `cb-stack` for vertical rhythm and `cb-inline` for horizontal arrangements. Both accept a `gap` property tied to spacing tokens.

```html
<cb-stack gap="400">
  <cb-card>Section one</cb-card>
  <cb-card>Section two</cb-card>
</cb-stack>

<cb-inline gap="200" align="center">
  <cb-badge variant="info">New</cb-badge>
  <span>Feature announcement</span>
</cb-inline>
```
