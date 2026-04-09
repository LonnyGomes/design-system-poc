import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  type ReactNode,
} from 'react';
import type { CoInput as CoInputElement, InputSize, InputType } from '@cobalt/components/input';
import '@cobalt/components/input';

export interface CoInputProps extends Omit<
  React.HTMLAttributes<CoInputElement>,
  'onBlur' | 'onFocus' | 'children'
> {
  label?: string;
  helperText?: string;
  errorText?: string;
  size?: InputSize;
  type?: InputType;
  value?: string;
  placeholder?: string;
  name?: string;
  autocomplete?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  readOnly?: boolean;
  children?: ReactNode;
  onCoFocus?: (event: Event) => void;
  onCoBlur?: (event: Event) => void;
}

export const CoInput = forwardRef<CoInputElement, CoInputProps>(function CoInput(
  {
    label = '',
    helperText = '',
    errorText = '',
    size = 'md',
    type = 'text',
    value = '',
    placeholder = '',
    name = '',
    autocomplete,
    disabled = false,
    invalid = false,
    required = false,
    readOnly = false,
    onCoFocus,
    onCoBlur,
    children,
    ...rest
  },
  forwardedRef,
) {
  const innerRef = useRef<CoInputElement>(null);

  useImperativeHandle(forwardedRef, () => innerRef.current as CoInputElement, []);

  const propertyBag = useMemo(
    () => ({
      label,
      helperText,
      errorText,
      size,
      type,
      value,
      placeholder,
      name,
      autocomplete,
      disabled,
      invalid,
      required,
      readOnly,
    }),
    [
      autocomplete,
      disabled,
      errorText,
      helperText,
      invalid,
      label,
      name,
      placeholder,
      readOnly,
      required,
      size,
      type,
      value,
    ],
  );

  useEffect(() => {
    const el = innerRef.current;
    if (!el) {
      return;
    }

    Object.assign(el, propertyBag);
  }, [propertyBag]);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) {
      return;
    }

    const handleFocus = (event: Event) => {
      onCoFocus?.(event);
    };

    const handleBlur = (event: Event) => {
      onCoBlur?.(event);
    };

    if (onCoFocus) {
      el.addEventListener('co-focus', handleFocus);
    }

    if (onCoBlur) {
      el.addEventListener('co-blur', handleBlur);
    }

    return () => {
      if (onCoFocus) {
        el.removeEventListener('co-focus', handleFocus);
      }
      if (onCoBlur) {
        el.removeEventListener('co-blur', handleBlur);
      }
    };
  }, [onCoBlur, onCoFocus]);

  return React.createElement('co-input', { ref: innerRef, ...rest }, children);
});
