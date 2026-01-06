import {SITE_DEFAULT} from '@shared/constants';
import {type FileDto} from '@shared/dtos';
import {useCallback} from 'react';
import {type FileAlias} from 'src/panels/files/hooks/use-table-loader';
import {useTableState} from 'src/panels/files/hooks/use-table-state';

export function useTableSiteLoader() {
  const {createColumn} = useTableState();

  const load = useCallback(
    (paths: string[]) => {
      createColumn('Site', {
        key: 'col_site',
        type: 'editable',
        data: paths,
      });
    },
    [createColumn],
  );

  const loadFromFolder = useCallback(
    (files: FileAlias[]) => {
      const paths = files.map(() => SITE_DEFAULT);
      load(paths);
    },
    [load],
  );
  const loadFromDto = useCallback(
    (files: FileDto[]) => {
      const paths = files.map((f) => f.Site);
      load(paths);
    },
    [load],
  );

  return {
    loadFromFolder,
    loadFromDto,
  };
}
