import {Tooltip} from '@blueprintjs/core';
import clsx from 'clsx';
import {useSettingsState} from 'src/hooks/use-settings-state';
import {useSettingsValidation} from 'src/hooks/use-settings-validation';
import {SettingsPanelAudioPathDrawerContent} from 'src/panels/settings/settings-panel-audio-path-drawer-content.tsx';
import {Drawer} from 'src/primitives/drawer.tsx';
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
      <Drawer content={<SettingsPanelAudioPathDrawerContent />}>
        <b className={clsx(styles.rowTitle, 'flex grow help')}>Audio Path</b>
      </Drawer>
      <Tooltip content="The path to your audio folder">
        <TextInput
          value={settings.audioPath}
          intent={isAudioPathValid() ? 'success' : 'danger'}
        />
      </Tooltip>
    </div>
  );
}
