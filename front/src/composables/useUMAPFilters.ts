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
import {configStore} from '../store/config.store';
import {useUMAPDataset} from './useUMAPDataset';

export function useUMAPFilters() {
  const {getMetaContent} = useUMAPDataset();

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

  function digestQueryComplexSingleString(metaValues: string[], queryValue: string): boolean {
    return metaValues.includes(queryValue);
  }

  function digestQueryComplexSingleArray(metaValues: string[], queryValues: string[]): boolean {
    return queryValues.reduce((acc, queryValue) => {
      if (acc) {
        return acc;
      }

      return digestQueryComplexSingleString(metaValues, queryValue);
    }, false);
  }

  function digestQueryComplexItem(
    index: number,
    query: UMAPQueryComplexStoreInterface['queryComplex'],
  ): boolean {
    const metaContent = getMetaContent(index);
    const metaProperties = configStore.metaProperties;
    const queryKeys = Object.keys(query);
    const metaKeys = queryKeys.map((queryKey) => metaProperties.indexOf(queryKey));

    let isVisible = true;

    for (const metaKey of metaKeys) {
      if (!isVisible) {
        break;
      }

      const metaValues = metaContent[metaKey];
      const queryValue = query[metaProperties[metaKey]];

      if (typeof queryValue === 'string') {
        isVisible = digestQueryComplexSingleString(metaValues, queryValue);
      } else {
        isVisible = digestQueryComplexSingleArray(metaValues, queryValue as unknown as string[]);
      }
    }

    return isVisible;
  }

  function digestQueryComplexGroups(index: number): boolean {
    const queryGroups = UMAPQueryComplexStore.queryComplex;
    const queryGroupsValues = Object.values(queryGroups);

    let isVisible = true;
    const results: boolean[] = [];

    for (const query of queryGroupsValues) {
      isVisible = digestQueryComplexItem(index, query);
      results.push(isVisible);
    }

    return results.reduce((acc, r) => acc || r, false);
  }

  function isVisibleByQueryComplex(index: number): boolean {
    // @SPECIES=CerBra+LopCri @SEASON=SPRING
    // @TIME=POST
    // (@TIME=POST)
    // @SPECIES=CerBra @TIME=PRE
    // @SPECIES=CerBra @TIME=PRE+POST
    // (@SPECIES=CerBra @TIME=POST)+(@SPECIES=CerBra @TIME=PRE)
    // (@SPECIES=CerBra @TIME=PRE)+(@SPECIES=LopCri @TIME=POST)
    // @SPECIES=CerBra+LopCri @SEASON=SPRING @TIME=PRE @VER=a
    // @SPECIES=CerBra+LopCri @SEASON=SPRING @TIME=PRE @VER=a @NUM=1

    if (!UMAPQueryComplexStore.isActive) {
      return true;
    }

    let isVisible: boolean;

    if (!UMAPQueryComplexStore.hasGroups) {
      isVisible = digestQueryComplexItem(
        index,
        UMAPQueryComplexStore.queryComplex,
      );
    } else {
      isVisible = digestQueryComplexGroups(index);
    }

    return isVisible;
  }

  function shouldBeFiltered(index: number): boolean {
    return !isVisibleByTags(index)
      || !isVisibleByTimeRange(index)
      || !isVisibleByQuery(index)
      || !isVisibleByMeta(index)
      || !isVisibleByQueryComplex(index);
  }

  return {
    shouldBeFiltered,
  };
}
