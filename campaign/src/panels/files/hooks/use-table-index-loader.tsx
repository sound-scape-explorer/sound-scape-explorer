import {useCallback} from 'react';
import {type ConfigFile} from 'src/hooks/use-table-state-converter.ts';
import  {type FileAlias} from 'src/panels/files/hooks/use-table-loader.ts';
import {useTableState} from 'src/panels/files/hooks/use-table-state.ts';
import {type IndexedXlsxFile} from 'src/utils/xlsx-parser.ts';

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

  const loadFromXlsx = useCallback(
    (files: IndexedXlsxFile[]) => {
      const indices = files.map((f) => f.index.toString());
      load(indices);
    },
    [load],
  );

  const loadFromJson = useCallback(
    (files: ConfigFile[]) => {
      const indices = files.map((f) => f.Index);
      load(indices);
    },
    [load],
  );

  return {
    loadFromFolder,
    loadFromXlsx,
    loadFromJson,
  };
}
