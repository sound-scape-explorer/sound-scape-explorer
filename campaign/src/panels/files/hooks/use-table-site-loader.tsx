import {useCallback} from 'react';
import {type ConfigFile} from 'src/hooks/use-table-state-converter.ts';
import {type FileAlias} from 'src/panels/files/hooks/use-table-loader.ts';
import {useTableState} from 'src/panels/files/hooks/use-table-state.ts';
import {type IndexedXlsxFile} from 'src/utils/xlsx-parser.ts';

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
      const paths = files.map((f) => f.path);
      load(paths);
    },
    [load],
  );

  const loadFromXlsx = useCallback(
    (files: IndexedXlsxFile[]) => {
      const paths = files.map((f) => f.SITE);
      load(paths);
    },
    [load],
  );

  const loadFromJson = useCallback(
    (files: ConfigFile[]) => {
      const paths = files.map((f) => f.Site);
      load(paths);
    },
    [load],
  );

  return {
    loadFromFolder,
    loadFromXlsx,
    loadFromJson,
  };
}
