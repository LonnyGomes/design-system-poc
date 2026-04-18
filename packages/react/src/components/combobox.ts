import '@cobalt/components/combobox';
import type { CoCombobox as CoComboboxElement } from '@cobalt/components/combobox';
import { createCobaltComponent } from '../create-cobalt-component.js';

export { CoOption } from './option.js';

export const CoCombobox = createCobaltComponent<CoComboboxElement>({
  tagName: 'co-combobox',
  events: {
    onCoFocus: 'co-focus',
    onCoBlur: 'co-blur',
    onCoInput: 'co-input',
    onCoChange: 'co-change',
  },
});
