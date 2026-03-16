<script setup lang="ts">
import { computed, ref } from 'vue';
import { data as reports } from './a11y-report.data';

const props = defineProps<{
  component: string;
}>();

const report = computed(() => reports[props.component]);
const showRules = ref(false);

const allPassedRules = computed(() => {
  if (!report.value) return [];
  const ruleSet = new Set<string>();
  for (const state of report.value.states) {
    for (const rule of state.passedRules) {
      ruleSet.add(rule);
    }
  }
  return Array.from(ruleSet).sort();
});
</script>

<template>
  <div v-if="report" class="a11y-report">
    <div class="a11y-summary">
      <span class="a11y-badge" :class="report.summary.totalViolations === 0 ? 'pass' : 'fail'">
        {{ report.summary.totalPasses }} rules passed,
        {{ report.summary.totalViolations }} violations
      </span>
    </div>

    <table class="a11y-table">
      <thead>
        <tr>
          <th>State</th>
          <th>Passed</th>
          <th>Violations</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="state in report.states" :key="state.state">
          <td>
            <code>{{ state.state }}</code>
          </td>
          <td>{{ state.passes }}</td>
          <td>{{ state.violations }}</td>
        </tr>
      </tbody>
    </table>

    <details class="a11y-rules">
      <summary>Validated axe-core rules ({{ allPassedRules.length }})</summary>
      <ul>
        <li v-for="rule in allPassedRules" :key="rule">
          <code>{{ rule }}</code>
        </li>
      </ul>
    </details>
  </div>
  <div v-else class="a11y-report a11y-empty">
    <p>
      No accessibility audit data available for <code>{{ component }}</code
      >. Run <code>pnpm test</code> to generate reports.
    </p>
  </div>
</template>

<style scoped>
.a11y-report {
  margin: 16px 0;
}

.a11y-summary {
  margin-bottom: 12px;
}

.a11y-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
}

.a11y-badge.pass {
  background-color: var(--vp-c-green-soft);
  color: var(--vp-c-green-2);
}

.a11y-badge.fail {
  background-color: var(--vp-c-red-soft);
  color: var(--vp-c-red-2);
}

.a11y-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 12px;
}

.a11y-table th,
.a11y-table td {
  padding: 8px 12px;
  text-align: left;
  border-bottom: 1px solid var(--vp-c-divider);
}

.a11y-table th {
  font-weight: 600;
  font-size: 14px;
}

.a11y-rules {
  margin-top: 8px;
}

.a11y-rules summary {
  cursor: pointer;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.a11y-rules ul {
  columns: 2;
  padding-left: 20px;
  margin-top: 8px;
}

.a11y-rules li {
  font-size: 13px;
  margin-bottom: 4px;
}

.a11y-empty {
  padding: 12px 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  font-size: 14px;
  color: var(--vp-c-text-2);
}
</style>
