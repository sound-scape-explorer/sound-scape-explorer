import clsx from 'clsx';
import {getAllTimezones} from 'countries-and-timezones';
import {useMemo} from 'react';
import {useSettingsState} from 'src/hooks/use-settings-state.ts';
import styles from 'src/panels/settings/settings-panel.module.scss';
import {Select} from 'src/primitives/select';

export function SettingsPanelTimezone() {
  const {settings, update} = useSettingsState();

  const timezones = useMemo(() => Object.keys(getAllTimezones()), []);

  return (
    <div className={clsx(styles.row, 'align gap')}>
      <b className={styles.rowTitle}>Timezone</b>
      <Select
        items={timezones}
        onSelect={(tz) => update('timezone', tz)}
        current={settings.timezone}
        placeholder="Select optional timezone"
      />
    </div>
  );
}
