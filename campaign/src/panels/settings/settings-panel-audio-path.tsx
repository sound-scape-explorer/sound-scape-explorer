import {Tooltip} from '@blueprintjs/core';
import clsx from 'clsx';
import {useSettingsState} from 'src/hooks/use-settings-state.ts';
import {useSettingsValidation} from 'src/hooks/use-settings-validation.ts';
import {Drawer} from 'src/primitives/drawer.tsx';
import {
  DrawerContent,
  type DrawerContentProps,
} from 'src/primitives/drawer-content.tsx';
import {TextInput} from 'src/primitives/text-input.tsx';

import styles from './settings-panel.module.scss';

const drawer: DrawerContentProps['content'] = [
  ['How to update?', 'Drag a folder onto the input field to change its value.'],
  [
    'Validation',
    'Status is valid when the full paths from audio folder and audio paths exist.',
  ],
];

export function SettingsPanelAudioPath() {
  const {settings, handleAudioDrop} = useSettingsState();
  const {isAudioPathValid} = useSettingsValidation();

  return (
    <div
      className={clsx(styles.row, 'align gap')}
      onDrop={handleAudioDrop}
    >
      <Drawer content={<DrawerContent content={drawer} />}>
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
