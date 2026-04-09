import { defineComponent, h, ref, onMounted, type PropType } from 'vue';
import type { InputSize, InputType } from '@cobalt/components/input';
import '@cobalt/components/input';

export type CoInputProps = {
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
};

export const CoInput = defineComponent({
  name: 'CoInput',
  props: {
    label: {
      type: String,
      default: '',
    },
    helperText: {
      type: String,
      default: '',
    },
    errorText: {
      type: String,
      default: '',
    },
    size: {
      type: String as PropType<InputSize>,
      default: 'md',
    },
    type: {
      type: String as PropType<InputType>,
      default: 'text',
    },
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    autocomplete: {
      type: String,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    invalid: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['co-focus', 'co-blur'],
  setup(props, { emit, slots }) {
    const elRef = ref<HTMLElement | null>(null);

    onMounted(() => {
      const el = elRef.value;
      if (!el) return;

      el.addEventListener('co-focus', (e: Event) => {
        emit('co-focus', e);
      });
      el.addEventListener('co-blur', (e: Event) => {
        emit('co-blur', e);
      });
    });

    return () =>
      h(
        'co-input',
        {
          ref: elRef,
          label: props.label,
          helperText: props.helperText,
          errorText: props.errorText,
          size: props.size,
          type: props.type,
          value: props.value,
          placeholder: props.placeholder,
          name: props.name,
          autocomplete: props.autocomplete,
          disabled: props.disabled || undefined,
          invalid: props.invalid || undefined,
          required: props.required || undefined,
          readOnly: props.readOnly || undefined,
        },
        slots,
      );
  },
});
