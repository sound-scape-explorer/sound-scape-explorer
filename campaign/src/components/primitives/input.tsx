import {type ChangeEvent, type RefObject} from 'react';
import styles from 'src/components/primitives/input.module.scss';

interface Props {
  ref?: RefObject<HTMLInputElement | null>;
  type: 'text' | 'number' | 'submit' | 'checkbox';
  placeholder?: string;
  defaultValue?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function Input({ref, type, placeholder, defaultValue, onChange}: Props) {
  return (
    <input
      ref={ref}
      type={type}
      className={styles.input}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  );
}
