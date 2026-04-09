import { fixture, html, expect } from '@open-wc/testing';
import { runA11yAudit } from '../../test-utils/a11y.js';
import '../icon/co-icon.js';
import './co-input.js';
import type { CoInput } from './co-input.js';

describe('co-input', () => {
  it('renders with default props', async () => {
    const el = await fixture<CoInput>(html`<co-input label="Email"></co-input>`);
    expect(el.size).to.equal('md');
    expect(el.type).to.equal('text');
    expect(el.value).to.equal('');
    expect(el.disabled).to.be.false;
    expect(el.invalid).to.be.false;
  });

  it('renders label and helper text', async () => {
    const el = await fixture<CoInput>(
      html`<co-input label="Email" helper-text="We will never share it."></co-input>`,
    );
    const label = el.shadowRoot!.querySelector('label');
    const message = el.shadowRoot!.querySelector('[part="message"]');
    expect(label?.textContent).to.contain('Email');
    expect(message?.textContent).to.contain('We will never share it.');
  });

  it('updates the value from native input events', async () => {
    const el = await fixture<CoInput>(html`<co-input label="Name"></co-input>`);
    const input = el.shadowRoot!.querySelector('input')!;
    input.value = 'Cobalt';
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    await el.updateComplete;
    expect(el.value).to.equal('Cobalt');
  });

  it('renders error text when invalid', async () => {
    const el = await fixture<CoInput>(
      html`<co-input invalid error-text="This field is required." label="Name"></co-input>`,
    );
    const message = el.shadowRoot!.querySelector('[part="message"]');
    expect(el.hasAttribute('invalid')).to.be.true;
    expect(message?.textContent).to.contain('This field is required.');
    expect(message?.getAttribute('role')).to.equal('alert');
  });

  it('renders prefix and suffix slots when provided', async () => {
    const el = await fixture<CoInput>(html`
      <co-input label="Search">
        <co-icon slot="prefix" name="search"></co-icon>
        <span slot="suffix">⌘K</span>
      </co-input>
    `);
    await el.updateComplete;
    const prefix = el.shadowRoot!.querySelector('[part="prefix"]') as HTMLElement;
    const suffix = el.shadowRoot!.querySelector('[part="suffix"]') as HTMLElement;
    expect(prefix.hidden).to.equal(false);
    expect(suffix.hidden).to.equal(false);
  });

  it('dispatches co-focus and co-blur events', async () => {
    const el = await fixture<CoInput>(html`<co-input label="Email"></co-input>`);
    const input = el.shadowRoot!.querySelector('input')!;
    let focusFired = false;
    let blurFired = false;

    el.addEventListener('co-focus', () => {
      focusFired = true;
    });
    el.addEventListener('co-blur', () => {
      blurFired = true;
    });

    input.dispatchEvent(new FocusEvent('focus'));
    input.dispatchEvent(new FocusEvent('blur'));

    expect(focusFired).to.be.true;
    expect(blurFired).to.be.true;
  });

  describe('accessibility', () => {
    it('is accessible in default state', async () => {
      const el = await fixture(
        html`<co-input
          label="Email address"
          helper-text="Use your work email."
          placeholder="name@example.com"
        ></co-input>`,
      );
      await runA11yAudit(el, { component: 'co-input', state: 'default' });
    });

    it('is accessible in invalid state', async () => {
      const el = await fixture(
        html`<co-input
          invalid
          label="Email address"
          error-text="Enter a valid email address."
          value="not-an-email"
        ></co-input>`,
      );
      await runA11yAudit(el, { component: 'co-input', state: 'invalid' });
    });
  });
});
