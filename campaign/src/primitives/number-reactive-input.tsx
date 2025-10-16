import {type Intent, NumericInput} from '@blueprintjs/core';

interface Props {
  value: number;
  onChange: (n: number) => void;
  intent?: Intent;
  disabled?: boolean;
}

// TODO: to remove? can't remember the use case for this
export function NumberReactiveInput({
  value,
  onChange,
  intent = 'none',
  disabled = false,
}: Props) {
  return (
    <NumericInput
      fill
      value={value}
      intent={intent}
      buttonPosition="none"
      disabled={disabled}
      onKeyDown={(e) => e.code === 'Enter' && e.currentTarget.blur()}
      onChange={(e) => {
        const n = Number(e.currentTarget.value);
        if (isNaN(n)) {
          return;
        }
        onChange(n);
      }}
    />
  );
}
