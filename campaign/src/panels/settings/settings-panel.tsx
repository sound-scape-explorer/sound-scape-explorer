import {Card, Tooltip} from '@blueprintjs/core';
import clsx from 'clsx';
import {getAllTimezones} from 'countries-and-timezones';
import {isAfter} from 'date-fns';
import {useCallback, useMemo} from 'react';
import {TIMELINE_ORIGIN_MIN} from 'src/constants.ts';
import {useSettings} from 'src/hooks/use-settings.ts';
import styles from 'src/panels/settings/settings-panel.module.scss';
import {DatePicker} from 'src/primitives/date-picker';
import {Drawer} from 'src/primitives/drawer';
import {NumberInput} from 'src/primitives/number-input';
import {Select} from 'src/primitives/select';
import {TextInput} from 'src/primitives/text-input.tsx';

export function SettingsPanel() {
  const {
    storagePath,
    setStoragePath,
    audioPath,
    sampleRate,
    setSampleRate,
    origin,
    setOrigin,
    audioHost,
    setAudioHost,
    timezone,
    setTimezone,
    computationDimensions,
    setComputationDimensions,
    computationIterations,
    setComputationIterations,
    displaySeed,
    setDisplaySeed,
  } = useSettings();

  const timezones = useMemo(() => Object.keys(getAllTimezones()), []);

  const handleDateChange = useCallback(
    (d: string | null) => {
      if (d === null) {
        return;
      }

      setOrigin(d);
    },
    [setOrigin],
  );

  return (
    <Card className="flex column gap">
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
            defaultValue={storagePath}
            onBlur={(v) => setStoragePath(v)}
          />
        </Tooltip>
      </div>

      <div className={clsx(styles.row, 'align gap')}>
        <b className={styles.rowTitle}>Audio Path</b>
        <Tooltip content="The path to your audio folder">
          <TextInput
            defaultValue={audioPath}
            onBlur={() => undefined}
            disabled
          />
        </Tooltip>
      </div>

      <div className={clsx(styles.row, 'align gap')}>
        <b className={styles.rowTitle}>Sample rate</b>
        <Tooltip content="The sample rate of your audio samples in Hertz">
          <NumberInput
            defaultValue={sampleRate}
            onBlur={(n) => setSampleRate(n)}
            intent={sampleRate > 0 ? 'success' : 'danger'}
          />
        </Tooltip>
      </div>

      <div className={clsx(styles.row, 'align gap')}>
        <b className={styles.rowTitle}>Timeline origin</b>
        <Tooltip content="The timeline origin, date to start the integration from">
          <DatePicker
            value={origin}
            onChange={handleDateChange}
            intent={
              isAfter(new Date(origin), new Date(TIMELINE_ORIGIN_MIN))
                ? 'success'
                : 'danger'
            }
          />
        </Tooltip>
      </div>

      <div className={clsx(styles.row, 'align gap')}>
        <b className={styles.rowTitle}>Audio host</b>
        <Tooltip content="The audio host, used to provide audio playback later on">
          <TextInput
            defaultValue={audioHost}
            onBlur={(v) => setAudioHost(v)}
            placeholder="Leave empty to use default"
          />
        </Tooltip>
      </div>

      <div className={clsx(styles.row, 'align gap')}>
        <b className={styles.rowTitle}>Timezone</b>
        <Select
          items={timezones}
          onSelect={(tz) => setTimezone(tz)}
          current={timezone}
          placeholder="Select optional timezone"
        />
      </div>

      <div className={clsx(styles.row, 'align gap')}>
        <b className={styles.rowTitle}>Comp. dimensions</b>
        <NumberInput
          defaultValue={computationDimensions}
          onBlur={(n) => setComputationDimensions(n)}
          intent={computationDimensions > 0 ? 'success' : 'danger'}
        />
      </div>

      <div className={clsx(styles.row, 'align gap')}>
        <b className={styles.rowTitle}>Comp. iterations</b>
        <Tooltip content="The number of iterations for intermediary computations">
          <NumberInput
            defaultValue={computationIterations}
            onBlur={(n) => setComputationIterations(n)}
            intent={computationIterations > 0 ? 'success' : 'danger'}
          />
        </Tooltip>
      </div>

      <div className={clsx(styles.row, 'align gap')}>
        <b className={styles.rowTitle}>Display seed</b>
        <Tooltip content="The seed for fixed randomness used for display UMAPs & PCAs">
          <NumberInput
            defaultValue={displaySeed}
            onBlur={(n) => setDisplaySeed(n)}
            intent={displaySeed > 0 ? 'success' : 'danger'}
          />
        </Tooltip>
      </div>
    </Card>
  );
}
