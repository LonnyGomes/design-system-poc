import '@cobalt/components/listbox';
import type {
  CoListbox as CoListboxElement,
  CoOption as CoOptionElement,
} from '@cobalt/components/listbox';
import { createCobaltComponent } from '../create-cobalt-component.js';

export const CoListbox = createCobaltComponent<CoListboxElement>({
  tagName: 'co-listbox',
  events: {
    onCoChange: 'co-change',
  },
});

export const CoOption = createCobaltComponent<CoOptionElement>({
  tagName: 'co-option',
});
