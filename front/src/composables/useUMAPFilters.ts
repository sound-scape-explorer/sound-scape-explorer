import {UMAPFiltersStore} from '../store/UMAP-filters.store';
import {UMAPDatasetStore} from '../store/UMAP-dataset.store';
import {getArraysIntersection} from '../utils/get-arrays-intersection';
import {UMAPTimeRangeStore} from '../store/UMAP-time-range.store';
import {UMAPQueryStore} from '../store/UMAP-query.store';
import type {
  UMAPQueryComplexStoreInterface,
} from '../store/UMAP-query-complex.store';
import {UMAPQueryComplexStore} from '../store/UMAP-query-complex.store';
import type {UMAPMetaStoreInterface} from '../store/UMAP-meta.store';
import {UMAPMetaStore} from '../store/UMAP-meta.store';
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

  function isVisibleByMeta(index: number): boolean {
    const {metaSelection} = UMAPMetaStore;
    let isVisible = true;

    const {dataset} = UMAPDatasetStore;

    // @ts-expect-error TS2322
    const metaContent: UMAPMetaStoreInterface['metaSelection'] = dataset?.metadata[index]['metaContent'];

    const columnsSelectionKeys = Object.keys(metaSelection);
    const columnsKeys = Object.keys(metaContent);

    for (let i = 0; i < columnsSelectionKeys.length; ++i) {
      // item is already not visible
      if (!isVisible) {
        break;
      }

      const columnSelection = metaSelection[columnsSelectionKeys[i]];
      const column = metaContent[columnsKeys[i]];

      const columnSelectionValues = Object.values(columnSelection);

      // no user selection
      if (columnSelectionValues.length === 0) {
        continue;
      }

      const columnValues = Object.values(column);
      const columnValue = columnValues[0];

      if (typeof columnValue === 'number') {
        isVisible = columnSelectionValues.includes(columnValue.toString());
      } else {
        isVisible = columnSelectionValues.includes(columnValue);
      }
    }

    return isVisible;
  }

  function digestQueryComplexItem(
    queryComplex: UMAPQueryComplexStoreInterface['queryComplex'],
    keys: string[],
    metaContents: string,
    metaProperties: ConfigStoreInterface['metaProperties'],
  ) {
    let result = true;

    for (const key of keys) {
      const metaPropertyIndex = metaProperties.indexOf(key);

      if (metaPropertyIndex === -1) {
        continue;
      }

      const query = queryComplex[key];
      const metaContent = metaContents[metaPropertyIndex];

      if (!result) {
        break;
      }

      if (typeof query === 'string') {
        // string
        result = metaContent.includes(query);
      } else {
        // array
        // @ts-expect-error TS2349
        result = query.reduce((acc, q) => {
          if (acc) {
            return acc;
          }

          return metaContent.includes(q);
        }, false);
      }
    }

    return result;
  }

  function isVisibleByQueryComplex(
    index: number,
    metaProperties: ConfigStoreInterface['metaProperties'],
  ): boolean {
    // @SPECIES=CERBRA+CYACAE @SEASON=SPRING
    // @TIME=POST
    // @SPECIES=CerBra @TIME=PRE
    // (@SPECIES=CerBra @TIME=PRE)+(@SPECIES=LopCri @TIME=POST)

    const {queryComplex} = UMAPQueryComplexStore;

    const queryKeys = Object.keys(queryComplex);

    if (queryKeys.length === 0) {
      return true;
    }

    const {dataset} = UMAPDatasetStore;
    const columns = dataset?.metadata[index]['columns'] as string;

    let result: boolean;

    if (queryKeys[0].includes('GROUP_')) {
      result = false;

      queryKeys.forEach((groupName) => {
        const singleQueryComplex = queryComplex[groupName];
        const singleQueryComplexKeys = Object.keys(singleQueryComplex);

        // @ts-expect-error TS2345
        result = digestQueryComplexItem(singleQueryComplex, singleQueryComplexKeys, columns, metaProperties);
      });
    } else {
      result = digestQueryComplexItem(queryComplex, queryKeys, columns, metaProperties);
    }

    return result;
  }

  function shouldBeFiltered(
    index: number,
    metaProperties: ConfigStoreInterface['metaProperties'],
  ): boolean {
    return !isVisibleByTags(index)
      || !isVisibleByTimeRange(index)
      || !isVisibleByQuery(index)
      || !isVisibleByMeta(index)
      || !isVisibleByQueryComplex(index, metaProperties);
  }

  return {
    shouldBeFiltered,
  };
}
