import {useCallback} from 'react';
import {useTableState} from 'src/panels/files/hooks/use-table-state';

export interface TableFile {
  Index: string;
  Path: string;
  Date: string;
  Site: string;

  [prefixedTagName: string]: string;
}

export function useTableStateConverter() {
  const {state, getTableLength} = useTableState();

  const getFiles = useCallback((): TableFile[] => {
    const length = getTableLength();
    const files = new Array<TableFile>(length);

    for (let i = 0; i < length; i += 1) {
      const file = {} as TableFile;

      for (const {key, name} of state.columns) {
        file[name] = state.rows[key][i];
      }

      files[i] = file;
    }

    return files;
  }, [state, getTableLength]);

  return {
    getFiles,
  };
}
