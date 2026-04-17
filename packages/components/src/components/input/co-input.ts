import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { LionInput } from '@lion/ui/input.js';
import { cobaltInputStyles } from './co-input.styles.js';

export type InputSize = 'sm' | 'md' | 'lg' | 'xl';

export interface InputValueChangeDetail {
  value: string;
  modelValue: unknown;
}

/**
 * @tag co-input
 * @summary A text input component extending Lion's LionInput with Cobalt theming.
 *
 * @slot label - Label content for the input
 * @slot help-text - Help text shown below the label
 * @slot input - Native input element managed by Lion
 * @slot prefix - Content before the input value
 * @slot suffix - Content after the input value
 * @slot feedback - Validation feedback rendered by Lion
 *
 * @csspart label - The label wrapper
 * @csspart help-text - The help text wrapper
 * @csspart input-group - The input group wrapper
 * @csspart control - The visual input control
 * @csspart input - The native input wrapper
 * @csspart prefix - The prefix slot container
 * @csspart suffix - The suffix slot container
 * @csspart feedback - The validation feedback wrapper
 *
 * @fires co-focus - Emitted when the native input gains focus
 * @fires co-blur - Emitted when the native input loses focus
 * @fires co-input - Emitted when the native input value changes during editing
 * @fires co-change - Emitted when the native input value is committed
 */
@customElement('co-input')
export class CoInput extends LionInput {
  static get styles() {
    return [...super.styles, cobaltInputStyles];
  }

  /** The input size. */
  @property({ reflect: true })
  size: InputSize = 'md';

  /** Applies danger styling without changing validation state. */
  @property({ type: Boolean, reflect: true })
  danger = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('focusin', this._handleFocusIn);
    this.addEventListener('focusout', this._handleFocusOut);
    this.addEventListener('input', this._handleNativeInput);
    this.addEventListener('change', this._handleNativeChange);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('focusin', this._handleFocusIn);
    this.removeEventListener('focusout', this._handleFocusOut);
    this.removeEventListener('input', this._handleNativeInput);
    this.removeEventListener('change', this._handleNativeChange);
  }

  protected _labelTemplate() {
    return html`
      <div part="label" class="form-field__label">
        <slot name="label"></slot>
      </div>
    `;
  }

  protected _helpTextTemplate() {
    return html`
      <small part="help-text" class="form-field__help-text">
        <slot name="help-text"></slot>
      </small>
    `;
  }

  protected _inputGroupTemplate() {
    return html`
      <div part="input-group" class="input-group">
        ${this._inputGroupBeforeTemplate()}
        <div part="control" class="input-group__container">
          ${this._inputGroupPrefixTemplate()} ${this._inputGroupInputTemplate()}
          ${this._inputGroupSuffixTemplate()}
        </div>
        ${this._inputGroupAfterTemplate()}
      </div>
    `;
  }

  protected _inputGroupPrefixTemplate() {
    return !Array.from(this.children).find((child) => child.slot === 'prefix')
      ? nothing
      : html`
          <div part="prefix" class="input-group__prefix">
            <slot name="prefix"></slot>
          </div>
        `;
  }

  protected _inputGroupInputTemplate() {
    return html`
      <div part="input" class="input-group__input">
        <slot name="input"></slot>
      </div>
    `;
  }

  protected _inputGroupSuffixTemplate() {
    return !Array.from(this.children).find((child) => child.slot === 'suffix')
      ? nothing
      : html`
          <div part="suffix" class="input-group__suffix">
            <slot name="suffix"></slot>
          </div>
        `;
  }

  protected _feedbackTemplate() {
    return html`
      <div part="feedback" class="form-field__feedback">
        <slot name="feedback"></slot>
      </div>
    `;
  }

  private _handleFocusIn = () => {
    this.dispatchEvent(new CustomEvent('co-focus', { bubbles: true, composed: true }));
  };

  private _handleFocusOut = () => {
    this.dispatchEvent(new CustomEvent('co-blur', { bubbles: true, composed: true }));
  };

  private _handleNativeInput = (event: Event) => {
    if (event.target !== this._inputNode) return;
    this._dispatchValueEvent('co-input');
  };

  private _handleNativeChange = (event: Event) => {
    if (event.target !== this._inputNode) return;
    this._dispatchValueEvent('co-change');
  };

  private _dispatchValueEvent(type: 'co-input' | 'co-change') {
    this.dispatchEvent(
      new CustomEvent<InputValueChangeDetail>(type, {
        detail: {
          value: this._inputNode.value,
          modelValue: this.modelValue,
        },
        bubbles: true,
        composed: true,
      }),
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'co-input': CoInput;
  }
}
