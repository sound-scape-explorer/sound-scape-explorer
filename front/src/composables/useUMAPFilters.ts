import {UMAPFiltersStore} from '../store/UMAP-filters.store';
import {UMAPDatasetStore} from '../store/UMAP-dataset.store';
import {getArraysIntersection} from '../utils/get-arrays-intersection';
import {UMAPTimeRangeStore} from '../store/UMAP-time-range.store';
import {UMAPQueryStore} from '../store/UMAP-query.store';

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

  return {
    isVisibleByQuery,
    isVisibleByTags,
    isVisibleByTimeRange,
  };
}
