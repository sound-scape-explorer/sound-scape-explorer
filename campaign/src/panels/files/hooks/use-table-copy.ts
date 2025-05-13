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

      // TODO: maybe make this right?
      if (typeof value === 'object') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error ikr
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
