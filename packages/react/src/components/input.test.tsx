import { describe, it, expect } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { CoInput } from './input.js';

describe('React CoInput wrapper', () => {
  it('renders a co-input element', () => {
    const { container } = render(<CoInput label="Email" />);
    const el = container.querySelector('co-input');
    expect(el).not.toBeNull();
  });

  it('passes label and helper text properties to the custom element', async () => {
    const { container } = render(
      <CoInput label="Email" helperText="Use your work email." placeholder="name@example.com" />,
    );
    const el = container.querySelector('co-input') as any;
    await waitFor(() => {
      expect(el?.label).toBe('Email');
      expect(el?.helperText).toBe('Use your work email.');
      expect(el?.placeholder).toBe('name@example.com');
    });
  });

  it('passes invalid and error text to the custom element', async () => {
    const { container } = render(
      <CoInput invalid errorText="Enter a valid email address." value="bad-email" />,
    );
    const el = container.querySelector('co-input') as any;
    await waitFor(() => {
      expect(el?.invalid).toBe(true);
      expect(el?.errorText).toBe('Enter a valid email address.');
      expect(el?.value).toBe('bad-email');
    });
  });

  it('forwards prefix and suffix slots as children', () => {
    const { container } = render(
      <CoInput label="Search">
        <span slot="prefix">icon</span>
        <span slot="suffix">⌘K</span>
      </CoInput>,
    );
    expect(container.querySelector('[slot="prefix"]')?.textContent).toBe('icon');
    expect(container.querySelector('[slot="suffix"]')?.textContent).toBe('⌘K');
  });

  it('passes aria-* attributes to the custom element', () => {
    const { container } = render(<CoInput label="Search" aria-label="Search site" />);
    const el = container.querySelector('co-input');
    expect(el?.getAttribute('aria-label')).toBe('Search site');
  });
});
