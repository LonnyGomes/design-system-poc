import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

const variantMap: Record<ButtonVariant, string> = {
  primary: 'primary',
  secondary: 'default',
  danger: 'danger',
  ghost: 'text',
};

const sizeMap: Record<ButtonSize, string> = {
  sm: 'small',
  md: 'medium',
  lg: 'large',
};

/**
 * @tag co-button
 * @summary A button component wrapping Shoelace's sl-button with Cobalt theming.
 *
 * @slot - Default slot for button content
 * @slot prefix - Content before the label
 * @slot suffix - Content after the label
 *
 * @csspart base - The underlying sl-button's base part
 * @csspart label - The button label
 * @csspart prefix - The prefix container
 * @csspart suffix - The suffix container
 *
 * @fires co-focus - Emitted when the button gains focus
 * @fires co-blur - Emitted when the button loses focus
 */
@customElement('co-button')
export class CoButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    :host([disabled]) {
      pointer-events: none;
    }
  `;

  /** The button variant. */
  @property({ reflect: true })
  variant: ButtonVariant = 'primary';

  /** The button size. */
  @property({ reflect: true })
  size: ButtonSize = 'md';

  /** Disables the button. */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Shows a loading spinner. */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /** The button type (submit, reset, button). */
  @property()
  type: 'submit' | 'reset' | 'button' = 'button';

  /** An optional href to render the button as a link. */
  @property()
  href?: string;

  /** Where to open the link (when href is set). */
  @property()
  target?: '_blank' | '_self' | '_parent' | '_top';

  private get _slVariant(): string {
    return variantMap[this.variant] ?? 'primary';
  }

  private get _slSize(): string {
    return sizeMap[this.size] ?? 'medium';
  }

  private _handleFocus() {
    this.dispatchEvent(new CustomEvent('co-focus', { bubbles: true, composed: true }));
  }

  private _handleBlur() {
    this.dispatchEvent(new CustomEvent('co-blur', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <sl-button
        variant=${this._slVariant}
        size=${this._slSize}
        ?disabled=${this.disabled}
        ?loading=${this.loading}
        type=${this.type}
        href=${ifDefined(this.href)}
        target=${ifDefined(this.target)}
        exportparts="base, label, prefix, suffix"
        @sl-focus=${this._handleFocus}
        @sl-blur=${this._handleBlur}
      >
        <slot name="prefix" slot="prefix"></slot>
        <slot></slot>
        <slot name="suffix" slot="suffix"></slot>
      </sl-button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'co-button': CoButton;
  }
}
