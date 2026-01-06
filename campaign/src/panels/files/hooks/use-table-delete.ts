import {useCallback} from 'react';
import {useTableCurrentSelection} from 'src/panels/files/hooks/use-table-current-selection';
import {useTableState} from 'src/panels/files/hooks/use-table-state';

export function useTableDelete() {
  const {updateRows} = useTableState();
  const {selection} = useTableCurrentSelection();

  const handleDelete = useCallback(() => {
    for (let col = selection.cols[0]; col <= selection.cols[1]; col += 1) {
      const rowCount = selection.rows[1] - selection.rows[0] + 1;
      const dummy = new Array(rowCount).fill('');
      updateRows(dummy, col, selection.rows[0]);
    }
  }, [selection, updateRows]);

  return {
    handleDelete,
  };
}
