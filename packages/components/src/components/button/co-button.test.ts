import { fixture, html, expect } from '@open-wc/testing';
import { runA11yAudit } from '../../test-utils/a11y.js';
import './co-button.js';
import type { CoButton } from './co-button.js';

describe('co-button', () => {
  it('renders with default props', async () => {
    const el = await fixture<CoButton>(html`<co-button>Click me</co-button>`);
    expect(el).to.exist;
    expect(el.variant).to.equal('primary');
    expect(el.size).to.equal('md');
    expect(el.disabled).to.be.false;
    expect(el.loading).to.be.false;
  });

  it('reflects variant attribute', async () => {
    const el = await fixture<CoButton>(html`<co-button variant="danger">Delete</co-button>`);
    expect(el.variant).to.equal('danger');
    expect(el.getAttribute('variant')).to.equal('danger');
  });

  it('reflects size attribute', async () => {
    const el = await fixture<CoButton>(html`<co-button size="lg">Large</co-button>`);
    expect(el.size).to.equal('lg');
    expect(el.getAttribute('size')).to.equal('lg');
  });

  it('maps variant to Shoelace variant', async () => {
    const el = await fixture<CoButton>(html`<co-button variant="secondary">Sec</co-button>`);
    const slButton = el.shadowRoot!.querySelector('sl-button');
    expect(slButton).to.exist;
    expect(slButton!.getAttribute('variant')).to.equal('default');
  });

  it('maps size to Shoelace size', async () => {
    const el = await fixture<CoButton>(html`<co-button size="sm">Small</co-button>`);
    const slButton = el.shadowRoot!.querySelector('sl-button');
    expect(slButton!.getAttribute('size')).to.equal('small');
  });

  it('passes disabled to Shoelace', async () => {
    const el = await fixture<CoButton>(html`<co-button disabled>Disabled</co-button>`);
    const slButton = el.shadowRoot!.querySelector('sl-button');
    expect(slButton!.hasAttribute('disabled')).to.be.true;
  });

  it('passes loading to Shoelace', async () => {
    const el = await fixture<CoButton>(html`<co-button loading>Loading</co-button>`);
    const slButton = el.shadowRoot!.querySelector('sl-button');
    expect(slButton!.hasAttribute('loading')).to.be.true;
  });

  it('projects default slot content', async () => {
    const el = await fixture<CoButton>(html`<co-button>Hello</co-button>`);
    expect(el.textContent?.trim()).to.equal('Hello');
  });

  it('projects prefix slot', async () => {
    const el = await fixture<CoButton>(html`
      <co-button>
        <span slot="prefix">★</span>
        Star
      </co-button>
    `);
    const prefixSlot = el.querySelector('[slot="prefix"]');
    expect(prefixSlot).to.exist;
    expect(prefixSlot!.textContent).to.equal('★');
  });

  it('projects suffix slot', async () => {
    const el = await fixture<CoButton>(html`
      <co-button>
        Go
        <span slot="suffix">→</span>
      </co-button>
    `);
    const suffixSlot = el.querySelector('[slot="suffix"]');
    expect(suffixSlot).to.exist;
    expect(suffixSlot!.textContent).to.equal('→');
  });

  it('dispatches co-focus event', async () => {
    const el = await fixture<CoButton>(html`<co-button>Focus me</co-button>`);
    let focusFired = false;
    el.addEventListener('co-focus', () => {
      focusFired = true;
    });
    const slButton = el.shadowRoot!.querySelector('sl-button')!;
    slButton.dispatchEvent(new CustomEvent('sl-focus', { bubbles: true }));
    expect(focusFired).to.be.true;
  });

  it('dispatches co-blur event', async () => {
    const el = await fixture<CoButton>(html`<co-button>Blur me</co-button>`);
    let blurFired = false;
    el.addEventListener('co-blur', () => {
      blurFired = true;
    });
    const slButton = el.shadowRoot!.querySelector('sl-button')!;
    slButton.dispatchEvent(new CustomEvent('sl-blur', { bubbles: true }));
    expect(blurFired).to.be.true;
  });

  describe('accessibility', () => {
    it('is accessible in default state', async () => {
      const el = await fixture(html`<co-button>Click me</co-button>`);
      await runA11yAudit(el);
    });

    it('is accessible when disabled', async () => {
      const el = await fixture(html`<co-button disabled>Disabled</co-button>`);
      await runA11yAudit(el);
    });

    it('is accessible with loading state', async () => {
      const el = await fixture(html`<co-button loading>Loading</co-button>`);
      await runA11yAudit(el);
    });
  });
});
