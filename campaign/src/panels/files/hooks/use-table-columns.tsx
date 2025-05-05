import {Column} from '@blueprintjs/table';
import {useMemo} from 'react';
import {useTableCellRenderer} from 'src/panels/files/hooks/use-table-cell-renderer.tsx';
import {useTableState} from 'src/panels/files/hooks/use-table-state';

export function useTableColumns() {
  const {renderer} = useTableCellRenderer();
  const {state} = useTableState();

  const columns = useMemo(() => {
    return state.order.map((key) => {
      const column = state.columns.find((c) => c.key === key);

      if (!column) {
        return <></>;
      }

      return (
        <Column
          key={column.key}
          name={column.name}
          cellRenderer={renderer}
        />
      );
    });
  }, [renderer, state.columns, state.order]);

  return {
    columns,
  };
}
