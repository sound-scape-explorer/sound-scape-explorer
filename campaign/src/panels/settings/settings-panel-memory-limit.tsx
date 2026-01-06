import clsx from 'clsx';
import {useSettingsState} from 'src/hooks/use-settings-state';
import {useSettingsValidation} from 'src/hooks/use-settings-validation';
import styles from 'src/panels/settings/settings-panel.module.scss';
import {SettingsPanelMemoryLimitDrawerContent} from 'src/panels/settings/settings-panel-memory-limit-drawer-content.tsx';
import {HelpDrawer} from 'src/primitives/help-drawer.tsx';
import {NumberInput} from 'src/primitives/number-input.tsx';

export function SettingsPanelMemoryLimit() {
  const {settings, update} = useSettingsState();
  const {isMemoryLimitValid} = useSettingsValidation();

  return (
    <div className={clsx(styles.row, 'align gap')}>
      <b className={clsx(styles.rowTitle)}>MDM memory limit (GB)</b>

      <HelpDrawer>
        <SettingsPanelMemoryLimitDrawerContent />
      </HelpDrawer>

      <NumberInput
        defaultValue={settings.memoryLimit}
        onBlur={(v) => update('memoryLimit', v)}
        intent={isMemoryLimitValid() ? 'success' : 'danger'}
      />
    </div>
  );
}
