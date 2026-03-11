/**
 * Runs axe-core accessibility audit on the given element.
 * Throws an error if any violations are found.
 */
export async function runA11yAudit(el: Element): Promise<void> {
  // axe-core is CJS-only and attaches to window.axe when loaded in the browser
  await import('axe-core');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const axe = (globalThis as any).axe;
  if (!axe?.run) {
    throw new Error('axe-core did not load correctly');
  }
  const results = await axe.run(el as HTMLElement);
  if (results.violations.length > 0) {
    const messages = results.violations.map(
      (v: { impact: string; id: string; description: string; nodes: { html: string }[] }) => {
        const nodes = v.nodes.map((n: { html: string }) => n.html).join('\n  ');
        return `[${v.impact}] ${v.id}: ${v.description}\n  ${nodes}`;
      },
    );
    throw new Error(`Accessibility violations found:\n${messages.join('\n\n')}`);
  }
}
