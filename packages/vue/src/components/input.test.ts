import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { CoInput } from './input.js';

describe('Vue CoInput wrapper', () => {
  it('renders a co-input element', () => {
    const wrapper = mount(CoInput, { props: { label: 'Name' } });
    expect(wrapper.find('co-input').exists()).toBe(true);
  });

  it('sets size property on the element', () => {
    const wrapper = mount(CoInput, { props: { label: 'Name', size: 'lg' } });
    const el = wrapper.find('co-input').element as any;
    expect(el.size).toBe('lg');
  });

  it('sets danger property when prop is true', () => {
    const wrapper = mount(CoInput, { props: { label: 'Email', danger: true } });
    const el = wrapper.find('co-input').element as any;
    expect(el.danger).toBe(true);
  });

  it('sets disabled property when prop is true', () => {
    const wrapper = mount(CoInput, { props: { label: 'Name', disabled: true } });
    const el = wrapper.find('co-input').element as any;
    expect(el.disabled).toBe(true);
  });

  it('sets readonly property when prop is true', () => {
    const wrapper = mount(CoInput, { props: { label: 'Account id', readOnly: true } });
    const el = wrapper.find('co-input').element as any;
    expect(el.readOnly).toBe(true);
  });

  it('sets label and placeholder properties', () => {
    const wrapper = mount(CoInput, {
      props: { label: 'Email', placeholder: 'name@example.com' },
    });
    const el = wrapper.find('co-input').element as any;
    expect(el.label).toBe('Email');
    expect(el.placeholder).toBe('name@example.com');
  });

  it('renders slotted content', () => {
    const wrapper = mount(CoInput, {
      props: { label: 'Search' },
      slots: { default: '<span slot="prefix">icon</span>' },
    });
    expect(wrapper.find('[slot="prefix"]').text()).toBe('icon');
  });
});
