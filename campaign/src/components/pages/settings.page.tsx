import {useAtom} from 'jotai';
import {useCallback} from 'react';
import {settingsAtom} from 'src/atoms.ts';
import {Input} from 'src/components/primitives/input.tsx';
import {type Settings} from 'src/types';

import styles from './settings.page.module.scss';

export function SettingsPage() {
  return (
    <div className={styles.container}>
      <Row
        storageKey="storagePath"
        type="string"
        title="Storage"
        tooltip="The name or path (relative or absolute) to your h5 storage file"
      />
      <Row
        storageKey="audioPath"
        type="string"
        title="Audio"
        tooltip="The path to your audio folder"
      />
      <Row
        storageKey="expectedSampleRate"
        type="number"
        title="Sample rate"
        tooltip="The sample rate of your audio samples in Hertz"
      />
      <Row
        storageKey="timelineOrigin"
        type="number"
        title="Origin"
        tooltip="The timeline origin, date to start the integration from"
      />
      <Row
        storageKey="audioHost"
        type="string"
        title="Host"
        tooltip="The audio host, used to provide audio playback later on"
        placeholder="Leave empty to use default"
      />
      <Row
        storageKey="computationDimensions"
        type="number"
        title="Comp. dimensions"
        tooltip="The number of dimensions for intermediary computations"
      />
      <Row
        storageKey="computationIterations"
        type="number"
        title="Comp. iterations"
        tooltip="The number of iterations for intermediary computations"
      />
      <Row
        storageKey="displaySeed"
        type="number"
        title="Display Seed"
        tooltip="The seed for fixed randomness used for display UMAPs & PCAs"
      />
    </div>
  );
}

interface RowProps {
  storageKey: keyof Settings;
  type: 'string' | 'number';
  title: string;
  tooltip: string;
  placeholder?: string;
}

function Row({storageKey, type, title, tooltip, placeholder}: RowProps) {
  const [settings, setSettings] = useAtom(settingsAtom);

  const update = useCallback(
    <T extends keyof Settings>(key: T, newValue: Settings[T]) => {
      const newSettings = {...settings, [key]: newValue};
      setSettings(newSettings);
    },
    [settings, setSettings],
  );

  return (
    <div className={styles.row}>
      <span>{title}</span>
      <Input
        type={type === 'string' ? 'text' : 'number'}
        onChange={(e) =>
          update(
            storageKey,
            type === 'string' ? e.target.value : Number(e.target.value),
          )
        }
        // TODO: handle dates, add date picker
        defaultValue={settings[storageKey]}
        placeholder={placeholder}
      />
      <span>{tooltip}</span>
    </div>
  );
}
