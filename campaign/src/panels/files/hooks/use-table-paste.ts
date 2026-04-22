import {useCallback} from 'react';
import {useTableCurrentCell} from 'src/panels/files/hooks/use-table-current-cell.ts';
import {useTableCurrentSelection} from 'src/panels/files/hooks/use-table-current-selection.ts';
import {useTableState} from 'src/panels/files/hooks/use-table-state';
import {parseClipboard} from 'src/utils/parsers';

export function useTablePaste() {
  const {updateRows} = useTableState();
  const {selection} = useTableCurrentSelection();
  const {coords} = useTableCurrentCell();

  const handlePaste = useCallback(async () => {
    const clipboard = await navigator.clipboard.readText();
    const data = parseClipboard(clipboard);

    const allTableSelected =
      coords.row === 0 &&
      coords.col === 0 &&
      Object.keys(selection).length === 0;

    let colStart: number;
    let colEnd: number;
    let rowStart: number;
    let rowEnd: number;

    if (allTableSelected) {
      colStart = coords.col;
      colEnd = coords.col;
      rowStart = coords.row;
      rowEnd = coords.row;
    } else {
      colStart = selection.cols[0];
      colEnd = selection.cols[1];
      rowStart = selection.rows[0];
      rowEnd = selection.rows[1];
    }

    const rowLength = rowEnd - rowStart + 1;

    if (allTableSelected) {
      for (let i = 0; i < data.length; i += 1) {
        const dataRow = data[i];
        updateRows(dataRow, coords.col + i, coords.row);
      }
    }

    // taking only the absolute first string value in the clipboard
    // and repeat it to paste on multiple rows
    const values = new Array(rowLength).fill(data[0][0]);
    for (let col = colStart; col <= colEnd; col += 1) {
      updateRows(values, col, rowStart);
    }
  }, [updateRows, selection, coords]);

  return {
    handlePaste,
  };
}
