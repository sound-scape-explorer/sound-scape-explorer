import type {UMAPDatasetStoreInterface} from '../store/UMAP-dataset.store';
import {UMAPDatasetStore} from '../store/UMAP-dataset.store';
import {useUMAPFilters} from './useUMAPFilters';
import {ref} from 'vue';
import type {ConfigStoreInterface} from '../store/config.store';
import {UMAPQueryStore} from '../store/UMAP-query.store';
import {UMAPQueryComplexStore} from '../store/UMAP-query-complex.store';
import {UMAPTimeRangeStore} from '../store/UMAP-time-range.store';
import {UMAPColumnsStore} from '../store/UMAP-columns.store';
import {useConfig} from './useConfig';
import {
  convertObjectToJsonString,
} from '../utils/convert-object-to-json-string';
import {triggerBrowserDownload} from '../utils/trigger-browser-download';
import {convertArrayToCsv} from '../utils/convert-array-to-csv';
import {selectionStore} from '../store/selection.store';
import {UMAP_EXPORT_FILENAME} from '../constants';

export function useUMAPExport() {
  const {
    shouldBeFiltered,
  } = useUMAPFilters();
  const loadingRef = ref(false);

  function getFilename() {
    let name = UMAP_EXPORT_FILENAME;

    /**
     * Selection settings
     */

    const {band, interval} = selectionStore;

    name += `_${band}_${interval}`;

    /**
     * Query
     */

    const {query} = UMAPQueryStore;

    if (query) {
      name += `_Q_${query}`;
    }

    /**
     * Complex Query
     */

    const {queryComplex} = UMAPQueryComplexStore;
    const queryComplexKeys = Object.keys(queryComplex);

    if (queryComplexKeys.length > 0) {
      name += `_CQ_${Object.values(queryComplex).flat()}`;
    }

    /**
     * Time Range
     */

    const {isAllSelected, start: s, end} = UMAPTimeRangeStore;
    const start = s[0];

    if (!isAllSelected) {
      name += `_${start}-${end}`;
    }

    /**
     * Columns
     */

    const {columns} = UMAPColumnsStore;
    const columnsValues = Object.values(columns);

    for (let i = 0; i < columnsValues.length; ++i) {
      const value = columnsValues[i];

      if (value.length === 0) {
        continue;
      }

      const string = value.join('+');

      if (string === '') {
        continue;
      }

      if (i === 0) {
        name += '_C';
      }

      name += `_${string}`;
    }

    return name;
  }

  function parse(
    dataset: UMAPDatasetStoreInterface['dataset'],
    name: string,
    columnsNames: ConfigStoreInterface['columnsNames'],
    type: 'json' | 'csv' = 'json',
  ) {
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

      if (type === 'json') {
        payload.push({point, data});
      } else if (type === 'csv') {
        payload.push([
          metadata[i]['label'],
          metadata[i]['timestamp'],
          points[i],
          // TODO: Add coordinates in 128 dimensions (ASAP)
          // TODO: Add volumes (later)
          metadata[i]['tags'],
          metadata[i]['columns'],
        ]);
      }
    }

    return payload;
  }

  function handleClick(type: 'json' | 'csv' = 'json') {
    useConfig().then(({columnsNames}) => {
      const filename = getFilename() || UMAP_EXPORT_FILENAME;

      if (!filename || !columnsNames) {
        return;
      }

      const results = parse(UMAPDatasetStore.dataset, filename, columnsNames, type);

      if (!results) {
        return;
      }

      if (type === 'json') {
        const json = convertObjectToJsonString(results);

        triggerBrowserDownload({
          data: json,
          filename: `${filename}.json`,
          callback: () => loadingRef.value = false,
        });
      } else if (type === 'csv') {
        const firstRow = [
          'label',
          'timestamp',
          '2D_X',
          '2D_Y',
          'tags',
          ...columnsNames.map((c) => `col_${c}`),
        ];

        const csv = convertArrayToCsv(
          results as string[][],
          firstRow,
        );

        triggerBrowserDownload({
          data: csv,
          filename: `${filename}.csv`,
          callback: () => loadingRef.value = false,
        });
      }
    });
  }

  return {
    loadingRef,
    handleClick,
  };
}
