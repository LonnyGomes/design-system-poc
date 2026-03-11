import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import ComponentDemo from '../../components/ComponentDemo.vue';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ComponentDemo', ComponentDemo);
  },
} satisfies Theme;
