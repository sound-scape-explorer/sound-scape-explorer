import type {UMAPDatasetStoreInterface} from '../store/UMAP-dataset.store';
import {useUMAPFilters} from './useUMAPFilters';
import {ref} from 'vue';
import {downloadObjectAsJson} from '../utils/download-object-as-json';
import type {ConfigStoreInterface} from '../store/config.store';

export function useUMAPExport() {
  const {
    shouldBeFiltered,
  } = useUMAPFilters();
  const loadingRef = ref(false);

  function parse(dataset: UMAPDatasetStoreInterface['dataset'], name: string, columnsNames: ConfigStoreInterface['columnsNames']) {
    loadingRef.value = true;

    if (!dataset) {
      loadingRef.value = false;
      return;
    }

    const payload = [];

    const {points, metadata} = dataset;

    for (let i = 0; i < points.length; ++i) {
      const shouldBeFilteredOut = shouldBeFiltered(i, columnsNames);

      if (shouldBeFilteredOut) {
        continue;
      }

      const point = points[i];
      const data = metadata[i];

      payload.push({point, data});
    }

    downloadObjectAsJson({
      obj: payload,
      fileName: name,
      callback: () => loadingRef.value = false,
    });
  }

  return {
    loadingRef,
    parse,
  };
}
