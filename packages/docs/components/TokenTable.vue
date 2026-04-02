<script setup lang="ts">
import { ref, computed } from 'vue';

export interface TokenEntry {
  name: string;
  value: string;
  category: string;
}

const props = defineProps<{
  tokens: TokenEntry[];
}>();

const query = ref('');
const copiedName = ref<string | null>(null);

const filtered = computed(() => {
  const q = query.value.toLowerCase();
  if (!q) return props.tokens;
  return props.tokens.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.value.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q),
  );
});

const categories = computed(() => {
  const counts: Record<string, number> = {};
  for (const t of props.tokens) {
    counts[t.category] = (counts[t.category] ?? 0) + 1;
  }
  return counts;
});

function isColor(value: string): boolean {
  return /^#[0-9a-f]{3,8}$/i.test(value) || value.startsWith('rgb') || value.startsWith('hsl');
}

async function copyToken(name: string) {
  await navigator.clipboard.writeText(name);
  copiedName.value = name;
  setTimeout(() => {
    if (copiedName.value === name) copiedName.value = null;
  }, 1500);
}
</script>

<template>
  <div class="token-table-wrapper">
    <div class="token-search">
      <input
        v-model="query"
        type="text"
        class="token-search-input"
        placeholder="Search tokens by name, value, or category..."
      />
      <span class="token-count"> {{ filtered.length }} of {{ tokens.length }} tokens </span>
    </div>

    <table class="token-table">
      <thead>
        <tr>
          <th class="col-token">Token</th>
          <th class="col-value">Value</th>
          <th class="col-category">Category</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="token in filtered" :key="token.name">
          <td class="col-token">
            <button
              class="token-name"
              :class="{ copied: copiedName === token.name }"
              :title="copiedName === token.name ? 'Copied!' : 'Click to copy'"
              @click="copyToken(token.name)"
            >
              <code>{{ token.name }}</code>
              <svg
                v-if="copiedName === token.name"
                class="copy-icon"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />
              </svg>
            </button>
          </td>
          <td class="col-value">
            <span
              v-if="isColor(token.value)"
              class="color-swatch"
              :style="{ background: token.value }"
            ></span>
            <code class="token-value">{{ token.value }}</code>
          </td>
          <td class="col-category">
            <span class="category-badge">{{ token.category }}</span>
          </td>
        </tr>
        <tr v-if="filtered.length === 0">
          <td colspan="3" class="no-results">No tokens match "{{ query }}"</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.token-table-wrapper {
  margin: 16px 0 24px;
}

.token-search {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.token-search-input {
  flex: 1;
  min-width: 240px;
  padding: 8px 12px;
  border: 1px solid var(--vp-c-border, #e2e2e3);
  border-radius: 8px;
  font-size: 0.9rem;
  font-family: inherit;
  background: var(--vp-c-bg, #fff);
  color: var(--vp-c-text-1, #213547);
  outline: none;
  transition: border-color 0.2s;
}

.token-search-input:focus {
  border-color: var(--vp-c-brand-1, #3451b2);
}

.token-search-input::placeholder {
  color: var(--vp-c-text-3, #8e8e93);
}

.token-count {
  font-size: 0.8rem;
  color: var(--vp-c-text-3, #8e8e93);
  white-space: nowrap;
}

.token-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

.token-table th {
  text-align: left;
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--vp-c-text-3, #8e8e93);
  padding: 8px 12px;
  border-bottom: 2px solid var(--vp-c-border, #e2e2e3);
}

.token-table td {
  padding: 6px 12px;
  border-bottom: 1px solid var(--vp-c-divider, #e2e2e3);
  vertical-align: middle;
}

.token-table tbody tr:hover {
  background: var(--vp-c-bg-soft, #f6f6f7);
}

.col-token {
  min-width: 280px;
}

.col-value {
  min-width: 160px;
}

.col-category {
  width: 100px;
}

.token-name {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  padding: 2px 4px;
  margin: -2px -4px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.15s;
  font-family: inherit;
  color: inherit;
}

.token-name:hover {
  background: var(--vp-c-bg-soft, #f6f6f7);
}

.token-name.copied {
  color: #16a34a;
}

.token-name code {
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 0.82rem;
  background: none;
  padding: 0;
  color: inherit;
}

.copy-icon {
  width: 14px;
  height: 14px;
  color: #16a34a;
  flex-shrink: 0;
}

.token-value {
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 0.8rem;
  color: var(--vp-c-text-2, #495464);
  word-break: break-all;
}

.color-swatch {
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  vertical-align: middle;
  margin-right: 6px;
  flex-shrink: 0;
}

.category-badge {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 10px;
  background: var(--vp-c-bg-soft, #f6f6f7);
  color: var(--vp-c-text-2, #495464);
}

.no-results {
  text-align: center;
  color: var(--vp-c-text-3, #8e8e93);
  padding: 24px 12px !important;
  font-style: italic;
}
</style>
