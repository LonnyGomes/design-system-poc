# Navigation Patterns

Effective navigation helps users understand where they are, where they can go, and how to get back. Cobalt provides several navigation components that can be composed into consistent patterns.

## When to Use Each Pattern

| Pattern     | Best For                                    | Avoid When                |
| ----------- | ------------------------------------------- | ------------------------- |
| Top nav     | Global app navigation, 4--7 top-level items | More than 7 primary items |
| Sidebar nav | Complex apps with nested sections           | Simple marketing pages    |
| Breadcrumbs | Deep hierarchical content                   | Flat site structures      |
| Tabs        | Switching views within a page               | Sequential workflows      |
| Pagination  | Large data sets, search results             | Fewer than 25 items       |

## Top Navigation

Use `cb-top-nav` for primary application navigation. It supports a logo slot, navigation items, and a utility area for user actions.

```html
<cb-top-nav>
  <cb-logo slot="logo" href="/">Cobalt</cb-logo>

  <cb-nav-item href="/dashboard" active>Dashboard</cb-nav-item>
  <cb-nav-item href="/projects">Projects</cb-nav-item>
  <cb-nav-item href="/reports">Reports</cb-nav-item>
  <cb-nav-item href="/settings">Settings</cb-nav-item>

  <cb-nav-actions slot="actions">
    <cb-icon-button icon="bell" label="Notifications"></cb-icon-button>
    <cb-avatar name="Jane Doe" size="sm"></cb-avatar>
  </cb-nav-actions>
</cb-top-nav>
```

## Sidebar Navigation

Use `cb-side-nav` for applications with deep information architecture. It supports collapsible sections and nested items.

```html
<cb-side-nav collapsible>
  <cb-nav-section label="Workspace">
    <cb-nav-item href="/inbox" icon="inbox">Inbox</cb-nav-item>
    <cb-nav-item href="/tasks" icon="check-square">Tasks</cb-nav-item>
  </cb-nav-section>

  <cb-nav-section label="Settings" expanded>
    <cb-nav-item href="/settings/profile" icon="user">Profile</cb-nav-item>
    <cb-nav-item href="/settings/team" icon="users">Team</cb-nav-item>
    <cb-nav-item href="/settings/billing" icon="credit-card">Billing</cb-nav-item>
  </cb-nav-section>
</cb-side-nav>
```

> **Tip:** Keep sidebar navigation to two levels of nesting at most. Deeper hierarchies should be handled with breadcrumbs or in-page navigation.

## Breadcrumbs

Use `cb-breadcrumbs` to show the user's location within a hierarchy. Always include the current page as the last non-linked item.

```html
<cb-breadcrumbs>
  <cb-breadcrumb href="/">Home</cb-breadcrumb>
  <cb-breadcrumb href="/projects">Projects</cb-breadcrumb>
  <cb-breadcrumb href="/projects/cobalt">Cobalt</cb-breadcrumb>
  <cb-breadcrumb current>Settings</cb-breadcrumb>
</cb-breadcrumbs>
```

## Tabs

Use `cb-tabs` to organize related content within the same page context. Tabs should not be used for sequential steps -- use a stepper instead.

```html
<cb-tabs>
  <cb-tab id="tab-overview" selected>Overview</cb-tab>
  <cb-tab id="tab-activity">Activity</cb-tab>
  <cb-tab id="tab-members">Members</cb-tab>
</cb-tabs>

<cb-tab-panel tab="tab-overview">
  <!-- Overview content -->
</cb-tab-panel>
```

## Pagination

Use `cb-pagination` for navigating through paged data. Always display the current page, total pages, and provide first/last page shortcuts for large sets.

```html
<cb-pagination current-page="3" total-pages="12" page-size="25" total-items="290"> </cb-pagination>
```

## Mobile Navigation

On viewports narrower than `768px`, the top navigation collapses into a hamburger menu. The sidebar converts to an overlay drawer.

```html
<cb-top-nav>
  <!-- Navigation items are automatically placed in a drawer on mobile -->
  <cb-nav-item href="/dashboard">Dashboard</cb-nav-item>
  <cb-nav-item href="/projects">Projects</cb-nav-item>
</cb-top-nav>
```

No additional markup is needed. Responsive behavior is built into `cb-top-nav` and `cb-side-nav`. Override the breakpoint with the `collapse-at` attribute if the default does not suit your layout.

## Accessibility

- Use `<nav>` landmark roles (built into `cb-top-nav` and `cb-side-nav`).
- Label each navigation region with `aria-label` when multiple `<nav>` elements exist on a page.
- The active page item should use `aria-current="page"` (applied automatically via the `active` attribute).
- Keyboard navigation follows the roving tabindex pattern within tab groups and navigation bars.
