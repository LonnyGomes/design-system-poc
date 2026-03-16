import { describe, it, expect, beforeEach } from 'vitest';
import { CoButtonDirective } from './button.js';
import { ElementRef } from '@angular/core';

/**
 * These tests validate that the Angular directive correctly syncs
 * @Input properties to the native custom element. Since the directive
 * operates directly on the DOM element, we can test it without TestBed
 * by providing a mock ElementRef.
 */
describe('Angular CoButtonDirective', () => {
  let el: HTMLElement;
  let directive: CoButtonDirective;

  beforeEach(() => {
    el = document.createElement('co-button');
    directive = new CoButtonDirective(new ElementRef(el));
  });

  it('syncs default properties on init', () => {
    directive.ngOnInit();
    expect((el as any).variant).toBe('primary');
    expect((el as any).size).toBe('md');
    expect((el as any).disabled).toBe(false);
    expect((el as any).loading).toBe(false);
  });

  it('syncs variant property to the element', () => {
    directive.variant = 'danger';
    directive.ngOnInit();
    expect((el as any).variant).toBe('danger');
  });

  it('syncs size property to the element', () => {
    directive.size = 'lg';
    directive.ngOnInit();
    expect((el as any).size).toBe('lg');
  });

  it('syncs disabled property to the element', () => {
    directive.disabled = true;
    directive.ngOnInit();
    expect((el as any).disabled).toBe(true);
  });

  it('syncs loading property to the element', () => {
    directive.loading = true;
    directive.ngOnInit();
    expect((el as any).loading).toBe(true);
  });

  it('syncs href property to the element', () => {
    directive.href = 'https://example.com';
    directive.ngOnInit();
    expect((el as any).href).toBe('https://example.com');
  });

  it('syncs properties on changes', () => {
    directive.ngOnInit();
    directive.variant = 'ghost';
    directive.ngOnChanges({});
    expect((el as any).variant).toBe('ghost');
  });

  it('registers co-focus event listener', () => {
    let emitted = false;
    directive.coFocus.subscribe(() => {
      emitted = true;
    });
    directive.ngOnInit();
    el.dispatchEvent(new CustomEvent('co-focus'));
    expect(emitted).toBe(true);
  });

  it('registers co-blur event listener', () => {
    let emitted = false;
    directive.coBlur.subscribe(() => {
      emitted = true;
    });
    directive.ngOnInit();
    el.dispatchEvent(new CustomEvent('co-blur'));
    expect(emitted).toBe(true);
  });

  it('preserves aria-label set on the element', () => {
    el.setAttribute('aria-label', 'Close');
    directive.ngOnInit();
    expect(el.getAttribute('aria-label')).toBe('Close');
  });
});
