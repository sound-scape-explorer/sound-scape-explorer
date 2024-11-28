import styles from 'src/components/primitives/submit.module.scss';

interface Props {
  children: string;
  handleClick: () => void;
  submit?: boolean;
}

export function Button({children, handleClick, submit}: Props) {
  return (
    <button
      type={submit ? 'submit' : 'button'}
      className={styles.submit}
      onClick={handleClick}
    >
      <span>{children}</span>
    </button>
  );
}
