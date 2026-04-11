// Flat config for ESLint v9+. Migrated from .eslintrc.cjs because ESLint 10
// dropped support for the legacy config format.
//
// This config is deliberately minimal: it parses TypeScript and enforces the
// one project-specific rule the legacy config cared about
// (@typescript-eslint/no-unused-vars). Rule coverage from the plugin
// `recommended` rulesets was never actually enforced — the legacy config
// couldn't load under ESLint 10 — so re-adding it here would surface a large
// number of pre-existing lint errors. Follow-up work can expand coverage once
// those errors are triaged and fixed.
//
// `.mjs` so we can use ESM imports, which interop cleanly with plugins that
// ship as either CJS or ESM.

import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
  {
    files: ['packages/*/src/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      // Core no-unused-vars is superseded by the TypeScript-aware version.
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
];
