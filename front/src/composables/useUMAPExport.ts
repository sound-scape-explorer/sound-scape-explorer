import {ref} from 'vue';
import {UMAP_EXPORT_FILENAME} from '../constants';
import type {Point2D, Point3D, PointMetadata} from '../lib/scatter-gl-0.0.13';
import {selectionStore} from '../store/selection.store';
import {settingsStore} from '../store/settings.store';
import type {UMAPDatasetStoreInterface} from '../store/UMAP-dataset.store';
import {UMAPDatasetStore} from '../store/UMAP-dataset.store';
import {UMAPMetaStore} from '../store/UMAP-meta.store';
import {UMAPQueryComplexStore} from '../store/UMAP-query-complex.store';
import {UMAPQueryStore} from '../store/UMAP-query.store';
import {convertArrayToCsv} from '../utils/convert-array-to-csv';
import {
  convertObjectToJsonString,
} from '../utils/convert-object-to-json-string';
import {fetchFeatures} from '../utils/fetch-features';
import {
  getRangeAndSiteFromDatasetLabel,
} from '../utils/get-range-and-site-from-dataset-label';
import {triggerBrowserDownload} from '../utils/trigger-browser-download';
import {useNotification} from './useNotification';
import {useStorage} from './useStorage';
import {useUMAPFilters} from './useUMAPFilters';

export function useUMAPExport() {
  const {notify} = useNotification();
  const {shouldBeFiltered} = useUMAPFilters();
  const loadingRef = ref(false);

  function getFilename() {
    let name = UMAP_EXPORT_FILENAME;

    /**
     * Selection settings
     */

    const {band, umapName} = selectionStore;

    name += `_${band}_${umapName}`;

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

    // TODO: Time Range name

    /**
     * Columns
     */

    const {metaSelection} = UMAPMetaStore;
    const columnsValues = Object.values(metaSelection);

    for (let i = 0; i < columnsValues.length; ++i) {
      const value = columnsValues[i];
      console.log(value);

      if (value.length === 0) {
        continue;
      }

      // const string = value.join('+');
      const string = value;

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

  async function parse(
    dataset: UMAPDatasetStoreInterface['dataset'],
    name: string,
    metaProperties: string[],
    type: 'json' | 'csv' = 'json',
  ) {
    loadingRef.value = true;

    if (!dataset) {
      loadingRef.value = false;
      return;
    }

    const payload: unknown[] = [];

    const {points, metadata} = dataset;

    if (!selectionStore.band || !selectionStore.umapName) {
      return payload;
    }

    for (let i = 0; i < points.length; ++i) {
      const shouldBeFilteredOut = shouldBeFiltered(i, metaProperties);

      if (shouldBeFilteredOut) {
        continue;
      }

      const point = points[i];
      const data = metadata[i];

      const label = data.label;

      if (!label) {
        continue;
      }

      const {range, site} = getRangeAndSiteFromDatasetLabel(label);
      const timestamp = data.timestamp as number;

      const features = await fetchFeatures({
        band,
        range,
        site,
        interval,
        timestamp,
      });

      if (type === 'json') {
        payload.push({
          point,
          data,
          features,
        });
      } else if (type === 'csv') {
        const content = createCSVContent(data, points[i], features);
        payload.push(content);
      }
    }

    return payload;
  }

  function createCSVContent(data: PointMetadata, points: Point2D | Point3D, features: number[]) {
    const content = [];

    settingsStore.umap.export.labels && content.push(data['label']);
    settingsStore.umap.export.timestamps && content.push(data['timestamp']);
    settingsStore.umap.export.points && content.push(points);
    settingsStore.umap.export.tags && content.push(data['tags']);
    settingsStore.umap.export.meta && content.push(data['metaContent']);
    settingsStore.umap.export.features && content.push(features);

    return content;
  }

  function convertMetaPropertiesForExport(metaProperties: string[]): string[] {
    return metaProperties.map((c) => `meta_${c}`);
  }

  function createCSVFirstRow(metaProperties: string[]): string[] {
    const firstRow = [];

    settingsStore.umap.export.labels && firstRow.push('label');
    settingsStore.umap.export.timestamps && firstRow.push('timestamp');
    settingsStore.umap.export.points && firstRow.push('2D_X');
    settingsStore.umap.export.points && firstRow.push('2D_Y');
    settingsStore.umap.export.tags && firstRow.push('tags');
    settingsStore.umap.export.meta && firstRow.push(...convertMetaPropertiesForExport(metaProperties));
    settingsStore.umap.export.features && firstRow.push('features');

    return firstRow;
  }

  async function handleClick(type: 'json' | 'csv' = 'json') {
    const {getStorageMetas} = await useStorage();
    const metas = await getStorageMetas();
    const metaProperties = Object.keys(metas);

    const filename = getFilename() || UMAP_EXPORT_FILENAME;

    if (!filename) {
      return;
    }

    notify(
      'info',
      'UMAP',
      'Exporting collected points. Selected points are not handled.',
    );

    const results = await parse(UMAPDatasetStore.dataset, filename, metaProperties, type);

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
      const firstRow = createCSVFirstRow(metaProperties);

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
  }

  return {
    loadingRef,
    handleClick,
  };
}
