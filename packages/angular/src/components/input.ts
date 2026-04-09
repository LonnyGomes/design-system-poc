import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  inject,
  type AfterViewInit,
  type OnChanges,
  type OnDestroy,
  type SimpleChanges,
} from '@angular/core';
import type { InputSize, InputType } from '@cobalt/components/input';
import '@cobalt/components/input';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'co-input',
  standalone: true,
})
export class CoInput implements AfterViewInit, OnChanges, OnDestroy {
  @Input() label = '';
  @Input() helperText = '';
  @Input() errorText = '';
  @Input() size: InputSize = 'md';
  @Input() type: InputType = 'text';
  @Input() value = '';
  @Input() placeholder = '';
  @Input() name = '';
  @Input() autocomplete?: string;
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() required = false;
  @Input() readOnly = false;

  @Output() readonly coFocus = new EventEmitter<CustomEvent>();
  @Output() readonly coBlur = new EventEmitter<CustomEvent>();

  private el = inject(ElementRef).nativeElement;
  private hasViewInitialized = false;

  ngAfterViewInit(): void {
    this.hasViewInitialized = true;
    this.syncToElement();
    this.el.addEventListener('co-focus', this.handleFocus);
    this.el.addEventListener('co-blur', this.handleBlur);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.hasViewInitialized) {
      return;
    }

    const currentValues = Object.fromEntries(
      Object.entries(changes).map(([key, change]) => [key, change.currentValue]),
    );
    this.syncToElement(currentValues);
  }

  ngOnDestroy(): void {
    this.el.removeEventListener('co-focus', this.handleFocus);
    this.el.removeEventListener('co-blur', this.handleBlur);
  }

  private syncToElement(overrides: Record<string, unknown> = {}): void {
    const apply = () => {
      const el = this.el as any;
      el.label = overrides.label ?? this.label;
      el.helperText = overrides.helperText ?? this.helperText;
      el.errorText = overrides.errorText ?? this.errorText;
      el.size = overrides.size ?? this.size;
      el.type = overrides.type ?? this.type;
      el.value = overrides.value ?? this.value;
      el.placeholder = overrides.placeholder ?? this.placeholder;
      el.name = overrides.name ?? this.name;
      el.disabled = overrides.disabled ?? this.disabled;
      el.invalid = overrides.invalid ?? this.invalid;
      el.required = overrides.required ?? this.required;
      el.readOnly = overrides.readOnly ?? this.readOnly;
      const autocomplete = overrides.autocomplete ?? this.autocomplete;
      if (autocomplete !== undefined) {
        el.autocomplete = autocomplete;
      }
    };

    if (customElements.get('co-input')) {
      apply();
      return;
    }

    void customElements.whenDefined('co-input').then(apply);
  }

  private handleFocus = (e: Event) => {
    this.coFocus.emit(e as CustomEvent);
  };

  private handleBlur = (e: Event) => {
    this.coBlur.emit(e as CustomEvent);
  };
}
