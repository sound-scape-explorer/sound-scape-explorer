import {Card, Tooltip} from '@blueprintjs/core';
import clsx from 'clsx';
import {getAllTimezones} from 'countries-and-timezones';
import {useMemo} from 'react';
import {SettingsCallout} from 'src/components/settings-callout.tsx';
import {useSettingsState} from 'src/hooks/use-settings-state.ts';
import {useSettingsValidation} from 'src/hooks/use-settings-validation.ts';
import styles from 'src/panels/settings/settings-panel.module.scss';
import {DatePicker} from 'src/primitives/date-picker';
import {Drawer} from 'src/primitives/drawer';
import {NumberInput} from 'src/primitives/number-input';
import {Select} from 'src/primitives/select';
import {TextInput} from 'src/primitives/text-input.tsx';

export function SettingsPanel() {
  const {settings, update, handleAudioDrop} = useSettingsState();
  const {
    isStoragePathValid,
    isAudioPathValid,
    isSampleRateValid,
    isTimelineOriginValid,
    isAudioHostValid,
    isComputationDimensionsValid,
    isComputationIterationsValid,
    isDisplaySeedValid,
  } = useSettingsValidation();

  const timezones = useMemo(() => Object.keys(getAllTimezones()), []);

  return (
    <Card className="flex column gap">
      <SettingsCallout />

      <div className={clsx(styles.row, 'align gap')}>
        <Drawer
          content={
            <div className="flex column gap bp5-running-text mt">
              <div>Examples:</div>
              <code>storage.h5</code>
              <code>storage</code>
              <code>/home/user/sse/campaign/storage.h5</code>
              <code>D:\sse\campaign\storage.h5</code>
            </div>
          }
        >
          <b className={clsx(styles.rowTitle, 'flex grow help')}>
            Storage Path
          </b>
        </Drawer>

        <Tooltip content="The name or path (relative or absolute) to your h5 storage file">
          <TextInput
            defaultValue={settings.storagePath}
            onBlur={(v) => update('storagePath', v)}
            intent={isStoragePathValid() ? 'success' : 'danger'}
          />
        </Tooltip>
      </div>

      <div
        className={clsx(styles.row, 'align gap')}
        onDrop={handleAudioDrop}
      >
        <b className={styles.rowTitle}>Audio Path</b>
        <Tooltip content="The path to your audio folder">
          <TextInput
            value={settings.audioPath}
            intent={isAudioPathValid() ? 'success' : 'danger'}
          />
        </Tooltip>
      </div>

      <div className={clsx(styles.row, 'align gap')}>
        <b className={styles.rowTitle}>Sample rate</b>
        <Tooltip content="The sample rate of your audio samples in Hertz">
          <NumberInput
            defaultValue={settings.expectedSampleRate}
            onBlur={(n) => update('expectedSampleRate', n)}
            intent={isSampleRateValid() ? 'success' : 'danger'}
          />
        </Tooltip>
      </div>

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

      <div className={clsx(styles.row, 'align gap')}>
        <b className={styles.rowTitle}>Audio host</b>
        <Tooltip content="The audio host, used to provide audio playback later on">
          <TextInput
            defaultValue={settings.audioHost}
            onBlur={(v) => update('audioHost', v)}
            placeholder="Leave empty to use default"
            intent={isAudioHostValid() ? 'success' : 'danger'}
          />
        </Tooltip>
      </div>

      <div className={clsx(styles.row, 'align gap')}>
        <b className={styles.rowTitle}>Timezone</b>
        <Select
          items={timezones}
          onSelect={(tz) => update('timezone', tz)}
          current={settings.timezone}
          placeholder="Select optional timezone"
        />
      </div>

      <div className={clsx(styles.row, 'align gap')}>
        <b className={styles.rowTitle}>Comp. dimensions</b>
        <NumberInput
          defaultValue={settings.computationDimensions}
          onBlur={(n) => update('computationDimensions', n)}
          intent={isComputationDimensionsValid() ? 'success' : 'danger'}
        />
      </div>

      <div className={clsx(styles.row, 'align gap')}>
        <b className={styles.rowTitle}>Comp. iterations</b>
        <Tooltip content="The number of iterations for intermediary computations">
          <NumberInput
            defaultValue={settings.computationIterations}
            onBlur={(n) => update('computationIterations', n)}
            intent={isComputationIterationsValid() ? 'success' : 'danger'}
          />
        </Tooltip>
      </div>

      <div className={clsx(styles.row, 'align gap')}>
        <b className={styles.rowTitle}>Display seed</b>
        <Tooltip content="The seed for fixed randomness used for display UMAPs & PCAs">
          <NumberInput
            defaultValue={settings.displaySeed}
            onBlur={(n) => update('displaySeed', n)}
            intent={isDisplaySeedValid() ? 'success' : 'danger'}
          />
        </Tooltip>
      </div>
    </Card>
  );
}
