import {InputGroup, type Intent} from '@blueprintjs/core';

interface Props {
  defaultValue?: string;
  value?: string;
  onBlur?: (value: string) => void;
  onChange?: (value: string) => void;
  onEnter?: (value: string) => void;
  intent?: Intent;
  disabled?: boolean;
  placeholder?: string;
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
