import {Tooltip} from '@blueprintjs/core';
import clsx from 'clsx';
import {useSettingsState} from 'src/hooks/use-settings-state.ts';
import {useSettingsValidation} from 'src/hooks/use-settings-validation.ts';
import styles from 'src/panels/settings/settings-panel.module.scss';
import {DatePicker} from 'src/primitives/date-picker';

export function SettingsPanelTimelineOrigin() {
  const {settings, update} = useSettingsState();
  const {isTimelineOriginValid} = useSettingsValidation();

  return (
    <div className={clsx(styles.row, 'align gap')}>
      <b className={styles.rowTitle}>Timeline origin</b>
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
