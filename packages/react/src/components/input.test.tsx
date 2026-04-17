import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { CoInput } from './input.js';

describe('React CoInput wrapper', () => {
  it('renders a co-input element', () => {
    const { container } = render(<CoInput label="Name" />);
    const el = container.querySelector('co-input');
    expect(el).not.toBeNull();
  });

  it('passes aria-describedby to the custom element', () => {
    const { container } = render(<CoInput label="Email" aria-describedby="email-help" />);
    const el = container.querySelector('co-input');
    expect(el?.getAttribute('aria-describedby')).toBe('email-help');
  });

  it('forwards slotted prefix content', () => {
    const { container } = render(
      <CoInput label="Search">
        <span slot="prefix">icon</span>
      </CoInput>,
    );
    const prefix = container.querySelector('[slot="prefix"]');
    expect(prefix).not.toBeNull();
    expect(prefix?.textContent).toBe('icon');
  });
});
