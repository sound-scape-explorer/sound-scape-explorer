import {useCallback} from 'react';
import {useTableCurrentCell} from 'src/panels/files/hooks/use-table-current-cell.ts';
import {useTableState} from 'src/panels/files/hooks/use-table-state.ts';
import {parseClipboard} from 'src/utils/parsers.ts';

export function useTablePaste() {
  const {updateRows} = useTableState();
  const {coords} = useTableCurrentCell();

  const handlePaste = useCallback(async () => {
    const clipboard = await navigator.clipboard.readText();
    const data = parseClipboard(clipboard);

    for (let i = 0; i < data.length; i += 1) {
      const values = data[i];
      updateRows(values, coords.col + i, coords.row);
    }
  }, [coords, updateRows]);

  return {
    handlePaste,
  };
}
