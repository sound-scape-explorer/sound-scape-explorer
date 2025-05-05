import {Tooltip} from '@blueprintjs/core';
import clsx from 'clsx';
import {useSettingsState} from 'src/hooks/use-settings-state';
import {useSettingsValidation} from 'src/hooks/use-settings-validation';
import styles from 'src/panels/settings/settings-panel.module.scss';
import {NumberInput} from 'src/primitives/number-input';

export function SettingsPanelSampleRate() {
  const {settings, update} = useSettingsState();
  const {isSampleRateValid} = useSettingsValidation();

  return (
    <div className={clsx(styles.row, 'align gap')}>
      <b className={styles.rowTitle}>Sample rate</b>
      <Tooltip content="The sample rate of your audio samples in Hertz">
        <NumberInput
          defaultValue={settings.expectedSampleRate}
          onBlur={(n) => update('expectedSampleRate', n)}
          intent={isSampleRateValid() ? 'success' : 'danger'}
        />
      </Tooltip>
    </div>
  );
}
