import {ConfigDto} from '@shared/dtos';
import {normalizePath, readJson} from '@shared/files';
import {useCallback} from 'react';
import {useNotify} from 'src/hooks/use-notify';
import {useSettingsState} from 'src/hooks/use-settings-state';
import {useTabNavigation} from 'src/hooks/use-tab-navigation';
import {useExtractionState} from 'src/panels/extractions/hooks/use-extraction-state.ts';
import {useRangeState} from 'src/panels/extractions/hooks/use-range-state.ts';
import {useTableLoader} from 'src/panels/files/hooks/use-table-loader';

export function useJsonDrop() {
  const {notify} = useNotify();
  const {navigate} = useTabNavigation();
  const {setSettings} = useSettingsState();
  const {loadExtractions} = useExtractionState();
  const {setRanges} = useRangeState();
  const table = useTableLoader();

  const read = useCallback(
    (file: File): Promise<ConfigDto> => {
      return new Promise((resolve) => {
        readJson(file, (e) => {
          const data = e.target?.result;

          if (typeof data !== 'string') {
            notify('Could not read file', 'danger');
            return;
          }

          const json = JSON.parse(data);
          resolve(json);
        });
      });
    },
    [notify],
  );

  const handleJson = useCallback(
    async (file: File) => {
      try {
        const json = await read(file);
        const config = ConfigDto.parse(json);

        // settings
        const settings: ConfigDto['settings'] = {
          ...config.settings,
          storagePath: normalizePath(config.settings.storagePath),
          audioPath: normalizePath(config.settings.audioPath),
        };

        setSettings(settings);

        // extractions
        loadExtractions(config.extractions);

        // ranges
        setRanges(config.ranges);

        // files
        const files: ConfigDto['files'] = config.files.map((f) => ({
          ...f,
          Path: normalizePath(f.Path),
        }));

        table.loadFromDto(files);

        // UI
        navigate('settings');
      } catch (e) {
        if (e instanceof Error) {
          notify(e.message, 'danger');
        }
      }
    },
    [navigate, read, setSettings, loadExtractions, setRanges, table, notify],
  );

  return {
    handleJson,
    read,
  };
}
