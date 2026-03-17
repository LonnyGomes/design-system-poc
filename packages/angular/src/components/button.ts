import { Directive, ElementRef, effect, inject, input, output, type OnInit } from '@angular/core';
import type { ButtonVariant, ButtonSize } from '@cobalt/components/button';
import '@cobalt/components/button';

/**
 * Angular directive wrapping the `<co-button>` web component.
 *
 * @example
 * ```html
 * <co-button variant="primary" size="md" (coFocus)="onFocus()">
 *   Save changes
 * </co-button>
 * ```
 */
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'co-button',
  standalone: true,
})
export class CoButtonDirective implements OnInit {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly type = input<'submit' | 'reset' | 'button'>('button');
  readonly href = input<string | undefined>();
  readonly target = input<'_blank' | '_self' | '_parent' | '_top' | undefined>();

  readonly coFocus = output<CustomEvent>();
  readonly coBlur = output<CustomEvent>();

  private el = inject(ElementRef).nativeElement;

  constructor() {
    effect(() => {
      const el = this.el as any;
      el.variant = this.variant();
      el.size = this.size();
      el.disabled = this.disabled();
      el.loading = this.loading();
      el.type = this.type();
      const href = this.href();
      if (href !== undefined) el.href = href;
      const target = this.target();
      if (target !== undefined) el.target = target;
    });
  }

  ngOnInit(): void {
    this.el.addEventListener('co-focus', (e: Event) => {
      this.coFocus.emit(e as CustomEvent);
    });
    this.el.addEventListener('co-blur', (e: Event) => {
      this.coBlur.emit(e as CustomEvent);
    });
  }
}
