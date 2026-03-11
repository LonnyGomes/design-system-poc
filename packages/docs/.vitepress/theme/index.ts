import type { Theme } from 'vitepress';
import CobaltLayout from './components/CobaltLayout.vue';
import ComponentDemo from '../../components/ComponentDemo.vue';
import CodeTabs from '../../components/CodeTabs.vue';

import './cobalt.css';

export default {
  Layout: CobaltLayout,
  enhanceApp({ app }) {
    app.component('ComponentDemo', ComponentDemo);
    app.component('CodeTabs', CodeTabs);

    // Register Cobalt web components (client-side only)
    if (typeof window !== 'undefined') {
      import('@cobalt/components');
    }
  },
} satisfies Theme;
