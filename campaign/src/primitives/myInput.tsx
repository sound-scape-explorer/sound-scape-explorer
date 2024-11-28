import clsx from 'clsx';
import {type ChangeEvent, type RefObject} from 'react';
import styles from 'src/primitives/input.module.scss';

interface Props {
  ref?: RefObject<HTMLInputElement | null>;
  type: 'text' | 'number' | 'submit' | 'checkbox';
  placeholder?: string;
  defaultValue?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export function MyInput({
  ref,
  type,
  placeholder,
  defaultValue,
  onChange,
  disabled = false,
}: Props) {
  return (
    <input
      ref={ref}
      type={type}
      disabled={disabled}
      className={clsx(styles.input, disabled && styles.disabled)}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  );
}
