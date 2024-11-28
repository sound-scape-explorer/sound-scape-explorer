import {useSetAtom} from 'jotai';
import {useCallback} from 'react';
import {gridRowsAtom, importFilesAtom, tabIndexAtom} from 'src/atoms.ts';
import {
  DEFAULT_AUDIO_PATH,
  FILE_TYPES,
  JSON_TYPE,
  XLSX_TYPE,
} from 'src/constants.ts';
import {useConfigLoader} from 'src/hooks/use-config-loader.ts';
import {useFilesLoader} from 'src/hooks/use-files-loader.ts';
import {useFolderImport} from 'src/hooks/use-folder-import.ts';
import {useSettingsLoader} from 'src/hooks/use-settings-loader.ts';
import {type ExportConfig, type ImportFile} from 'src/types';
import {getPathExistence} from 'src/utils/electron.ts';
import {isProduction} from 'src/utils/env.ts';
import {serializeFilesToGrid} from 'src/utils/files.ts';
import {notifyError} from 'src/utils/notifications.ts';
import {readJson, readXlsx} from 'src/utils/readers.ts';

type ImportType = 'audio' | 'json' | 'xlsx';

export function useDrop() {
  const setImportFiles = useSetAtom(importFilesAtom);
  const setGridFiles = useSetAtom(gridRowsAtom);

  const {loadFilesFromJson, loadFilesFromXlsx} = useFilesLoader();
  const {loadSettings} = useSettingsLoader();
  const {loadConfig} = useConfigLoader();

  const {updateFolder} = useFolderImport();
  const setTabIndex = useSetAtom(tabIndexAtom);

  const detectImportType = useCallback((files: File[]): ImportType => {
    if (files.length === 1 && files[0].type === JSON_TYPE) {
      return 'json';
    }

    if (files.length === 1 && files[0].type === XLSX_TYPE) {
      return 'xlsx';
    }

    return 'audio';
  }, []);

  const handleAudio = useCallback(
    (files: File[]) => {
      const sanitized: ImportFile[] = [];

      for (const file of files) {
        if (!FILE_TYPES.includes(file.type)) {
          continue;
        }

        sanitized.push(file as unknown as ImportFile);
      }

      if (sanitized.length === 0) {
        return;
      }

      const rows = serializeFilesToGrid(sanitized);

      setImportFiles(sanitized);
      setGridFiles(rows);

      updateFolder(sanitized[0]);
      setTabIndex('files');
    },
    [setImportFiles, setGridFiles, setTabIndex, updateFolder],
  );

  const handleJson = useCallback(
    (files: File[]) => {
      const file = files[0];
      readJson(file, (reader: FileReader) => {
        const json: ExportConfig = JSON.parse(reader.result as string);
        console.log(json);

        if (
          json.settings.audioPath === DEFAULT_AUDIO_PATH ||
          !getPathExistence(json.settings.audioPath)
        ) {
          notifyError('Audio path does not exist');

          if (isProduction()) {
            return;
          }
        }

        const settings = loadSettings(json.settings);
        loadFilesFromJson({files: json.files, settings: settings});

        loadConfig({
          bands: json.config.bands,
          integrations: json.config.integrations,
          extractors: json.config.extractors,
          ranges: json.config.ranges,
          reducers: json.config.reducers,
        });
      });
    },
    [loadConfig, loadSettings, loadFilesFromJson],
  );

  const handleXlsx = useCallback(
    (files: File[]) => {
      const file = files[0];
      (async () => {
        const xlsx = await readXlsx(file);
        console.log(xlsx);

        const settings = loadSettings(xlsx.settings);

        loadFilesFromXlsx({
          files: xlsx.files,
          settings: settings,
          properties: xlsx.properties,
        });

        loadConfig({
          bands: xlsx.config.bands,
          integrations: xlsx.config.integrations,
          extractors: xlsx.config.extractors,
          ranges: xlsx.config.ranges,
          reducers: xlsx.config.reducers,
        });
      })();
    },
    [loadConfig, loadSettings, loadFilesFromXlsx],
  );

  const handleDrop = useCallback(
    (
      files: File[],
      // rejectedFiles: File[],
      // e: DropEvent,
    ) => {
      const importType = detectImportType(files);

      switch (importType) {
        case 'audio': {
          handleAudio(files);
          break;
        }
        case 'json': {
          handleJson(files);
          break;
        }
        case 'xlsx': {
          handleXlsx(files);
          break;
        }
      }
    },
    [detectImportType, handleAudio, handleJson, handleXlsx],
  );

  return {
    handleDrop,
  };
}
