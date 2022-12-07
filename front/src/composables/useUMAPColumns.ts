import {UMAPDatasetStore} from '../store/UMAP-dataset.store';
import type {UMAPColumnsStoreInterface} from '../store/UMAP-columns.store';
import {UMAPColumnsStore} from '../store/UMAP-columns.store';

export function useUMAPColumns() {
  function isVisibleByColumns(index: number): boolean {
    const {columns: columnsSelection} = UMAPColumnsStore;
    let isVisible = true;

    const {dataset} = UMAPDatasetStore;

    // @ts-expect-error TS2322
    const columns: UMAPColumnsStoreInterface['columns'] = dataset?.metadata[index]['columns'];

    const columnsSelectionKeys = Object.keys(columnsSelection);
    const columnsKeys = Object.keys(columns);

    for (let i = 0; i < columnsSelectionKeys.length; ++i) {
      const columnSelection = columnsSelection[columnsSelectionKeys[i]];
      const column = columns[columnsKeys[i]];

      const columnSelectionValues = Object.values(columnSelection);

      // no user selection
      if (columnSelectionValues.length === 0) {
        continue;
      }

      const columnValues = Object.values(column);
      const columnValue = columnValues[0];

      if (typeof columnValue === 'number') {
        const n = columnValue as number;
        isVisible = columnSelectionValues.includes(n.toString());
      } else {
        isVisible = columnSelectionValues.includes(columnValue);
      }
    }

    return isVisible;
  }

  return {
    isVisibleByColumns,
  };
}
