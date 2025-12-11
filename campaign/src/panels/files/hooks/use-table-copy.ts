import {type CellProps, type CellRenderer} from '@blueprintjs/table';
import {type ReactNode, useCallback} from 'react';

interface ExtendedCellProps extends CellProps {
  children?: ReactNode;
  value?: string;
}

export function useTableCopy() {
  const handleCopy = useCallback(
    (row: number, col: number, cellRenderer: CellRenderer) => {
      const results = cellRenderer(row, col);

      if (typeof results === 'undefined') {
        return;
      }

      const props = results.props as ExtendedCellProps;

      let value = props?.value ?? props?.children ?? '';

      if (typeof value === 'object') {
        // @ts-expect-error sometimes cell value can be interpreted as object and I don't know why or how
        value = value.props.children;
      }

      return value;
    },
    [],
  );

  return {
    handleCopy,
  };
}
