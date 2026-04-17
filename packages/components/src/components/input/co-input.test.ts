import { fixture, html, expect, oneEvent } from '@open-wc/testing';
import { runA11yAudit } from '../../test-utils/a11y.js';
import './co-input.js';
import type { CoInput } from './co-input.js';

function getNativeInput(el: CoInput) {
  return el.querySelector('input[slot="input"]') as HTMLInputElement;
}

describe('co-input', () => {
  it('renders with default props', async () => {
    const el = await fixture<CoInput>(html`<co-input label="Name"></co-input>`);
    expect(el).to.exist;
    expect(el.size).to.equal('md');
    expect(el.danger).to.be.false;
    expect(el.type).to.equal('text');
    expect(el.disabled).to.be.false;
    expect(el.readOnly).to.be.false;
  });

  it('reflects size attribute', async () => {
    const el = await fixture<CoInput>(html`<co-input size="lg" label="Name"></co-input>`);
    expect(el.size).to.equal('lg');
    expect(el.getAttribute('size')).to.equal('lg');
  });

  it('reflects danger attribute without changing validity', async () => {
    const el = await fixture<CoInput>(html`<co-input danger label="Name"></co-input>`);
    expect(el.danger).to.be.true;
    expect(el.hasAttribute('danger')).to.be.true;
    expect(getNativeInput(el).getAttribute('aria-invalid')).to.not.equal('true');
  });

  it('delegates type and placeholder to the native input', async () => {
    const el = await fixture<CoInput>(
      html`<co-input type="email" placeholder="name@example.com" label="Email"></co-input>`,
    );
    const input = getNativeInput(el);
    expect(input.type).to.equal('email');
    expect(input.placeholder).to.equal('name@example.com');
  });

  it('delegates disabled and readonly to the native input', async () => {
    const el = await fixture<CoInput>(
      html`<co-input disabled readonly label="Account id"></co-input>`,
    );
    const input = getNativeInput(el);
    expect(el.disabled).to.be.true;
    expect(el.readOnly).to.be.true;
    expect(input.disabled).to.be.true;
    expect(input.readOnly).to.be.true;
  });

  it('delegates name to the native input', async () => {
    const el = await fixture<CoInput>(html`<co-input name="email" label="Email"></co-input>`);
    expect(getNativeInput(el).name).to.equal('email');
  });

  it('renders Lion field structure in shadow DOM', async () => {
    const el = await fixture<CoInput>(
      html`<co-input label="Email" help-text="Use your work email"></co-input>`,
    );
    expect(el.shadowRoot!.querySelector('[part="label"]')).to.exist;
    expect(el.shadowRoot!.querySelector('[part="help-text"]')).to.exist;
    expect(el.shadowRoot!.querySelector('[part="control"]')).to.exist;
    expect(el.shadowRoot!.querySelector('[part="input"]')).to.exist;
    expect(getNativeInput(el)).to.exist;
  });

  it('renders prefix and suffix slots', async () => {
    const el = await fixture<CoInput>(html`
      <co-input label="Search">
        <span slot="prefix">search</span>
        <span slot="suffix">clear</span>
      </co-input>
    `);
    expect(el.querySelector('[slot="prefix"]')!.textContent).to.equal('search');
    expect(el.querySelector('[slot="suffix"]')!.textContent).to.equal('clear');
    expect(el.shadowRoot!.querySelector('[part="prefix"]')).to.exist;
    expect(el.shadowRoot!.querySelector('[part="suffix"]')).to.exist;
  });

  it('dispatches co-focus and co-blur events from the native input', async () => {
    const el = await fixture<CoInput>(html`<co-input label="Name"></co-input>`);
    const input = getNativeInput(el);

    setTimeout(() => input.dispatchEvent(new FocusEvent('focusin', { bubbles: true })));
    const focusEvent = await oneEvent(el, 'co-focus');
    expect(focusEvent).to.exist;

    setTimeout(() => input.dispatchEvent(new FocusEvent('focusout', { bubbles: true })));
    const blurEvent = await oneEvent(el, 'co-blur');
    expect(blurEvent).to.exist;
  });

  it('dispatches co-input with current value detail', async () => {
    const el = await fixture<CoInput>(html`<co-input label="Name"></co-input>`);
    const input = getNativeInput(el);
    input.value = 'Ada';

    setTimeout(() => input.dispatchEvent(new Event('input', { bubbles: true, composed: true })));
    const event = (await oneEvent(el, 'co-input')) as CustomEvent;
    expect(event.detail.value).to.equal('Ada');
  });

  it('dispatches co-change with current value detail', async () => {
    const el = await fixture<CoInput>(html`<co-input label="Name"></co-input>`);
    const input = getNativeInput(el);
    input.value = 'Grace';

    setTimeout(() => input.dispatchEvent(new Event('change', { bubbles: true, composed: true })));
    const event = (await oneEvent(el, 'co-change')) as CustomEvent;
    expect(event.detail.value).to.equal('Grace');
  });

  it('projects validation feedback slot content', async () => {
    const el = await fixture<CoInput>(html`
      <co-input label="Email">
        <span slot="feedback">Enter an email address.</span>
      </co-input>
    `);
    expect(el.querySelector('[slot="feedback"]')!.textContent).to.equal('Enter an email address.');
    expect(el.shadowRoot!.querySelector('[part="feedback"]')).to.exist;
  });

  describe('accessibility', () => {
    it('is accessible in default state', async () => {
      const el = await fixture(html`<co-input label="Name"></co-input>`);
      await runA11yAudit(el, { component: 'co-input', state: 'default' });
    });

    it('is accessible when disabled', async () => {
      const el = await fixture(html`<co-input label="Name" disabled></co-input>`);
      await runA11yAudit(el, { component: 'co-input', state: 'disabled' });
    });

    it('is accessible when readonly', async () => {
      const el = await fixture(html`<co-input label="Account id" readonly></co-input>`);
      await runA11yAudit(el, { component: 'co-input', state: 'readonly' });
    });

    it('is accessible with danger styling', async () => {
      const el = await fixture(html`<co-input label="Email" danger></co-input>`);
      await runA11yAudit(el, { component: 'co-input', state: 'danger' });
    });

    it('is accessible with feedback content', async () => {
      const el = await fixture(html`
        <co-input label="Email" help-text="Use your work email">
          <span slot="feedback">Enter an email address.</span>
        </co-input>
      `);
      await runA11yAudit(el, { component: 'co-input', state: 'feedback' });
    });
  });
});
