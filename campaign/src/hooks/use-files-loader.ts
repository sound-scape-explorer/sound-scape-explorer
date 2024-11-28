import {useSetAtom} from 'jotai/index';
import {useCallback} from 'react';
import {gridRowsAtom, importFilesAtom, tabIndexAtom} from 'src/atoms.ts';
import {useFilesProperties} from 'src/hooks/use-files-properties.ts';
import {type ExportFile, type GridRow, type Settings} from 'src/types.ts';
import {
  reconstructFiles,
  serializeJsonToGrid,
  serializeXlsxToGrid,
} from 'src/utils/files.ts';

interface LoadFilesFromJsonProps {
  files: ExportFile[];
  settings: Settings;
}

interface LoadFilesFromXlsxProps {
  files: GridRow[];
  settings: Settings;
  properties: string[];
}

export function useFilesLoader() {
  const setImportFiles = useSetAtom(importFilesAtom);
  const setGridRows = useSetAtom(gridRowsAtom);
  const setTabIndex = useSetAtom(tabIndexAtom);

  // TODO: fix me
  const {addProperties} = useFilesProperties();

  const loadFilesFromJson = useCallback(
    ({files, settings}: LoadFilesFromJsonProps) => {
      const {rows, properties} = serializeJsonToGrid(files);
      const reconstructedFiles = reconstructFiles(files, settings.audioPath);
      setImportFiles(reconstructedFiles);
      addProperties(properties);
      setGridRows(rows);
      setTabIndex('files');
    },
    [setImportFiles, addProperties, setGridRows, setTabIndex],
  );

  const loadFilesFromXlsx = useCallback(
    ({files, settings, properties}: LoadFilesFromXlsxProps) => {
      const reconstructedFiles = reconstructFiles(files, settings.audioPath);
      const rows = serializeXlsxToGrid(files);

      setImportFiles(reconstructedFiles);
      addProperties(properties);
      setGridRows(rows);
      setTabIndex('files');
    },
    [setImportFiles, setGridRows, addProperties, setTabIndex],
  );

  return {
    loadFilesFromJson,
    loadFilesFromXlsx,
  };
}
