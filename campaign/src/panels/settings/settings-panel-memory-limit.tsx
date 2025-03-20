import clsx from 'clsx';
import {useSettingsState} from 'src/hooks/use-settings-state.ts';
import {useSettingsValidation} from 'src/hooks/use-settings-validation.ts';
import styles from 'src/panels/settings/settings-panel.module.scss';
import {Drawer} from 'src/primitives/drawer.tsx';
import {
  DrawerContent,
  type DrawerContentProps,
} from 'src/primitives/drawer-content.tsx';
import {NumberInput} from 'src/primitives/number-input.tsx';

const drawer: DrawerContentProps['content'] = [
  [null, 'The memory limit to apply when computing the mean distances matrix.'],
];

export function SettingsPanelMemoryLimit() {
  const {settings, update} = useSettingsState();
  const {isMemoryLimitValid} = useSettingsValidation();

  return (
    <div className={clsx(styles.row, 'align gap')}>
      <Drawer content={<DrawerContent content={drawer} />}>
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
