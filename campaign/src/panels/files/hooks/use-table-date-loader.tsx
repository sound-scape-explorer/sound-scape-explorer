import {useCallback} from 'react';
import {type ConfigFile} from 'src/hooks/use-table-state-converter.ts';
import {type FileAlias} from 'src/panels/files/hooks/use-table-loader.ts';
import {useTableState} from 'src/panels/files/hooks/use-table-state.ts';
import {formatDateToString, isDateValid} from 'src/utils/dates.ts';
import {type IndexedXlsxFile} from 'src/utils/xlsx-parser.ts';

export function useTableDateLoader() {
  const {createColumn} = useTableState();

  const load = useCallback(
    (dates: string[]) => {
      createColumn('Date', {
        key: 'col_date',
        type: 'editable',
        data: dates,
        validator: (v) => (isDateValid(v) ? 'success' : 'danger'),
      });
    },
    [createColumn],
  );

  const loadFromFolder = useCallback(
    (files: FileAlias[]) => {
      const dates = files.map((f) => formatDateToString(new Date(f.timestamp)));
      load(dates);
    },
    [load],
  );

  const loadFromXlsx = useCallback(
    (files: IndexedXlsxFile[]) => {
      const dates = files.map((f) => formatDateToString(new Date(f.DATE)));
      load(dates);
    },
    [load],
  );

  const loadFromJson = useCallback(
    (files: ConfigFile[]) => {
      const dates = files.map((f) => f.Date);
      load(dates);
    },
    [load],
  );

  return {
    loadFromFolder,
    loadFromXlsx,
    loadFromJson,
  };
}
