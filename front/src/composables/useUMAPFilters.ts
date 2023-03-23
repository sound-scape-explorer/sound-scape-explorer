import {UMAPDatasetStore} from '../store/UMAP-dataset.store';
import type {UMAPMetaStoreInterface} from '../store/UMAP-meta.store';
import {UMAPMetaStore} from '../store/UMAP-meta.store';
import type {
  UMAPQueryComplexStoreInterface,
} from '../store/UMAP-query-complex.store';
import {UMAPQueryComplexStore} from '../store/UMAP-query-complex.store';
import {UMAPQueryStore} from '../store/UMAP-query.store';
import {UMAPTimeRangeStore} from '../store/UMAP-time-range.store';
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

  function isVisibleByTimeRange(index: number): boolean {
    if (UMAPTimeRangeStore.isAllSelected) {
      return true;
    }

    const {dataset} = UMAPDatasetStore;

    if (!dataset) {
      return false;
    }

    const timestamp = Number(dataset.metadata[index]['timestamp']) / 1000;

    const start = UMAPTimeRangeStore.value ?? 0;
    const duration = UMAPTimeRangeStore.duration;
    const end = start + duration;

    return timestamp >= start && timestamp <= end;
  }

  function isVisibleByMeta(index: number): boolean {
    let isVisible = true;

    const {dataset} = UMAPDatasetStore;

    // @ts-expect-error TS2322
    const metaContent: UMAPMetaStoreInterface['metaSelection'] = dataset?.metadata[index]['metaValues'];
    const metaSelectionKeys = Object.keys(UMAPMetaStore.metaSelection);
    const metaKeys = Object.keys(metaContent);

    for (let i = 0; i < metaSelectionKeys.length; ++i) {
      // item is already not visible
      if (!isVisible) {
        break;
      }

      const metaSelection = UMAPMetaStore.metaSelection[metaSelectionKeys[i]];
      const metaSelectionValues = Object.values(metaSelection);

      // no user selection
      if (metaSelectionValues.length === 0) {
        continue;
      }

      const meta = metaContent[metaKeys[i]];
      isVisible = metaSelectionValues.includes(meta);
    }

    return isVisible;
  }

  function digestQueryComplexSingleString(
    metaValues: string,
    queryValue: string,
  ): boolean {
    return metaValues.includes(queryValue);
  }

  function digestQueryComplexSingleArray(metaValues: string, queryValues: string[]): boolean {
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
    metaProperties: string[],
  ): boolean {
    const metaContent = getMetaContent(index);
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

  function digestQueryComplexGroups(
    index: number,
    metaProperties: string[],
  ): boolean {
    const queryGroups = UMAPQueryComplexStore.queryComplex;
    const queryGroupsValues = Object.values(queryGroups);

    let isVisible = true;
    const results: boolean[] = [];

    for (const query of queryGroupsValues) {
      isVisible = digestQueryComplexItem(index, query, metaProperties);
      results.push(isVisible);
    }

    return results.reduce((acc, r) => acc || r, false);
  }

  function isVisibleByQueryComplex(
    index: number,
    metaProperties: string[],
  ): boolean {
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
        metaProperties,
      );
    } else {
      isVisible = digestQueryComplexGroups(index, metaProperties);
    }

    return isVisible;
  }

  function shouldBeFiltered(
    index: number,
    metaProperties: string[],
  ): boolean {
    return !isVisibleByTimeRange(index)
      || !isVisibleByQuery(index)
      || !isVisibleByMeta(index)
      || !isVisibleByQueryComplex(index, metaProperties);
  }

  return {
    shouldBeFiltered,
  };
}
