import {SITE_AS_TAG_NAME} from '@shared/constants.ts';
import {useCallback} from 'react';
import {type TrajectoryConfig} from 'src/interfaces.ts';
import {
  type ColumnKey,
  useTableState,
} from 'src/panels/files/hooks/use-table-state.ts';

export function useTrajectoryFilePresence() {
  const {state} = useTableState();

  const getColName = useCallback((tagName: string): ColumnKey => {
    if (tagName === SITE_AS_TAG_NAME) {
      return 'col_site';
    }

    return `col_TAG_${tagName}`;
  }, []);

  const getCount = useCallback(
    (trajectory: TrajectoryConfig) => {
      const colName = getColName(trajectory.tagName);

      if (!(colName in state.rows)) {
        return 'error';
      }

      const row = state.rows[colName];
      return row.filter((v) => v === trajectory.tagValue).length;
    },
    [state, getColName],
  );

  return {
    getCount,
  };
}
