import React from 'react';
import { createComponent } from '@lit/react';
import { CoButton } from '@cobalt/components/button';

export const Button = createComponent({
  tagName: 'co-button',
  elementClass: CoButton,
  react: React,
  events: {
    onCoFocus: 'co-focus',
    onCoBlur: 'co-blur',
  },
});
