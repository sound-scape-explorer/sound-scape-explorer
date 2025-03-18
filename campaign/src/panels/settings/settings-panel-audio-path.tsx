import {Tooltip} from '@blueprintjs/core';
import clsx from 'clsx';
import {useSettingsState} from 'src/hooks/use-settings-state.ts';
import {useSettingsValidation} from 'src/hooks/use-settings-validation.ts';
import {TextInput} from 'src/primitives/text-input.tsx';

import styles from './settings-panel.module.scss';

export function SettingsPanelAudioPath() {
  const {settings, handleAudioDrop} = useSettingsState();
  const {isAudioPathValid} = useSettingsValidation();

  return (
    <div
      className={clsx(styles.row, 'align gap')}
      onDrop={handleAudioDrop}
    >
      <b className={styles.rowTitle}>Audio Path</b>
      <Tooltip content="The path to your audio folder">
        <TextInput
          value={settings.audioPath}
          intent={isAudioPathValid() ? 'success' : 'danger'}
        />
      </Tooltip>
    </div>
  );
}
