import {Cell, EditableCell2} from '@blueprintjs/table';
import {useCallback} from 'react';
import {useTableState} from 'src/panels/files/hooks/use-table-state.ts';

export function useTableCellRenderer() {
  const {state, findColumnByIndex, updateRows} = useTableState();

  const renderer = useCallback(
    (row: number, col: number) => {
      const column = findColumnByIndex(col);
      const key = column.key;

      if (!column) {
        throw new Error(`Column ${col} not found`);
      }

      if (column.type === 'readonly') {
        return (
          <Cell
            rowIndex={row}
            columnIndex={col}
            intent={state.intents[key][row]}
          >
            {state.rows[key][row]}
          </Cell>
        );
      }

      return (
        <EditableCell2
          rowIndex={row}
          columnIndex={col}
          value={state.rows[key][row]}
          onConfirm={(value) => updateRows([value], col, row)}
          intent={state.intents[key][row]}
        />
      );
    },
    [state.rows, state.intents, findColumnByIndex, updateRows],
  );

  return {
    renderer,
  };
}
