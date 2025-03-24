import {Tooltip} from '@blueprintjs/core';
import clsx from 'clsx';
import {useSettingsState} from 'src/hooks/use-settings-state.ts';
import {useSettingsValidation} from 'src/hooks/use-settings-validation.ts';
import styles from 'src/panels/settings/settings-panel.module.scss';
import {DatePicker} from 'src/primitives/date-picker';
import {Drawer} from 'src/primitives/drawer.tsx';
import {
  DrawerContent,
  type DrawerContentProps,
} from 'src/primitives/drawer-content.tsx';

const drawerContent: DrawerContentProps['content'] = [
  ['Validation', 'Date should be before earliest file.'],
];

export function SettingsPanelTimelineOrigin() {
  const {settings, update} = useSettingsState();
  const {isTimelineOriginValid} = useSettingsValidation();

  return (
    <div className={clsx(styles.row, 'align gap')}>
      <Drawer content={<DrawerContent content={drawerContent} />}>
        <b className={clsx(styles.rowTitle, 'help grow flex')}>
          Timeline origin
        </b>
      </Drawer>

      <Tooltip content="The timeline origin, date to start the integration from">
        <DatePicker
          value={settings.timelineOrigin}
          onChange={(v) => v !== null && update('timelineOrigin', v)}
          intent={isTimelineOriginValid() ? 'success' : 'danger'}
        />
      </Tooltip>
    </div>
  );
}
