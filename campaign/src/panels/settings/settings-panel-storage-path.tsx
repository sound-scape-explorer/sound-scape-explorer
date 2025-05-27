import {Tooltip} from '@blueprintjs/core';
import clsx from 'clsx';
import {useSettingsState} from 'src/hooks/use-settings-state';
import {useSettingsValidation} from 'src/hooks/use-settings-validation';
import {SettingsPanelStoragePathDrawerContent} from 'src/panels/settings/settings-panel-storage-path-drawer-content.tsx';
import {HelpDrawer} from 'src/primitives/help-drawer.tsx';
import {TextInput} from 'src/primitives/text-input.tsx';

import styles from './settings-panel.module.scss';

export function SettingsPanelStoragePath() {
  const {settings, update} = useSettingsState();
  const {isStoragePathValid} = useSettingsValidation();

  return (
    <div className={clsx(styles.row, 'align gap')}>
      <b className={clsx(styles.rowTitle, 'flex grow help')}>Storage Path</b>

      <HelpDrawer>
        <SettingsPanelStoragePathDrawerContent />
      </HelpDrawer>

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
