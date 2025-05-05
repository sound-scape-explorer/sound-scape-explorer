import {type FileDto} from '@shared/dtos';
import {useCallback} from 'react';
import {type FileAlias} from 'src/panels/files/hooks/use-table-loader';
import {useTableState} from 'src/panels/files/hooks/use-table-state';

export function useTableIndexLoader() {
  const {createColumn} = useTableState();

  const load = useCallback(
    (indices: string[]) => {
      createColumn('Index', {
        key: 'col_index',
        type: 'readonly',
        data: indices,
      });
    },
    [createColumn],
  );

  const loadFromFolder = useCallback(
    (files: FileAlias[]) => {
      const indices = files.map((_, i) => i.toString());
      load(indices);
    },
    [load],
  );

  const loadFromDto = useCallback(
    (files: FileDto[]) => {
      const indices = files.map((f) => f.Index);
      load(indices);
    },
    [load],
  );

  return {
    loadFromFolder,
    loadFromDto,
  };
}
