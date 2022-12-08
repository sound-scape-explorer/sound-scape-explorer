import {UMAPFiltersStore} from '../store/UMAP-filters.store';
import {UMAPDatasetStore} from '../store/UMAP-dataset.store';
import {getArraysIntersection} from '../utils/get-arrays-intersection';
import {UMAPTimeRangeStore} from '../store/UMAP-time-range.store';
import {UMAPQueryStore} from '../store/UMAP-query.store';
import {UMAPQueryComplexStore} from '../store/UMAP-query-complex.store';
import {UMAPColumnsStore} from '../store/UMAP-columns.store';
import type {ConfigStoreInterface} from '../store/config.store';

export function useUMAPFilters() {
  function isVisibleByQuery(index: number): boolean {
    const {matches, query} = UMAPQueryStore;

    if (query === '') {
      return true;
    }

    const {dataset} = UMAPDatasetStore;
    const elementLabel = dataset?.metadata[index]['label'] as string;

    // noinspection RedundantIfStatementJS
    if (matches.includes(elementLabel)) {
      return true;
    }

    return false;
  }

  function isVisibleByTags(index: number): boolean {
    const {tags} = UMAPFiltersStore;

    if (tags.length === 0) {
      return true;
    }

    const {dataset} = UMAPDatasetStore;
    const elementTags = dataset?.metadata[index]['tags'] as string;
    const elementLabel = dataset?.metadata[index]['label'] as string;

    const tagsIntersection = getArraysIntersection([tags, elementTags.split(' ')]);

    if (tagsIntersection.length !== 0) {
      return true;
    }

    // noinspection RedundantIfStatementJS
    if (tags.includes(elementLabel)) {
      return true;
    }

    return false;
  }

  function isVisibleByTimeRange(index: number): boolean {
    const {end, isAllSelected} = UMAPTimeRangeStore;
    const start = UMAPTimeRangeStore.start[0];

    if (isAllSelected) {
      return true;
    }

    if (start === null || end === null) {
      return true;
    }

    const {dataset} = UMAPDatasetStore;
    const timestamp = Number(dataset?.metadata[index]['timestamp']);

    // noinspection RedundantIfStatementJS
    if (timestamp >= start && timestamp <= end) {
      return true;
    }

    return false;
  }

  function isVisibleByColumns(index: number): boolean {
    const {columns: columnsSelection} = UMAPColumnsStore;
    let isVisible = true;

    const {dataset} = UMAPDatasetStore;

    // @ts-expect-error TS2322
    const columns: UMAPColumnsStoreInterface['columns'] = dataset?.metadata[index]['columns'];

    const columnsSelectionKeys = Object.keys(columnsSelection);
    const columnsKeys = Object.keys(columns);

    for (let i = 0; i < columnsSelectionKeys.length; ++i) {
      // item is already not visible
      if (!isVisible) {
        break;
      }

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
        isVisible = columnSelectionValues.includes(columnValue as number);
      }
    }

    return isVisible;
  }

  function isVisibleByQueryComplex(index: number, columnsNames: ConfigStoreInterface['columnsNames']): boolean {
    // @SPECIES=CERBRA+CYACAE @SEASON=SPRING
    // @TIME=POST
    // @SPECIES=CerBra @TIME=PRE
    // (@SPECIES=CERBRA @QUAND=PRE)+(@SPECIES=CERBRA @QUAND=POST)

    const {queryComplex} = UMAPQueryComplexStore;

    const queryKeys = Object.keys(queryComplex);

    if (queryKeys.length === 0) {
      return true;
    }

    const {dataset} = UMAPDatasetStore;
    const columns = dataset?.metadata[index]['columns'] as string;

    let result = true;

    for (let i = 0; i < queryKeys.length; ++i) {
      const key = queryKeys[i];
      const keyIndex = columnsNames?.indexOf(key);

      if (typeof keyIndex === 'undefined' || keyIndex === -1) {
        continue;
      }

      const query = queryComplex[key];
      const column = columns[keyIndex];

      if (!result) {
        break;
      }

      if (typeof query === 'string') {
        // string
        result = column.includes(query);
      } else {
        // array
        result = query.reduce((acc, q) => {
          if (acc) {
            return acc;
          }

          return column.includes(q);
        }, false);
      }
    }

    return result;
  }

  function shouldBeFiltered(index: number, columnNames: ConfigStoreInterface['columnsNames']): boolean {
    return !isVisibleByTags(index) || !isVisibleByTimeRange(index) || !isVisibleByQuery(index) || !isVisibleByColumns(index) || !isVisibleByQueryComplex(index, columnNames);
  }

  return {
    shouldBeFiltered,
  };
}
