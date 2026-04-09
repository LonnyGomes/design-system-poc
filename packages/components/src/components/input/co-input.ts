import { LitElement, html, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { cobaltInputStyles } from './co-input.styles.js';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputType = 'text' | 'email' | 'password' | 'search' | 'tel' | 'url';
type UpgradableInputProperty =
  | 'size'
  | 'type'
  | 'label'
  | 'helperText'
  | 'errorText'
  | 'value'
  | 'placeholder'
  | 'name'
  | 'autocomplete'
  | 'disabled'
  | 'invalid'
  | 'required'
  | 'readOnly';

let inputIdCounter = 0;

/**
 * @tag co-input
 * @summary A styled text input with built-in label, message, and affix slots.
 *
 * @slot prefix - Content before the text field value, such as an icon.
 * @slot suffix - Content after the text field value, such as status or action affordances.
 *
 * @csspart label - The field label.
 * @csspart base - The input surface wrapper.
 * @csspart input - The native input element.
 * @csspart prefix - The prefix slot wrapper.
 * @csspart suffix - The suffix slot wrapper.
 * @csspart message - The helper or error text.
 *
 * @fires co-focus - Emitted when the input gains focus.
 * @fires co-blur - Emitted when the input loses focus.
 */
@customElement('co-input')
export class CoInput extends LitElement {
  static override styles = [cobaltInputStyles];

  @property({ reflect: true })
  size!: InputSize;

  @property({ reflect: true })
  type!: InputType;

  @property()
  label!: string;

  @property({ attribute: 'helper-text' })
  helperText!: string;

  @property({ attribute: 'error-text' })
  errorText!: string;

  @property()
  value!: string;

  @property()
  placeholder!: string;

  @property()
  name!: string;

  @property()
  autocomplete?: string;

  @property({ type: Boolean, reflect: true })
  disabled!: boolean;

  @property({ type: Boolean, reflect: true })
  invalid!: boolean;

  @property({ type: Boolean, reflect: true })
  required!: boolean;

  @property({ type: Boolean, attribute: 'readonly', reflect: true })
  readOnly!: boolean;

  @state()
  private hasPrefix = false;

  @state()
  private hasSuffix = false;

  @query('input')
  private inputNode?: HTMLInputElement;

  private readonly inputId = `co-input-${++inputIdCounter}`;

  constructor() {
    super();

    for (const prop of [
      'size',
      'type',
      'label',
      'helperText',
      'errorText',
      'value',
      'placeholder',
      'name',
      'autocomplete',
      'disabled',
      'invalid',
      'required',
      'readOnly',
    ] as const satisfies readonly UpgradableInputProperty[]) {
      this.upgradeProperty(prop);
    }

    this.size ??= 'md';
    this.type ??= 'text';
    this.label ??= '';
    this.helperText ??= '';
    this.errorText ??= '';
    this.value ??= '';
    this.placeholder ??= '';
    this.name ??= '';
    this.disabled ??= false;
    this.invalid ??= false;
    this.required ??= false;
    this.readOnly ??= false;
  }

  private upgradeProperty(prop: UpgradableInputProperty): void {
    const instance = this as unknown as Record<UpgradableInputProperty, unknown>;

    if (!Object.prototype.hasOwnProperty.call(instance, prop)) {
      return;
    }

    const value = instance[prop];
    delete instance[prop];
    instance[prop] = value;
  }

  focus(options?: FocusOptions): void {
    this.inputNode?.focus(options);
  }

  select(): void {
    this.inputNode?.select();
  }

  protected override updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('value') && this.inputNode && this.inputNode.value !== this.value) {
      this.inputNode.value = this.value;
    }
  }

  private get describedById(): string | undefined {
    return this.messageText ? `${this.inputId}-message` : undefined;
  }

  private get messageText(): string {
    if (this.invalid && this.errorText) {
      return this.errorText;
    }

    return this.helperText;
  }

  private handleInput(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
  }

  private handleFocus = () => {
    this.dispatchEvent(new CustomEvent('co-focus', { bubbles: true, composed: true }));
  };

  private handleBlur = () => {
    this.dispatchEvent(new CustomEvent('co-blur', { bubbles: true, composed: true }));
  };

  private handleAffixSlotChange(side: 'prefix' | 'suffix', event: Event): void {
    const slot = event.target as HTMLSlotElement;
    const hasContent = slot
      .assignedNodes({ flatten: true })
      .some((node) => node.nodeType !== Node.TEXT_NODE || node.textContent?.trim());

    if (side === 'prefix') {
      this.hasPrefix = hasContent;
      return;
    }

    this.hasSuffix = hasContent;
  }

  override render() {
    const messageText = this.messageText;

    return html`
      <div class="input-shell">
        ${this.label
          ? html`<label part="label" class="label" for=${this.inputId}>
              ${this.label}
              ${this.required
                ? html`<span class="required-indicator" aria-hidden="true">*</span>`
                : nothing}
            </label>`
          : nothing}

        <div part="base" class="field">
          <span part="prefix" class="affix" ?hidden=${!this.hasPrefix}>
            <slot
              name="prefix"
              @slotchange=${(event: Event) => this.handleAffixSlotChange('prefix', event)}
            ></slot>
          </span>

          <input
            id=${this.inputId}
            part="input"
            class="input"
            .value=${this.value}
            type=${this.type}
            placeholder=${this.placeholder}
            name=${this.name}
            autocomplete=${ifDefined(this.autocomplete)}
            ?disabled=${this.disabled}
            ?readonly=${this.readOnly}
            ?required=${this.required}
            aria-invalid=${this.invalid ? 'true' : 'false'}
            aria-describedby=${ifDefined(this.describedById)}
            @input=${this.handleInput}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
          />

          <span part="suffix" class="affix" ?hidden=${!this.hasSuffix}>
            <slot
              name="suffix"
              @slotchange=${(event: Event) => this.handleAffixSlotChange('suffix', event)}
            ></slot>
          </span>
        </div>

        ${messageText
          ? html`<div
              id=${this.describedById!}
              part="message"
              class="message"
              role=${ifDefined(this.invalid && this.errorText ? 'alert' : undefined)}
            >
              ${messageText}
            </div>`
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'co-input': CoInput;
  }
}
