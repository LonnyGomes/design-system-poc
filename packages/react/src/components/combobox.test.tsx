import { afterEach, describe, it, expect } from 'vitest';
import { cleanup, render, waitFor } from '@testing-library/react';
import { CoCombobox, CoOption } from './combobox.js';

afterEach(async () => {
  cleanup();
  await new Promise((resolve) => setTimeout(resolve, 20));
});

describe('React CoCombobox wrapper', () => {
  it('renders co-combobox and co-option elements', () => {
    const { container } = render(
      <CoCombobox label="Fruit">
        <CoOption value="apple">Apple</CoOption>
      </CoCombobox>,
    );

    expect(container.querySelector('co-combobox')).not.toBeNull();
    expect(container.querySelector('co-option')).not.toBeNull();
  });

  it('passes combobox props to the custom element', async () => {
    const { container } = render(
      <CoCombobox label="Fruit" autocomplete="list" matchMode="begin" multiple allowCustomChoice>
        <CoOption value="apple">Apple</CoOption>
      </CoCombobox>,
    );
    const el = container.querySelector('co-combobox') as any;

    await waitFor(() => {
      expect(el.autocomplete).toBe('list');
      expect(el.matchMode).toBe('begin');
      expect(el.multiple).toBe(true);
      expect(el.allowCustomChoice).toBe(true);
    });
  });
});
