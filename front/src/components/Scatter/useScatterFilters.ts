import {metaPropertiesRef} from 'src/hooks/useStorageMetaProperties';
import {metaSelectionStore} from '../Meta/metaSelectionStore';
import type {QueryComplexStore} from '../Queries/queryComplexStore';
import {queriesComplexStore} from '../Queries/queryComplexStore';
import {queryStore} from '../Queries/queryStore';
import {timeStore} from '../Time/timeStore';
import {datasetRef} from './useScatterDataset';
import {groupedTimestampsRef} from 'src/hooks/useStorageGroupedTimestamps';
import {groupedMetasRef} from 'src/hooks/useStorageGroupedMetas';

export function useScatterFilters() {
  function isVisibleByQuery(index: number): boolean {
    const {matches, query} = queryStore;

    if (query === '') {
      return true;
    }

    if (datasetRef.value === null) {
      return true;
    }

    const elementLabel = datasetRef.value.metadata[index]['label'] as string;

    // noinspection RedundantIfStatementJS
    if (matches.includes(elementLabel)) {
      return true;
    }

    return false;
  }

  function isVisibleByTimeRange(index: number): boolean {
    if (timeStore.isAllSelected) {
      return true;
    }

    if (datasetRef.value === null || groupedTimestampsRef.value === null) {
      return false;
    }

    const timestamp = groupedTimestampsRef.value[index] / 1000;

    const start = timeStore.value;
    const duration = timeStore.duration;
    const end = start + duration;

    return timestamp >= start && timestamp <= end;
  }

  function isVisibleByMeta(index: number): boolean {
    let isVisible = true;

    if (datasetRef.value === null || groupedMetasRef.value === null) {
      return false;
    }

    const metaValues = groupedMetasRef.value[index];

    const metaSelectedIndexes = Object.keys(metaSelectionStore.selection);
    const metaIndexes = Object.keys(metaValues);

    for (let i = 0; i < metaSelectedIndexes.length; ++i) {
      // item is already not visible
      if (!isVisible) {
        break;
      }

      const metaSelection =
        metaSelectionStore.selection[metaSelectedIndexes[i]];
      const metaSelectionValues = Object.values(metaSelection);

      // no user selection
      if (metaSelectionValues.length === 0) {
        continue;
      }

      const metaIndex = Number(metaIndexes[i]);
      const meta = metaValues[metaIndex];
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

  function digestQueryComplexSingleArray(
    metaValues: string,
    queryValues: string[],
  ): boolean {
    return queryValues.reduce((acc, queryValue) => {
      if (acc) {
        return acc;
      }

      return digestQueryComplexSingleString(metaValues, queryValue);
    }, false);
  }

  function digestQueryComplexItem(
    index: number,
    query: QueryComplexStore['queryComplex'],
  ): boolean {
    if (metaPropertiesRef.value === null || groupedMetasRef.value === null) {
      return true;
    }

    const metaContent = groupedMetasRef.value[index];
    const queryKeys = Object.keys(query);
    const metaKeys = queryKeys.map((queryKey) => {
      if (metaPropertiesRef.value === null) {
        return -1;
      }

      return metaPropertiesRef.value.indexOf(queryKey);
    });

    let isVisible = true;

    for (const metaKey of metaKeys) {
      if (!isVisible) {
        break;
      }

      const metaValues = metaContent[metaKey];
      const queryValue = query[metaPropertiesRef.value[metaKey]];

      if (typeof queryValue === 'string') {
        isVisible = digestQueryComplexSingleString(metaValues, queryValue);
      } else {
        isVisible = digestQueryComplexSingleArray(
          metaValues,
          queryValue as unknown as string[],
        );
      }
    }

    return isVisible;
  }

  function digestQueryComplexGroups(index: number): boolean {
    const queryGroups = queriesComplexStore.queryComplex;
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

    if (!queriesComplexStore.isActive) {
      return true;
    }

    let isVisible: boolean;

    if (!queriesComplexStore.hasGroups) {
      isVisible = digestQueryComplexItem(
        index,
        queriesComplexStore.queryComplex,
      );
    } else {
      isVisible = digestQueryComplexGroups(index);
    }

    return isVisible;
  }

  function shouldBeFiltered(index: number): boolean {
    return (
      // !isVisibleByTimeRange(index) ||
      // !isVisibleByQuery(index) ||
      // !isVisibleByQueryComplex(index) ||
      !isVisibleByMeta(index)
    );
  }

  return {
    shouldBeFiltered: shouldBeFiltered,
  };
}
