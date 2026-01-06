import {useMemo} from 'react';
import {useTableColumns} from 'src/panels/files/hooks/use-table-columns.tsx';

const w0 = 70;
const w1 = w0 * 2;

export function useTableWidths() {
  const {columns} = useTableColumns();

  const widths = useMemo(() => {
    const l = columns.length - 4;
    return [w0, w1, w1, w1, ...new Array(l).map(() => w1)];
  }, [columns]);

  return {
    widths,
  };
}
