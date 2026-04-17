import React from 'react';
import { createComponent } from '@lit/react';
import { CoInput as CoInputElement } from '@cobalt/components/input';

export const CoInput = createComponent({
  tagName: 'co-input',
  elementClass: CoInputElement,
  react: React,
  events: {
    onCoFocus: 'co-focus',
    onCoBlur: 'co-blur',
    onCoInput: 'co-input',
    onCoChange: 'co-change',
  },
});
