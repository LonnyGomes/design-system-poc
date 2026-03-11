<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  component: string;
  defaults?: Record<string, string | boolean>;
  options?: Record<string, string[]>;
}>();

const state = ref<Record<string, string | boolean>>({ ...props.defaults });

const attrString = computed(() => {
  return Object.entries(state.value)
    .filter(([, v]) => v !== false && v !== '' && v !== undefined)
    .map(([k, v]) => (v === true ? k : `${k}="${v}"`))
    .join(' ');
});

const codeSnippet = computed(() => {
  const attrs = attrString.value ? ' ' + attrString.value : '';
  return `<${props.component}${attrs}>Button</${props.component}>`;
});
</script>

<template>
  <div class="component-demo">
    <div class="demo-controls" v-if="options">
      <div v-for="(values, key) in options" :key="key" class="control-group">
        <label>{{ key }}</label>
        <select v-model="state[key]">
          <option v-for="val in values" :key="val" :value="val">{{ val }}</option>
        </select>
      </div>
    </div>
    <div class="demo-preview">
      <ClientOnly>
        <div v-html="codeSnippet"></div>
      </ClientOnly>
    </div>
    <details class="demo-code">
      <summary>View code</summary>
      <pre><code>{{ codeSnippet }}</code></pre>
    </details>
  </div>
</template>

<style scoped>
.component-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin: 16px 0;
  overflow: hidden;
}
.demo-controls {
  padding: 12px 16px;
  background: var(--vp-c-bg-soft);
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
.control-group {
  display: flex;
  align-items: center;
  gap: 8px;
}
.control-group label {
  font-size: 0.875rem;
  font-weight: 500;
}
.control-group select {
  padding: 4px 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
}
.demo-preview {
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.demo-code {
  border-top: 1px solid var(--vp-c-divider);
}
.demo-code summary {
  padding: 8px 16px;
  cursor: pointer;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}
.demo-code pre {
  margin: 0;
  padding: 12px 16px;
  background: var(--vp-c-bg-soft);
}
</style>
