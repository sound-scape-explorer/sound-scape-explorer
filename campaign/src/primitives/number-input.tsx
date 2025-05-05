import {type Intent, NumericInput, Size} from '@blueprintjs/core';

interface Props {
  defaultValue: number;
  onBlur: (n: number) => void;
  size?: Size;
  intent?: Intent;
  disabled?: boolean;
}

export function NumberInput({
  defaultValue,
  onBlur,
  size = Size.MEDIUM,
  intent = 'none',
  disabled = false,
}: Props) {
  return (
    <NumericInput
      fill
      size={size}
      defaultValue={defaultValue}
      intent={intent}
      buttonPosition="none"
      disabled={disabled}
      onKeyDown={(e) => e.code === 'Enter' && e.currentTarget.blur()}
      onBlur={(e) => {
        const n = Number(e.currentTarget.value);
        if (isNaN(n)) {
          return;
        }
        onBlur(n);
      }}
    />
  );
}
