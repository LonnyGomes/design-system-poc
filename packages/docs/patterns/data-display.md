# Data Display

Data display patterns define how information is presented and formatted across Cobalt interfaces. Consistent presentation helps users scan, compare, and act on information efficiently.

## Tables

Use `cb-table` for structured, comparable data where users need to scan across rows and columns.

```html
<cb-table>
  <cb-table-head>
    <cb-table-row>
      <cb-table-header sortable sorted="asc">Name</cb-table-header>
      <cb-table-header sortable>Role</cb-table-header>
      <cb-table-header sortable>Last active</cb-table-header>
      <cb-table-header align="end">Actions</cb-table-header>
    </cb-table-row>
  </cb-table-head>
  <cb-table-body>
    <cb-table-row>
      <cb-table-cell>Ava Martinez</cb-table-cell>
      <cb-table-cell>Admin</cb-table-cell>
      <cb-table-cell>Mar 10, 2026</cb-table-cell>
      <cb-table-cell align="end">
        <cb-icon-button icon="edit" label="Edit user"></cb-icon-button>
      </cb-table-cell>
    </cb-table-row>
  </cb-table-body>
</cb-table>
```

> **Tip:** For tables with more than six columns, enable horizontal scrolling with `cb-table-container` rather than hiding columns on smaller screens.

## Lists

Use `cb-list` for sequential or grouped items where column-based comparison is not needed.

```html
<cb-list>
  <cb-list-item>
    <cb-avatar name="Project Alpha" slot="prefix"></cb-avatar>
    <cb-list-item-text primary="Project Alpha" secondary="Updated 2 hours ago"></cb-list-item-text>
    <cb-badge slot="suffix" variant="success">Active</cb-badge>
  </cb-list-item>
  <cb-list-item>
    <cb-avatar name="Project Beta" slot="prefix"></cb-avatar>
    <cb-list-item-text primary="Project Beta" secondary="Updated yesterday"></cb-list-item-text>
    <cb-badge slot="suffix" variant="neutral">Archived</cb-badge>
  </cb-list-item>
</cb-list>
```

## Cards

Use `cb-card` for browsable collections where each item is a distinct entity. Cards work well for dashboards, catalogs, and resource galleries.

```html
<cb-card-grid columns="3">
  <cb-card>
    <img slot="media" src="/img/report-thumb.png" alt="Q4 Report" />
    <cb-card-header>Q4 Revenue Report</cb-card-header>
    <cb-card-body>Summary of Q4 performance across all regions.</cb-card-body>
    <cb-card-footer>
      <cb-button variant="ghost" size="sm">View report</cb-button>
    </cb-card-footer>
  </cb-card>
</cb-card-grid>
```

## Empty States

Always provide an empty state when a view has no data. Include a clear description and a primary action to help the user move forward.

```html
<cb-empty-state>
  <cb-icon name="folder-open" size="xl" slot="icon"></cb-icon>
  <cb-empty-state-title>No projects yet</cb-empty-state-title>
  <cb-empty-state-description>
    Create your first project to start collaborating with your team.
  </cb-empty-state-description>
  <cb-button variant="primary" slot="action">Create project</cb-button>
</cb-empty-state>
```

## Loading Skeletons

Use `cb-skeleton` placeholders to indicate content is loading. Match the skeleton shape to the expected content layout.

```html
<cb-list>
  <cb-list-item>
    <cb-skeleton variant="circle" width="40px" height="40px" slot="prefix"></cb-skeleton>
    <cb-skeleton variant="text" width="160px"></cb-skeleton>
  </cb-list-item>
</cb-list>
```

> **Warning:** Avoid using spinners for content that loads in under 300ms. Skeleton screens are preferred for layout-stable loading.

## Data Formatting

Follow these conventions for consistent data display across Cobalt applications.

| Data Type      | Format                 | Example               |
| -------------- | ---------------------- | --------------------- |
| Date           | `MMM DD, YYYY`         | Mar 11, 2026          |
| Date + time    | `MMM DD, YYYY, h:mm A` | Mar 11, 2026, 3:45 PM |
| Relative time  | Plain language         | 2 hours ago           |
| Number         | Thousands separator    | 1,248                 |
| Large number   | Abbreviated            | 12.4K                 |
| Currency (USD) | Symbol + 2 decimals    | $1,299.00             |
| Percentage     | 1 decimal max          | 84.3%                 |

Use the `@cobalt/formatters` utility package to apply these formats programmatically:

```js
import { formatDate, formatCurrency } from '@cobalt/formatters';

formatDate(new Date()); // "Mar 11, 2026"
formatCurrency(1299, 'USD'); // "$1,299.00"
```

## Choosing the Right Pattern

| Scenario                 | Recommended Pattern  |
| ------------------------ | -------------------- |
| Comparing rows of data   | Table                |
| Browsing distinct items  | Cards                |
| Sequential activity feed | List                 |
| Dashboard metrics        | Cards or stat blocks |
