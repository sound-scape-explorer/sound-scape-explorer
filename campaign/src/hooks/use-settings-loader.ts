import {useSetAtom} from 'jotai';
import {useCallback} from 'react';
import {settingsAtom} from 'src/atoms.ts';
import {type ExportSettings, type Settings} from 'src/types.ts';
import {convertStringToDate} from 'src/utils/dates.ts';

export function useSettingsLoader() {
  const setSettings = useSetAtom(settingsAtom);

  const loadSettings = useCallback(
    (exportSettings: ExportSettings) => {
      const settings: Settings = {
        ...exportSettings,
        timelineOrigin: convertStringToDate(exportSettings.timelineOrigin),
      };

      setSettings(settings);
      return settings;
    },
    [setSettings],
  );

  return {
    loadSettings,
  };
}
