import { fixture, html, expect } from '@open-wc/testing';
import { runA11yAudit } from '../../test-utils/a11y.js';
import './cb-button.js';
import type { CbButton } from './cb-button.js';

describe('cb-button', () => {
  it('renders with default props', async () => {
    const el = await fixture<CbButton>(html`<cb-button>Click me</cb-button>`);
    expect(el).to.exist;
    expect(el.variant).to.equal('primary');
    expect(el.size).to.equal('md');
    expect(el.disabled).to.be.false;
    expect(el.loading).to.be.false;
  });

  it('reflects variant attribute', async () => {
    const el = await fixture<CbButton>(html`<cb-button variant="danger">Delete</cb-button>`);
    expect(el.variant).to.equal('danger');
    expect(el.getAttribute('variant')).to.equal('danger');
  });

  it('reflects size attribute', async () => {
    const el = await fixture<CbButton>(html`<cb-button size="lg">Large</cb-button>`);
    expect(el.size).to.equal('lg');
    expect(el.getAttribute('size')).to.equal('lg');
  });

  it('maps variant to Shoelace variant', async () => {
    const el = await fixture<CbButton>(html`<cb-button variant="secondary">Sec</cb-button>`);
    const slButton = el.shadowRoot!.querySelector('sl-button');
    expect(slButton).to.exist;
    expect(slButton!.getAttribute('variant')).to.equal('default');
  });

  it('maps size to Shoelace size', async () => {
    const el = await fixture<CbButton>(html`<cb-button size="sm">Small</cb-button>`);
    const slButton = el.shadowRoot!.querySelector('sl-button');
    expect(slButton!.getAttribute('size')).to.equal('small');
  });

  it('passes disabled to Shoelace', async () => {
    const el = await fixture<CbButton>(html`<cb-button disabled>Disabled</cb-button>`);
    const slButton = el.shadowRoot!.querySelector('sl-button');
    expect(slButton!.hasAttribute('disabled')).to.be.true;
  });

  it('passes loading to Shoelace', async () => {
    const el = await fixture<CbButton>(html`<cb-button loading>Loading</cb-button>`);
    const slButton = el.shadowRoot!.querySelector('sl-button');
    expect(slButton!.hasAttribute('loading')).to.be.true;
  });

  it('projects default slot content', async () => {
    const el = await fixture<CbButton>(html`<cb-button>Hello</cb-button>`);
    expect(el.textContent?.trim()).to.equal('Hello');
  });

  it('projects prefix slot', async () => {
    const el = await fixture<CbButton>(html`
      <cb-button>
        <span slot="prefix">★</span>
        Star
      </cb-button>
    `);
    const prefixSlot = el.querySelector('[slot="prefix"]');
    expect(prefixSlot).to.exist;
    expect(prefixSlot!.textContent).to.equal('★');
  });

  it('projects suffix slot', async () => {
    const el = await fixture<CbButton>(html`
      <cb-button>
        Go
        <span slot="suffix">→</span>
      </cb-button>
    `);
    const suffixSlot = el.querySelector('[slot="suffix"]');
    expect(suffixSlot).to.exist;
    expect(suffixSlot!.textContent).to.equal('→');
  });

  it('dispatches cb-focus event', async () => {
    const el = await fixture<CbButton>(html`<cb-button>Focus me</cb-button>`);
    let focusFired = false;
    el.addEventListener('cb-focus', () => {
      focusFired = true;
    });
    const slButton = el.shadowRoot!.querySelector('sl-button')!;
    slButton.dispatchEvent(new CustomEvent('sl-focus', { bubbles: true }));
    expect(focusFired).to.be.true;
  });

  it('dispatches cb-blur event', async () => {
    const el = await fixture<CbButton>(html`<cb-button>Blur me</cb-button>`);
    let blurFired = false;
    el.addEventListener('cb-blur', () => {
      blurFired = true;
    });
    const slButton = el.shadowRoot!.querySelector('sl-button')!;
    slButton.dispatchEvent(new CustomEvent('sl-blur', { bubbles: true }));
    expect(blurFired).to.be.true;
  });

  describe('accessibility', () => {
    it('is accessible in default state', async () => {
      const el = await fixture(html`<cb-button>Click me</cb-button>`);
      await runA11yAudit(el);
    });

    it('is accessible when disabled', async () => {
      const el = await fixture(html`<cb-button disabled>Disabled</cb-button>`);
      await runA11yAudit(el);
    });

    it('is accessible with loading state', async () => {
      const el = await fixture(html`<cb-button loading>Loading</cb-button>`);
      await runA11yAudit(el);
    });
  });
});
