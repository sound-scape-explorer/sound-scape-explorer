import {type FileDto} from '@shared/dtos';
import {useCallback} from 'react';
import {type FileAlias} from 'src/panels/files/hooks/use-table-loader';
import {useTableState} from 'src/panels/files/hooks/use-table-state';

export function useTablePathLoader() {
  const {createColumn} = useTableState();

  const load = useCallback(
    (paths: string[]) => {
      createColumn('Path', {
        key: 'col_path',
        type: 'readonly',
        data: paths,
      });
    },
    [createColumn],
  );

  const loadFromFolder = useCallback(
    (files: FileAlias[]) => {
      const paths = files.map((f) => f.path);
      load(paths);
    },
    [load],
  );

  const loadFromDto = useCallback(
    (files: FileDto[]) => {
      const paths = files.map((f) => f.Path);
      load(paths);
    },
    [load],
  );

  return {
    loadFromFolder,
    loadFromDto,
  };
}
