import {Tooltip} from '@blueprintjs/core';
import clsx from 'clsx';
import {useSettingsState} from 'src/hooks/use-settings-state';
import {useSettingsValidation} from 'src/hooks/use-settings-validation';
import styles from 'src/panels/settings/settings-panel.module.scss';
import {DatePicker} from 'src/primitives/date-picker';
import {
  DrawerContent,
  type DrawerContentProps,
} from 'src/primitives/drawer-content.tsx';
import {HelpDrawer} from 'src/primitives/help-drawer.tsx';

const drawerContent: DrawerContentProps['content'] = [
  ['Validation', 'Date should be before earliest file.'],
];

export function SettingsPanelTimelineOrigin() {
  const {settings, update} = useSettingsState();
  const {isTimelineOriginValid} = useSettingsValidation();

  return (
    <div className={clsx(styles.row, 'align gap')}>
      <b className={clsx(styles.rowTitle, 'help grow flex')}>Timeline origin</b>

      <HelpDrawer>
        <DrawerContent content={drawerContent} />
      </HelpDrawer>

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
