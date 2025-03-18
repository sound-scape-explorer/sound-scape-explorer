import {Tooltip} from '@blueprintjs/core';
import clsx from 'clsx';
import {useSettingsState} from 'src/hooks/use-settings-state.ts';
import {useSettingsValidation} from 'src/hooks/use-settings-validation.ts';
import styles from 'src/panels/settings/settings-panel.module.scss';
import {NumberInput} from 'src/primitives/number-input';

export function SettingsPanelDisplaySeed() {
  const {settings, update} = useSettingsState();
  const {isDisplaySeedValid} = useSettingsValidation();

  return (
    <div className={clsx(styles.row, 'align gap')}>
      <b className={styles.rowTitle}>Display seed</b>
      <Tooltip content="The seed for fixed randomness used for display UMAPs & PCAs">
        <NumberInput
          defaultValue={settings.displaySeed}
          onBlur={(n) => update('displaySeed', n)}
          intent={isDisplaySeedValid() ? 'success' : 'danger'}
        />
      </Tooltip>
    </div>
  );
}
