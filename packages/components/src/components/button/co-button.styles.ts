// Auto-generated from .styles.css — do not edit directly
import { css } from 'lit';

export const cobaltButtonStyles = css`
  /* ── Base ── */
  :host {
    display: inline-block;
    box-sizing: border-box;
    padding: 0;
    font-family: var(--co-font-family-sans);
    font-size: var(--co-font-size-md);
    font-weight: var(--co-font-weight-medium);
    line-height: var(--co-font-line-height-tight);
    border-radius: var(--co-shape-radius-md);
    border: var(--co-shape-border-width-thin) solid transparent;
    cursor: pointer;
    transition:
      background var(--co-motion-duration-fast) var(--co-motion-easing-default),
      color var(--co-motion-duration-fast) var(--co-motion-easing-default),
      border-color var(--co-motion-duration-fast) var(--co-motion-easing-default),
      box-shadow var(--co-motion-duration-fast) var(--co-motion-easing-default);
  }

  /* Padding is on the inner element so external resets (e.g. * { padding: 0 })
     cannot override it — light DOM styles always beat :host rules. */
  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--co-space-2);
    padding: var(--co-space-2) var(--co-space-4);
  }

  /* ── Sizes ── */
  :host([size='sm']) {
    font-size: var(--co-font-size-sm);
  }
  :host([size='sm']) .button {
    padding: var(--co-space-1) var(--co-space-3);
  }

  :host([size='lg']) {
    font-size: var(--co-font-size-lg);
  }
  :host([size='lg']) .button {
    padding: var(--co-space-3) var(--co-space-6);
  }

  /* ── Primary variant (default) ── */
  :host,
  :host([variant='primary']) {
    background: var(--co-color-interactive-default);
    color: var(--co-color-text-on-primary);
  }
  :host([variant='primary']:hover),
  :host(:not([variant]):hover) {
    background: var(--co-color-interactive-hover);
  }
  :host([variant='primary']:active),
  :host(:not([variant]):active) {
    background: var(--co-color-interactive-active);
  }

  /* ── Secondary variant ── */
  :host([variant='secondary']) {
    background: var(--co-color-surface-default);
    color: var(--co-color-text-default);
    border-color: var(--co-color-border-default);
  }
  :host([variant='secondary']:hover) {
    background: var(--co-color-surface-raised);
    border-color: var(--co-color-border-strong);
  }
  :host([variant='secondary']:active) {
    background: var(--co-color-surface-sunken);
  }

  /* ── Danger variant ── */
  :host([variant='danger']) {
    background: var(--co-color-interactive-danger-default);
    color: var(--co-color-text-on-primary);
  }
  :host([variant='danger']:hover) {
    background: var(--co-color-interactive-danger-hover);
  }
  :host([variant='danger']:active) {
    background: var(--co-color-interactive-danger-active);
  }

  /* ── Ghost variant ── */
  :host([variant='ghost']) {
    background: transparent;
    color: var(--co-color-text-link);
  }
  :host([variant='ghost']:hover) {
    background: var(--co-color-interactive-subtle-hover);
  }
  :host([variant='ghost']:active) {
    background: var(--co-color-interactive-subtle-active);
  }

  /* ── Focus ── */
  :host(:focus-visible) {
    outline: var(--co-shape-border-width-thick) solid var(--co-color-border-focus);
    outline-offset: 2px;
  }

  /* ── Disabled ── */
  :host([disabled]) {
    opacity: var(--co-opacity-disabled);
    cursor: not-allowed;
    pointer-events: none;
  }

  /* ── Loading ── */
  :host([loading]) {
    cursor: wait;
    pointer-events: none;
  }

  .spinner {
    width: 1em;
    height: 1em;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: var(--co-shape-radius-full);
    animation: co-spin 600ms linear infinite;
  }

  @keyframes co-spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
