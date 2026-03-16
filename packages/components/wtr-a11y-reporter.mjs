import fs from 'node:fs';
import path from 'node:path';

const REPORTS_DIR = 'a11y-reports';

/**
 * Web Test Runner plugin that collects a11y audit results from browser tests
 * via executeServerCommand and writes per-component JSON reports on stop.
 */
export function a11yReporterPlugin() {
  /** @type {Map<string, Array<{state: string, passes: number, violations: number, incomplete: number, passedRules: string[], violationDetails: Array<any>}>>} */
  const resultsByComponent = new Map();

  return {
    name: 'a11y-reporter',

    async executeCommand({ command, payload }) {
      if (command !== 'a11y-result') return undefined;

      const { component, state, passes, violations, incomplete, passedRules, violationDetails } =
        payload;

      if (!resultsByComponent.has(component)) {
        resultsByComponent.set(component, []);
      }

      resultsByComponent.get(component).push({
        state,
        passes,
        violations,
        incomplete,
        passedRules,
        violationDetails,
      });

      return true;
    },

    async serverStop() {
      if (resultsByComponent.size === 0) return;

      const reportsDir = path.resolve(REPORTS_DIR);
      fs.mkdirSync(reportsDir, { recursive: true });

      for (const [component, states] of resultsByComponent) {
        const totalPasses = states.reduce((sum, s) => sum + s.passes, 0);
        const totalViolations = states.reduce((sum, s) => sum + s.violations, 0);

        const report = {
          component,
          generatedAt: new Date().toISOString(),
          states: states.map((s) => ({
            state: s.state,
            passes: s.passes,
            violations: s.violations,
            passedRules: s.passedRules,
          })),
          summary: {
            totalPasses,
            totalViolations,
          },
        };

        const filePath = path.join(reportsDir, `${component}.json`);
        fs.writeFileSync(filePath, JSON.stringify(report, null, 2) + '\n');
      }
    },
  };
}
