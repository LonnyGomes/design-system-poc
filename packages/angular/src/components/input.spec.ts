import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CoInput } from './input.js';

@Component({
  standalone: true,
  imports: [CoInput],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <co-input
      [label]="label"
      [helperText]="helperText"
      [errorText]="errorText"
      [size]="size"
      [type]="type"
      [value]="value"
      [placeholder]="placeholder"
      [name]="name"
      [disabled]="disabled"
      [invalid]="invalid"
      [required]="required"
      [readOnly]="readOnly"
      (coFocus)="onFocus($event)"
      (coBlur)="onBlur($event)"
    ></co-input>
  `,
})
class TestHostComponent {
  label = 'Email';
  helperText = 'Use your work email.';
  errorText = '';
  size: 'sm' | 'md' | 'lg' = 'md';
  type: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' = 'text';
  value = '';
  placeholder = 'name@example.com';
  name = 'email';
  disabled = false;
  invalid = false;
  required = false;
  readOnly = false;
  focusEvent?: CustomEvent;
  blurEvent?: CustomEvent;

  onFocus(e: CustomEvent) {
    this.focusEvent = e;
  }

  onBlur(e: CustomEvent) {
    this.blurEvent = e;
  }
}

describe('Angular CoInput', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
  let el: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.nativeElement.querySelector('co-input');
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('syncs default properties on init', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    expect(el.label).toBe('Email');
    expect(el.helperText).toBe('Use your work email.');
    expect(el.placeholder).toBe('name@example.com');
  });

  it('syncs updated values to the element', async () => {
    host.value = 'name@example.com';
    host.invalid = true;
    host.errorText = 'Enter a valid email address.';
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(el.value).toBe('name@example.com');
    expect(el.invalid).toBe(true);
    expect(el.errorText).toBe('Enter a valid email address.');
  });

  it('syncs readOnly property to the element', async () => {
    host.readOnly = true;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(el.readOnly).toBe(true);
  });

  it('emits coFocus when co-focus event fires', () => {
    const directive = fixture.debugElement.query(By.directive(CoInput)).injector.get(CoInput);
    let emitted: CustomEvent | undefined;
    directive.coFocus.subscribe((e: CustomEvent) => {
      emitted = e;
    });
    el.dispatchEvent(new CustomEvent('co-focus'));
    expect(emitted).toBeInstanceOf(CustomEvent);
  });

  it('emits coBlur when co-blur event fires', () => {
    const directive = fixture.debugElement.query(By.directive(CoInput)).injector.get(CoInput);
    let emitted: CustomEvent | undefined;
    directive.coBlur.subscribe((e: CustomEvent) => {
      emitted = e;
    });
    el.dispatchEvent(new CustomEvent('co-blur'));
    expect(emitted).toBeInstanceOf(CustomEvent);
  });
});
