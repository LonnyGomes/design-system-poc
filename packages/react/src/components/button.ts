import React from 'react';
import { createComponent } from '@lit/react';
import { CbButton } from '@cobalt/components/button';

export const Button = createComponent({
  tagName: 'cb-button',
  elementClass: CbButton,
  react: React,
  events: {
    onCbFocus: 'cb-focus',
    onCbBlur: 'cb-blur',
  },
});
