import type {UMAPDatasetStoreInterface} from '../store/UMAP-dataset.store';
import {useUMAPFilters} from './useUMAPFilters';
import {useUMAPColumns} from './useUMAPColumns';
import {ref} from 'vue';

export function useUMAPExport() {
  const {
    isVisibleByQuery,
    isVisibleByTags,
    isVisibleByTimeRange,
  } = useUMAPFilters();
  const {isVisibleByColumns} = useUMAPColumns();
  const loadingRef = ref(false);

  function parse(dataset: UMAPDatasetStoreInterface['dataset'], name: string) {
    loadingRef.value = true;

    if (!dataset) {
      loadingRef.value = false;
      return;
    }

    const payload = [];

    const {points, metadata} = dataset;

    for (let i = 0; i < points.length; ++i) {
      const shouldBeFilteredOut = !isVisibleByTags(i) || !isVisibleByTimeRange(i) || !isVisibleByQuery(i) || !isVisibleByColumns(i);

      if (shouldBeFilteredOut) {
        continue;
      }

      const point = points[i];
      const data = metadata[i];

      payload.push({point, data});
    }

    download(payload, name);
  }

  function download(obj: unknown, name = 'SSE_UMAP') {
    const data = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(obj, undefined, 2));

    const anchor = document.createElement('a');
    anchor.href = data;
    anchor.download = `${name}.json`;
    anchor.click();
    anchor.remove();

    loadingRef.value = false;
  }

  return {
    loadingRef,
    parse,
  };
}
