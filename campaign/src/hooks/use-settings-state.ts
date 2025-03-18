import {atom, useAtom} from 'jotai';
import {type DragEvent, useCallback} from 'react';
import {
  AUDIO_HOST_DEFAULT,
  AUDIO_PATH_DEFAULT,
  COMPUTATION_DIMENSIONS_DEFAULT,
  COMPUTATION_ITERATIONS_DEFAULT,
  COMPUTATION_STRATEGY_DEFAULT,
  DISPLAY_SEED_DEFAULT,
  SAMPLE_RATE_DEFAULT,
  STORAGE_PATH_DEFAULT,
  TIMELINE_ORIGIN_DEFAULT,
  TIMEZONE_DEFAULT,
} from 'src/constants.ts';
import  {type ComputationStrategy} from 'src/enums.ts';
import {useTableState} from 'src/panels/files/hooks/use-table-state.ts';

const settingsAtom = atom<Settings>({
  storagePath: STORAGE_PATH_DEFAULT,
  audioPath: AUDIO_PATH_DEFAULT,
  expectedSampleRate: SAMPLE_RATE_DEFAULT,
  timelineOrigin: TIMELINE_ORIGIN_DEFAULT,
  audioHost: AUDIO_HOST_DEFAULT,
  timezone: TIMEZONE_DEFAULT,
  computationStrategy: COMPUTATION_STRATEGY_DEFAULT,
  computationDimensions: COMPUTATION_DIMENSIONS_DEFAULT,
  computationIterations: COMPUTATION_ITERATIONS_DEFAULT,
  displaySeed: DISPLAY_SEED_DEFAULT,
});

export interface Settings {
  storagePath: string;
  audioPath: string;
  expectedSampleRate: number;
  timelineOrigin: string;
  audioHost: string;
  timezone: string;
  computationStrategy: ComputationStrategy;
  computationDimensions: number;
  computationIterations: number;
  displaySeed: number;
}

export function useSettingsState() {
  const [settings, setSettings] = useAtom<Settings>(settingsAtom);
  const {updatePathIntents} = useTableState();

  const update = useCallback(
    <K extends keyof Settings>(key: K, value: Settings[K]) => {
      if (key === 'audioPath') {
        updatePathIntents(value as string);
      }

      setSettings((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [setSettings, updatePathIntents],
  );

  const handleAudioDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();

      if (e.dataTransfer.files.length !== 1) {
        return;
      }

      const file = e.dataTransfer.files[0];
      const {isDirectory} = window.electronAPI.checkPath(file.path);

      if (isDirectory) {
        update('audioPath', file.path);
      }
    },
    [update],
  );

  return {
    settings,
    setSettings,
    update,
    handleAudioDrop,
  };
}
