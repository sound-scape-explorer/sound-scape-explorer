import {Tooltip} from '@blueprintjs/core';
import clsx from 'clsx';
import {useSettingsState} from 'src/hooks/use-settings-state';
import {useSettingsValidation} from 'src/hooks/use-settings-validation';
import {SettingsPanelAudioPathDrawerContent} from 'src/panels/settings/settings-panel-audio-path-drawer-content.tsx';
import {HelpDrawer} from 'src/primitives/help-drawer.tsx';
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
      <b className={clsx(styles.rowTitle, 'flex grow help')}>Audio Path</b>

      <HelpDrawer>
        <SettingsPanelAudioPathDrawerContent />
      </HelpDrawer>

      <Tooltip content="The path to your audio folder">
        <TextInput
          value={settings.audioPath}
          intent={isAudioPathValid() ? 'success' : 'danger'}
        />
      </Tooltip>
    </div>
  );
}
