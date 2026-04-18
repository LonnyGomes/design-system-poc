import { fixture, html, expect, oneEvent } from '@open-wc/testing';
import { runA11yAudit } from '../../test-utils/a11y.js';
import './co-combobox.js';
import type { CoCombobox, CoOption } from './co-combobox.js';

function getComboboxInput(el: CoCombobox) {
  const comboboxNode = el.querySelector('[slot="input"]') as HTMLInputElement | HTMLElement;
  return (
    comboboxNode instanceof HTMLInputElement ? comboboxNode : comboboxNode.querySelector('input')
  ) as HTMLInputElement;
}

function getListboxNode(el: CoCombobox) {
  return el.querySelector('[slot="listbox"]') as HTMLElement;
}

function getOptions(el: CoCombobox) {
  return Array.from(el.querySelectorAll('co-option')) as CoOption[];
}

async function typeIntoCombobox(el: CoCombobox, value: string) {
  const input = getComboboxInput(el);
  input.value = value;
  input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
  await el.updateComplete;
  await el.updateComplete;
}

describe('co-combobox', () => {
  it('renders with default props', async () => {
    const el = await fixture<CoCombobox>(html`
      <co-combobox label="Fruit">
        <co-option value="apple">Apple</co-option>
        <co-option value="banana">Banana</co-option>
      </co-combobox>
    `);

    expect(el).to.exist;
    expect(el.size).to.equal('md');
    expect(el.autocomplete).to.equal('both');
    expect(el.matchMode).to.equal('all');
    expect(el.showAllOnEmpty).to.be.false;
    expect(el.selectionFollowsFocus).to.be.true;
    expect(el.rotateKeyboardNavigation).to.be.true;
    expect(el.multiple).to.be.false;
    expect(el.multipleChoice).to.be.false;
    expect(el.allowCustomChoice).to.be.false;
    expect(el.requireOptionMatch).to.be.true;
    expect(el.required).to.be.false;
    expect(el.danger).to.be.false;
  });

  it('moves default option children into the internal listbox node', async () => {
    const el = await fixture<CoCombobox>(html`
      <co-combobox label="Fruit">
        <co-option value="apple">Apple</co-option>
        <co-option value="banana">Banana</co-option>
      </co-combobox>
    `);

    const listboxNode = getListboxNode(el);
    expect(listboxNode.getAttribute('role')).to.equal('listbox');
    expect(listboxNode.querySelectorAll('co-option')).to.have.length(2);
  });

  it('reflects Cobalt and Lion behavior attributes', async () => {
    const el = await fixture<CoCombobox>(html`
      <co-combobox
        label="Fruit"
        size="lg"
        autocomplete="list"
        match-mode="begin"
        show-all-on-empty
        multiple
        allow-custom-choice
        danger
      >
        <co-option value="apple">Apple</co-option>
        <co-option value="banana">Banana</co-option>
      </co-combobox>
    `);

    expect(el.size).to.equal('lg');
    expect(el.autocomplete).to.equal('list');
    expect(el.matchMode).to.equal('begin');
    expect(el.showAllOnEmpty).to.be.true;
    expect(el.multiple).to.be.true;
    expect(el.multipleChoice).to.be.true;
    expect(el.allowCustomChoice).to.be.true;
    expect(el.requireOptionMatch).to.be.false;
    expect(el.danger).to.be.true;
    expect(getListboxNode(el).getAttribute('aria-multiselectable')).to.equal('true');
  });

  it('keeps multipleChoice and multiple in sync', async () => {
    const el = await fixture<CoCombobox>(html`
      <co-combobox label="Fruit" multiple-choice>
        <co-option value="apple">Apple</co-option>
        <co-option value="banana">Banana</co-option>
      </co-combobox>
    `);

    await el.updateComplete;
    expect(el.multipleChoice).to.be.true;
    expect(el.multiple).to.be.true;
  });

  it('uses a non-dialog overlay wrapper for local dropdown positioning', async () => {
    const el = await fixture<CoCombobox>(html`
      <co-combobox label="Fruit">
        <co-option value="apple">Apple</co-option>
        <co-option value="banana">Banana</co-option>
      </co-combobox>
    `);

    await el.updateComplete;
    await new Promise((resolve) => setTimeout(resolve));

    const overlayCtrl = (el as unknown as { _overlayCtrl?: { content?: HTMLElement } })
      ._overlayCtrl;
    expect(overlayCtrl?.content?.tagName).to.equal('DIV');
    expect(overlayCtrl?.content?.hasAttribute('data-overlay-outer-wrapper')).to.be.true;
  });

  it('filters options as the user types', async () => {
    const el = await fixture<CoCombobox>(html`
      <co-combobox label="Fruit" autocomplete="list" match-mode="begin">
        <co-option value="apple">Apple</co-option>
        <co-option value="banana">Banana</co-option>
        <co-option value="carrot">Carrot</co-option>
      </co-combobox>
    `);

    await typeIntoCombobox(el, 'ba');

    const visibleOptions = getOptions(el).filter(
      (option) => option.getAttribute('aria-hidden') !== 'true',
    );
    expect(visibleOptions.map((option) => option.value)).to.deep.equal(['banana']);
  });

  it('selects an option and dispatches co-change', async () => {
    const el = await fixture<CoCombobox>(html`
      <co-combobox label="Fruit">
        <co-option value="apple">Apple</co-option>
        <co-option value="banana">Banana</co-option>
      </co-combobox>
    `);
    const [, banana] = getOptions(el);

    const eventPromise = oneEvent(el, 'co-change') as Promise<CustomEvent>;
    banana.click();
    const event = await eventPromise;

    expect(el.modelValue).to.equal('banana');
    expect(event.detail.modelValue).to.equal('banana');
    expect(event.detail.checkedIndex).to.equal(1);
  });

  it('supports multiple selection through the multiple alias', async () => {
    const el = await fixture<CoCombobox>(html`
      <co-combobox label="Fruit" multiple>
        <co-option value="apple">Apple</co-option>
        <co-option value="banana">Banana</co-option>
        <co-option value="carrot">Carrot</co-option>
      </co-combobox>
    `);

    const [apple, banana] = getOptions(el);
    apple.click();
    banana.click();
    await el.updateComplete;

    expect(el.modelValue).to.deep.equal(['apple', 'banana']);
    expect(el.checkedIndex).to.deep.equal([0, 1]);
  });

  it('supports opt-in custom values', async () => {
    const el = await fixture<CoCombobox>(html`
      <co-combobox label="Fruit" allow-custom-choice>
        <co-option value="apple">Apple</co-option>
        <co-option value="banana">Banana</co-option>
      </co-combobox>
    `);

    await typeIntoCombobox(el, 'Dragonfruit');

    expect(el.requireOptionMatch).to.be.false;
    expect(el.modelValue).to.equal('Dragonfruit');
  });

  it('dispatches co-input with the current input value detail', async () => {
    const el = await fixture<CoCombobox>(html`
      <co-combobox label="Fruit">
        <co-option value="apple">Apple</co-option>
      </co-combobox>
    `);
    const input = getComboboxInput(el);
    input.value = 'ap';

    setTimeout(() => input.dispatchEvent(new Event('input', { bubbles: true, composed: true })));
    const event = (await oneEvent(el, 'co-input')) as CustomEvent;

    expect(event.detail.value).to.equal('ap');
  });

  it('adds aria-required when required', async () => {
    const el = await fixture<CoCombobox>(html`
      <co-combobox label="Fruit" required>
        <co-option value="apple">Apple</co-option>
        <co-option value="banana">Banana</co-option>
      </co-combobox>
    `);

    await el.updateComplete;
    expect(getListboxNode(el).getAttribute('aria-required')).to.equal('true');
  });

  describe('accessibility', () => {
    it('is accessible in default state', async () => {
      const el = await fixture(html`
        <co-combobox label="Fruit">
          <co-option value="apple">Apple</co-option>
          <co-option value="banana">Banana</co-option>
        </co-combobox>
      `);
      await runA11yAudit(el, { component: 'co-combobox', state: 'default' });
    });

    it('is accessible in multiple state', async () => {
      const el = await fixture(html`
        <co-combobox label="Fruit" multiple>
          <co-option value="apple">Apple</co-option>
          <co-option value="banana">Banana</co-option>
        </co-combobox>
      `);
      await runA11yAudit(el, { component: 'co-combobox', state: 'multiple' });
    });

    it('is accessible with custom values enabled', async () => {
      const el = await fixture(html`
        <co-combobox label="Fruit" allow-custom-choice>
          <co-option value="apple">Apple</co-option>
          <co-option value="banana">Banana</co-option>
        </co-combobox>
      `);
      await runA11yAudit(el, { component: 'co-combobox', state: 'custom-choice' });
    });

    it('is accessible when required with feedback', async () => {
      const el = await fixture(html`
        <co-combobox label="Fruit" required shows-feedback-for="error">
          <co-option value="apple">Apple</co-option>
          <co-option value="banana">Banana</co-option>
          <span slot="feedback">Choose a fruit.</span>
        </co-combobox>
      `);
      await runA11yAudit(el, { component: 'co-combobox', state: 'required-feedback' });
    });
  });
});
