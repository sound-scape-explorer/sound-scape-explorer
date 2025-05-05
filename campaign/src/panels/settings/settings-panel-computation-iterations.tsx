import {Tooltip} from '@blueprintjs/core';
import clsx from 'clsx';
import {useSettingsState} from 'src/hooks/use-settings-state';
import {useSettingsValidation} from 'src/hooks/use-settings-validation';
import styles from 'src/panels/settings/settings-panel.module.scss';
import {NumberInput} from 'src/primitives/number-input';

export function SettingsPanelComputationIterations() {
  const {settings, update} = useSettingsState();
  const {
    isComputationIterationsValid,
    isComputationStrategyUmap,
    isComputationStrategyPca,
  } = useSettingsValidation();

  return (
    <div className={clsx(styles.row, 'align gap')}>
      <b className={styles.rowTitle}>Iterations</b>
      <Tooltip content="The number of iterations for intermediary computations">
        <NumberInput
          defaultValue={settings.computationIterations}
          onBlur={(n) => update('computationIterations', n)}
          intent={isComputationIterationsValid() ? 'success' : 'danger'}
          disabled={!isComputationStrategyUmap && !isComputationStrategyPca}
        />
      </Tooltip>
    </div>
  );
}
