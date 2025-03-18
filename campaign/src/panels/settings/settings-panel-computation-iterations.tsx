import {Tooltip} from '@blueprintjs/core';
import clsx from 'clsx';
import {useSettingsState} from 'src/hooks/use-settings-state.ts';
import {useSettingsValidation} from 'src/hooks/use-settings-validation.ts';
import styles from 'src/panels/settings/settings-panel.module.scss';
import {NumberInput} from 'src/primitives/number-input';

export function SettingsPanelComputationIterations() {
  const {settings, update} = useSettingsState();
  const {isComputationIterationsValid} = useSettingsValidation();

  return (
    <div className={clsx(styles.row, 'align gap')}>
      <b className={styles.rowTitle}>Comp. iterations</b>
      <Tooltip content="The number of iterations for intermediary computations">
        <NumberInput
          defaultValue={settings.computationIterations}
          onBlur={(n) => update('computationIterations', n)}
          intent={isComputationIterationsValid() ? 'success' : 'danger'}
        />
      </Tooltip>
    </div>
  );
}
