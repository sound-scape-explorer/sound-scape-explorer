import {useCallback} from 'react';
import {useTableState} from 'src/panels/files/hooks/use-table-state.ts';

export interface ConfigFile {
  Index: string;
  Path: string;
  Date: string;
  Site: string;

  [p: string]: string; // LABEL_xxx
}

export function useTableStateConverter() {
  const {state, getTableLength} = useTableState();

  const getFiles = useCallback((): ConfigFile[] => {
    const length = getTableLength();
    const files = new Array<ConfigFile>(length);

    for (let i = 0; i < length; i += 1) {
      const file = {} as ConfigFile;

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
