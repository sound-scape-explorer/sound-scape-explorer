import clsx from 'clsx';
import {useSettingsState} from 'src/hooks/use-settings-state';
import {useSettingsValidation} from 'src/hooks/use-settings-validation';
import styles from 'src/panels/settings/settings-panel.module.scss';
import {SettingsPanelMemoryLimitDrawerContent} from 'src/panels/settings/settings-panel-memory-limit-drawer-content.tsx';
import {Drawer} from 'src/primitives/drawer.tsx';
import {NumberInput} from 'src/primitives/number-input.tsx';

export function SettingsPanelMemoryLimit() {
  const {settings, update} = useSettingsState();
  const {isMemoryLimitValid} = useSettingsValidation();

  return (
    <div className={clsx(styles.row, 'align gap')}>
      <Drawer content={<SettingsPanelMemoryLimitDrawerContent />}>
        <b className={clsx(styles.rowTitle, 'flex grow help')}>
          MDM memory limit (GB)
        </b>
      </Drawer>

      <NumberInput
        defaultValue={settings.memoryLimit}
        onBlur={(v) => update('memoryLimit', v)}
        intent={isMemoryLimitValid() ? 'success' : 'danger'}
      />
    </div>
  );
}
