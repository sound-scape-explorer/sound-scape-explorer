import {type Intent, NumericInput, Size} from '@blueprintjs/core';
import {type CSSProperties, useRef} from 'react';

interface Props {
  defaultValue: number;
  onBlur: (n: number) => void;
  size?: Size;
  intent?: Intent;
  disabled?: boolean;
  smallText?: boolean;
}

export function NumberInput({
  defaultValue,
  onBlur,
  size = Size.MEDIUM,
  intent = 'none',
  disabled = false,
  smallText = false,
}: Props) {
  const customStyles = useRef<CSSProperties | undefined>(
    smallText ? {fontSize: '80%'} : undefined,
  );

  return (
    <NumericInput
      fill
      style={customStyles.current}
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
