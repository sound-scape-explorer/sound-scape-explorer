import {type FileDto} from '@shared/dtos';
import {useCallback} from 'react';
import {type FileAlias} from 'src/panels/files/hooks/use-table-loader';
import {useTableState} from 'src/panels/files/hooks/use-table-state';
import {formatDateToString} from 'src/utils/datetime.ts';

export function useTableDateLoader() {
  const {createColumn} = useTableState();

  const load = useCallback(
    (dates: string[]) => {
      createColumn('Date', {
        key: 'col_date',
        type: 'editable',
        data: dates,
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

  const loadFromDto = useCallback(
    (files: FileDto[]) => {
      const dates = files.map((f) => f.Date);
      load(dates);
    },
    [load],
  );

  return {
    loadFromFolder,
    loadFromDto,
  };
}
