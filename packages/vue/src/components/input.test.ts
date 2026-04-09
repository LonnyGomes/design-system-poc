import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { CoInput } from './input.js';

describe('Vue CoInput wrapper', () => {
  it('renders a co-input element', () => {
    const wrapper = mount(CoInput, { props: { label: 'Email' } });
    expect(wrapper.find('co-input').exists()).toBe(true);
  });

  it('sets label and helper text properties on the element', () => {
    const wrapper = mount(CoInput, {
      props: { label: 'Email', helperText: 'Use your work email.' },
    });
    const el = wrapper.find('co-input').element as any;
    expect(el.label).toBe('Email');
    expect(el.helperText).toBe('Use your work email.');
  });

  it('sets value and invalid properties on the element', () => {
    const wrapper = mount(CoInput, {
      props: { value: 'bad-email', invalid: true, errorText: 'Enter a valid email.' },
    });
    const el = wrapper.find('co-input').element as any;
    expect(el.value).toBe('bad-email');
    expect(el.invalid).toBe(true);
    expect(el.errorText).toBe('Enter a valid email.');
  });

  it('preserves aria-* attrs set by consumer', () => {
    const wrapper = mount(CoInput, {
      attrs: { 'aria-label': 'Search site' },
      props: { label: 'Search' },
    });
    expect(wrapper.find('co-input').attributes('aria-label')).toBe('Search site');
  });
});
