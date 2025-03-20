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
  [
    'Examples',
    <div
      key="examples"
      className="flex column gap"
    >
      <div>
        <code>storage.h5</code>
      </div>
      <div>
        <code>/home/user/sse/my_campaign/storage.h5</code>
      </div>
      <div>
        <code>D:\sse\my_campaign\storage.h5</code>
      </div>
    </div>,
  ],
];

export function SettingsPanelStoragePath() {
  const {settings, update} = useSettingsState();
  const {isStoragePathValid} = useSettingsValidation();

  return (
    <div className={clsx(styles.row, 'align gap')}>
      <Drawer content={<DrawerContent content={drawer} />}>
        <b className={clsx(styles.rowTitle, 'flex grow help')}>Storage Path</b>
      </Drawer>

      <Tooltip content="The name or path (relative or absolute) to your h5 storage file">
        <TextInput
          defaultValue={settings.storagePath}
          onBlur={(v) => update('storagePath', v)}
          intent={isStoragePathValid() ? 'success' : 'danger'}
        />
      </Tooltip>
    </div>
  );
}
