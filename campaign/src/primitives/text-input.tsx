import {InputGroup, type Intent} from '@blueprintjs/core';

interface Props {
  readonly defaultValue?: string;
  readonly value?: string;
  readonly onBlur?: (value: string) => void;
  readonly onChange?: (value: string) => void;
  readonly onEnter?: (value: string) => void;
  readonly intent?: Intent;
  readonly disabled?: boolean;
  readonly placeholder?: string;
}

export function TextInput({
  defaultValue,
  value,
  onBlur,
  onChange,
  onEnter,
  intent = 'none',
  disabled = false,
  placeholder,
}: Props) {
  return (
    <InputGroup
      onBlur={(e) =>
        typeof onBlur !== 'undefined' && onBlur(e.currentTarget.value)
      }
      defaultValue={defaultValue}
      value={value}
      onKeyDown={(e) => {
        if (e.code === 'Enter') {
          e.currentTarget.blur();

          if (typeof onEnter !== 'undefined') {
            onEnter(e.currentTarget.value);
          }
        }
      }}
      intent={intent}
      disabled={disabled}
      placeholder={placeholder}
      onChange={(e) =>
        typeof onChange !== 'undefined' && onChange(e.currentTarget.value)
      }
      onDrop={(e) => e.preventDefault()}
      fill
    />
  );
}
