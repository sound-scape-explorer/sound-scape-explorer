import styles from 'src/components/primitives/submit.module.scss';

interface Props {
  children: string;
  handleClick: () => void;
}

export function Submit({children, handleClick}: Props) {
  return (
    <button
      type="submit"
      className={styles.submit}
      onClick={handleClick}
    >
      <span>{children}</span>
    </button>
  );
}
