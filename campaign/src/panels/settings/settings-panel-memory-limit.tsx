import {Callout, Slider} from '@blueprintjs/core';
import clsx from 'clsx';
import {useSettingsState} from 'src/hooks/use-settings-state.ts';
import styles from 'src/panels/settings/settings-panel.module.scss';
import {Drawer} from 'src/primitives/drawer.tsx';

export function SettingsPanelMemoryLimit() {
  const {settings, update} = useSettingsState();

  return (
    <div className={clsx(styles.row, 'align gap')}>
      <Drawer
        content={
          <div className="flex column gap mt">
            <Callout compact>
              <div>The memory limit to apply for computations.</div>
            </Callout>
          </div>
        }
      >
        <b className={clsx(styles.rowTitle, 'flex grow help')}>
          Memory limit (GB)
        </b>
      </Drawer>

      <Slider
        min={4}
        max={64}
        stepSize={4}
        labelStepSize={4}
        onChange={(v) => update('memoryLimit', v)}
        labelRenderer={(v) => v.toString()}
        showTrackFill={false}
        value={settings.memoryLimit}
      />
    </div>
  );
}
