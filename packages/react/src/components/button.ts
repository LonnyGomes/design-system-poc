import React from 'react';
import { createComponent } from '@lit/react';
import { CoButton } from '@cobalt/components/button';

export const CoButton = createComponent({
  tagName: 'co-button',
  elementClass: CoButton,
  react: React,
  events: {
    onCoFocus: 'co-focus',
    onCoBlur: 'co-blur',
  },
});
