import clsx from 'clsx';
import styles from 'src/primitives/button.module.scss';

interface Props {
  children: string;
  handleClick: () => void;
  submit?: boolean;
  disabled?: boolean;
}

export function MyButton({
  children,
  handleClick,
  submit,
  disabled = false,
}: Props) {
  return (
    <button
      type={submit ? 'submit' : 'button'}
      className={clsx(
        styles.submit,
        disabled ? styles.disabled : styles.enabled,
      )}
      onClick={handleClick}
      disabled={disabled}
    >
      <span>{children}</span>
    </button>
  );
}
