import {ComputationStrategy} from '@shared/enums';
import clsx from 'clsx';
import {useSettingsState} from 'src/hooks/use-settings-state';
import styles from 'src/panels/settings/settings-panel.module.scss';
import {Select} from 'src/primitives/select.tsx';

export function SettingsComputationsStrategy() {
  const {settings, update} = useSettingsState();

  return (
    <div className={clsx(styles.row, 'align gap')}>
      <b className={styles.rowTitle}>Strategy</b>
      <span />
      <Select<ComputationStrategy>
        current={settings.computationStrategy}
        items={ComputationStrategy.options}
        onSelect={(v) => update('computationStrategy', v)}
      />
    </div>
  );
}
