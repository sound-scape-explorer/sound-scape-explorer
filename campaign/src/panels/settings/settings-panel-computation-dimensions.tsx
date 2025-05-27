import clsx from 'clsx';
import {useSettingsState} from 'src/hooks/use-settings-state';
import {useSettingsValidation} from 'src/hooks/use-settings-validation';
import styles from 'src/panels/settings/settings-panel.module.scss';
import {NumberInput} from 'src/primitives/number-input';

export function SettingsPanelComputationDimensions() {
  const {settings, update} = useSettingsState();
  const {
    isComputationDimensionsValid,
    isComputationStrategyUmap,
    isComputationStrategyPca,
  } = useSettingsValidation();

  return (
    <div className={clsx(styles.row, 'align gap')}>
      <b className={styles.rowTitle}>Dimensions</b>
      <span />
      <NumberInput
        defaultValue={settings.computationDimensions}
        onBlur={(n) => update('computationDimensions', n)}
        intent={isComputationDimensionsValid() ? 'success' : 'danger'}
        disabled={!isComputationStrategyUmap && !isComputationStrategyPca}
      />
    </div>
  );
}
