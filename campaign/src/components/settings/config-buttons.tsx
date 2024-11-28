import styles from 'src/components/settings/config-buttons.module.scss';

interface Props {
  onRemove: () => void;
  onDown?: () => void;
  onUp?: () => void;
}

export function ConfigButtons({onRemove, onDown, onUp}: Props) {
  return (
    <div className={styles.buttons}>
      <button onClick={onRemove}>x</button>
      {onDown && <button onClick={onDown}>↓</button>}
      {onUp && <button onClick={onUp}>↑</button>}
    </div>
  );
}
