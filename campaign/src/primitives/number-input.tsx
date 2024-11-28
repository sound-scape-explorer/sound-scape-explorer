import {type Intent, NumericInput} from '@blueprintjs/core';

interface Props {
  defaultValue: number;
  onBlur: (n: number) => void;
  intent?: Intent;
  disabled?: boolean;
}

export function NumberInput({
  defaultValue,
  onBlur,
  intent = 'none',
  disabled = false,
}: Props) {
  return (
    <NumericInput
      fill
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
