import { playwrightLauncher } from '@web/test-runner-playwright';

export default {
  files: 'dist/**/*.test.js',
  nodeResolve: true,
  browsers: [playwrightLauncher({ product: 'chromium' })],
  testFramework: {
    config: {
      timeout: 10000,
    },
  },
  coverageConfig: {
    include: ['dist/components/**/*.js'],
    exclude: ['dist/**/*.test.js', 'dist/test-utils/**'],
    threshold: {
      statements: 80,
      branches: 70,
      functions: 80,
      lines: 80,
    },
  },
};
