import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const reportsDir = path.resolve(__dirname, '../../components/a11y-reports');

export interface A11yStateResult {
  state: string;
  passes: number;
  violations: number;
  passedRules: string[];
}

export interface A11yReport {
  component: string;
  generatedAt: string;
  states: A11yStateResult[];
  summary: {
    totalPasses: number;
    totalViolations: number;
  };
}

export type A11yReportData = Record<string, A11yReport>;

export default {
  watch: ['../../components/a11y-reports/*.json'],
  load(): A11yReportData {
    const reports: A11yReportData = {};

    if (!fs.existsSync(reportsDir)) {
      return reports;
    }

    const files = fs.readdirSync(reportsDir).filter((f) => f.endsWith('.json'));

    for (const file of files) {
      const content = fs.readFileSync(path.join(reportsDir, file), 'utf-8');
      const report: A11yReport = JSON.parse(content);
      reports[report.component] = report;
    }

    return reports;
  },
};
