import React from 'react';

type EventMap = Record<string, string>;

type CobaltReactProps<T extends HTMLElement> = React.HTMLAttributes<T> &
  Partial<T> & {
    children?: React.ReactNode;
    [key: string]: unknown;
  };

const attributeProps = new Set([
  'accessKey',
  'aria-activedescendant',
  'aria-atomic',
  'aria-autocomplete',
  'aria-busy',
  'aria-checked',
  'aria-colcount',
  'aria-colindex',
  'aria-colspan',
  'aria-controls',
  'aria-current',
  'aria-describedby',
  'aria-description',
  'aria-details',
  'aria-disabled',
  'aria-errormessage',
  'aria-expanded',
  'aria-haspopup',
  'aria-hidden',
  'aria-invalid',
  'aria-keyshortcuts',
  'aria-label',
  'aria-labelledby',
  'aria-level',
  'aria-live',
  'aria-modal',
  'aria-multiline',
  'aria-multiselectable',
  'aria-orientation',
  'aria-owns',
  'aria-placeholder',
  'aria-posinset',
  'aria-pressed',
  'aria-readonly',
  'aria-required',
  'aria-roledescription',
  'aria-rowcount',
  'aria-rowindex',
  'aria-rowspan',
  'aria-selected',
  'aria-setsize',
  'aria-sort',
  'aria-valuemax',
  'aria-valuemin',
  'aria-valuenow',
  'aria-valuetext',
  'className',
  'dir',
  'draggable',
  'hidden',
  'id',
  'lang',
  'role',
  'slot',
  'style',
  'tabIndex',
  'title',
]);

function isAttributeProp(name: string) {
  return attributeProps.has(name) || name.startsWith('data-');
}

export function createCobaltComponent<T extends HTMLElement>({
  tagName,
  events,
  displayName,
}: {
  tagName: string;
  events?: EventMap;
  displayName?: string;
}) {
  const eventProps = new Set(Object.keys(events ?? {}));

  const Component = React.forwardRef<T, CobaltReactProps<T>>((props, forwardedRef) => {
    const elementRef = React.useRef<T | null>(null);
    const previousProps = React.useRef(new Map<string, unknown>());

    const attrs: Record<string, unknown> = {};
    const elementProps: Record<string, unknown> = {};

    for (const [name, value] of Object.entries(props)) {
      if (name === 'children' || name === 'ref') continue;

      if (eventProps.has(name) || !isAttributeProp(name)) {
        elementProps[name] = value;
        continue;
      }

      attrs[name === 'className' ? 'className' : name] = value;
    }

    React.useLayoutEffect(() => {
      const el = elementRef.current;
      if (!el) return;

      const nextProps = new Map<string, unknown>();

      for (const [name, value] of Object.entries(elementProps)) {
        const eventName = events?.[name];
        const previousValue = previousProps.current.get(name);

        if (eventName) {
          if (previousValue) {
            el.removeEventListener(eventName, previousValue as EventListener);
          }

          if (typeof value === 'function') {
            const listener = (event: Event) => value(event);
            el.addEventListener(eventName, listener);
            nextProps.set(name, listener);
          }
          continue;
        }

        (el as Record<string, unknown>)[name] = value;
        nextProps.set(name, value);
      }

      for (const [name, previousValue] of previousProps.current) {
        if (nextProps.has(name)) continue;

        const eventName = events?.[name];
        if (eventName) {
          el.removeEventListener(eventName, previousValue as EventListener);
        } else {
          (el as Record<string, unknown>)[name] = undefined;
        }
      }

      previousProps.current = nextProps;
    });

    const setRef = React.useCallback(
      (el: T | null) => {
        elementRef.current = el;

        if (typeof forwardedRef === 'function') {
          forwardedRef(el);
          return;
        }

        if (forwardedRef) {
          forwardedRef.current = el;
        }
      },
      [forwardedRef],
    );

    return React.createElement(tagName, { ...attrs, ref: setRef }, props.children);
  });

  Component.displayName = displayName ?? tagName;
  return Component;
}
