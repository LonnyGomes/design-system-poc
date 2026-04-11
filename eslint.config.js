// Flat config for ESLint v9+. Migrated from .eslintrc.cjs because ESLint 10
// dropped support for the legacy config format. Only references packages that
// already exist in pnpm-lock.yaml so the frozen-lockfile CI install is not
// affected.

const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const litPlugin = require('eslint-plugin-lit');
const wcPlugin = require('eslint-plugin-wc');

// Some legacy plugin configs expose rules at `configs[name].rules`, others
// under `configs[name].overrides[0].rules`. This helper handles both so the
// migration does not lose coverage.
function rulesFrom(plugin, configName) {
  const cfg = plugin && plugin.configs && plugin.configs[configName];
  if (!cfg) return {};
  if (cfg.rules) return cfg.rules;
  if (cfg.overrides && cfg.overrides[0] && cfg.overrides[0].rules) {
    return cfg.overrides[0].rules;
  }
  return {};
}

module.exports = [
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
      lit: litPlugin,
      wc: wcPlugin,
    },
    rules: {
      // typescript-eslint disables core rules that TS already handles
      // (no-undef, no-unused-vars, etc.) via its eslint-recommended config.
      ...rulesFrom(tsPlugin, 'eslint-recommended'),
      ...rulesFrom(tsPlugin, 'recommended'),
      ...rulesFrom(litPlugin, 'recommended'),
      ...rulesFrom(wcPlugin, 'recommended'),

      // Project overrides (preserved from the legacy .eslintrc.cjs).
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'wc/guard-super-call': 'off',
    },
  },
];
