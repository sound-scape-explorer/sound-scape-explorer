import {InputGroup, type Intent} from '@blueprintjs/core';

interface Props {
  defaultValue: string;
  onBlur: (value: string) => void;
  intent?: Intent;
  disabled?: boolean;
  placeholder?: string;
}

export function TextInput({
  defaultValue,
  onBlur,
  intent = 'none',
  disabled = false,
  placeholder,
}: Props) {
  return (
    <InputGroup
      onBlur={(e) => onBlur(e.currentTarget.value)}
      defaultValue={defaultValue}
      onKeyDown={(e) => e.code === 'Enter' && e.currentTarget.blur()}
      intent={intent}
      disabled={disabled}
      placeholder={placeholder}
      fill
    />
  );
}
