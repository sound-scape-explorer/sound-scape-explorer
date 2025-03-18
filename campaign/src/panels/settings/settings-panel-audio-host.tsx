import {Tooltip} from '@blueprintjs/core';
import clsx from 'clsx';
import {useSettingsState} from 'src/hooks/use-settings-state.ts';
import {useSettingsValidation} from 'src/hooks/use-settings-validation.ts';
import styles from 'src/panels/settings/settings-panel.module.scss';
import {TextInput} from 'src/primitives/text-input.tsx';

export function SettingsPanelAudioHost() {
  const {settings, update} = useSettingsState();
  const {isAudioHostValid} = useSettingsValidation();

  return (
    <div className={clsx(styles.row, 'align gap')}>
      <b className={styles.rowTitle}>Audio host</b>
      <Tooltip content="The audio host, used to provide audio playback later on">
        <TextInput
          defaultValue={settings.audioHost}
          onBlur={(v) => update('audioHost', v)}
          placeholder="Leave empty to use default"
          intent={isAudioHostValid() ? 'success' : 'danger'}
        />
      </Tooltip>
    </div>
  );
}
