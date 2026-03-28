import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { getIcon, customIconNames } from '@cobalt/icons';
import { cobaltIconStyles } from './co-icon.styles.js';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg';

/**
 * @tag co-icon
 * @summary Renders a Material Symbols icon from the @cobalt/icons registry.
 *
 * @csspart svg - The inner SVG element
 */
@customElement('co-icon')
export class CoIcon extends LitElement {
  static override styles = [cobaltIconStyles];

  /** The icon name in kebab-case (e.g. "arrow-forward"). */
  @property({ reflect: true })
  name = '';

  /** The icon size. */
  @property({ reflect: true })
  size: IconSize = 'md';

  /** Whether to use the filled version of the icon. */
  @property({ type: Boolean, reflect: true })
  fill = false;

  /** Accessible label. When set, the icon is treated as informative (role="img"). */
  @property()
  label?: string;

  override render() {
    const svgContent = getIcon(this.name, 'rounded', this.fill);

    if (!svgContent) return nothing;

    const isDecorative = !this.label;
    const viewBox = customIconNames.has(this.name) ? '0 0 24 24' : '0 -960 960 960';

    return html`
      <svg
        part="svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox=${viewBox}
        fill="currentColor"
        role=${isDecorative ? 'presentation' : 'img'}
        aria-hidden=${isDecorative ? 'true' : 'false'}
        aria-label=${this.label ?? nothing}
      >
        ${unsafeSVG(svgContent)}
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'co-icon': CoIcon;
  }
}
