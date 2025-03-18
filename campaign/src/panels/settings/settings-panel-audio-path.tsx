import {Callout, Tooltip} from '@blueprintjs/core';
import clsx from 'clsx';
import {useSettingsState} from 'src/hooks/use-settings-state.ts';
import {useSettingsValidation} from 'src/hooks/use-settings-validation.ts';
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
      <Drawer
        content={
          <div className="flex column gap mt">
            <Callout
              compact
              title="How to update?"
            >
              <div>Drag a folder over the input field to change its value.</div>
            </Callout>
            <Callout
              compact
              title="Validation status"
            >
              <div>
                Status is valid when the full paths from audio folder and audio
                paths exist.
              </div>
            </Callout>
          </div>
        }
      >
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
