import { defineConfig } from 'vitepress';
import { toVitePressNav, toVitePressSidebar } from './theme/navigation';

export default defineConfig({
  base: '/design-system-poc/',
  title: 'Cobalt Design System',
  description: 'A design system built with Lit + Lion',
  markdown: {
    theme: {
      dark: 'tokyo-night',
      light: 'github-light',
    },
  },
  head: [
    [
      'script',
      {},
      `(function(){var t=localStorage.getItem('cobalt-theme');if(t)document.documentElement.setAttribute('data-theme',t)})()`,
    ],
  ],
  themeConfig: {
    search: {
      provider: 'local',
    },
    nav: toVitePressNav(),
    sidebar: toVitePressSidebar(),
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag: string) => tag.startsWith('co-') || tag.startsWith('lion-'),
      },
    },
  },
  vite: {
    optimizeDeps: {
      include: ['lit', '@lion/ui/button.js', '@cobalt/components', '@cobalt/icons'],
    },
  },
});
