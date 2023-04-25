import {ref} from 'vue';
import {EXPORT_FILENAME} from '../../constants';
import type {Point2D, Point3D} from '../../lib/scatter-gl-0.0.13';
import {useStorage} from '../../storage/useStorage';
import {convertArrayToCsv} from '../../utils/convert-array-to-csv';
import {convertObjectToJsonString} from '../../utils/convert-object-to-json-string';
import type {ScatterMetadata} from '../../utils/generate-scatter-dataset';
import {triggerBrowserDownload} from '../../utils/trigger-browser-download';
import {useNotification} from '../AppNotification/useNotification';
import {queriesComplexStore} from '../Queries/queryComplexStore';
import {queryStore} from '../Queries/queryStore';
import {selectionStore} from '../Selection/selectionStore';
import {settingsStore} from '../Settings/settingsStore';
import type {ScatterDatasetStore} from './scatterDatasetStore';
import {scatterDatasetStore} from './scatterDatasetStore';
import {useScatterFilters} from './useScatterFilters';

export type ExportType = 'json' | 'csv';

export async function useScatterExport() {
  const {notify} = useNotification();
  const {shouldBeFiltered} = useScatterFilters();
  const {readGroupedFeatures, readGroupIndexFromTimestamp, metaPropertiesRef} =
    await useStorage();

  const loadingRef = ref(false);

  function getFilename() {
    let name = EXPORT_FILENAME;

    /**
     * Selection settings
     */

    const {band, integration} = selectionStore;

    name += `_${band}_${integration}`;

    /**
     * Query
     */

    const {query} = queryStore;

    if (query) {
      name += `_Q_${query}`;
    }

    /**
     * Complex Query
     */

    const {queryComplex} = queriesComplexStore;
    const queryComplexKeys = Object.keys(queryComplex);

    if (queryComplexKeys.length > 0) {
      name += `_CQ_${Object.values(queryComplex).flat()}`;
    }

    /**
     * Time Range
     */

    // TODO: Time Range name

    /**
     * Metas
     */

    // TODO: Metas

    return name;
  }

  async function parse(
    dataset: ScatterDatasetStore['dataset'],
    name: string,
    metaProperties: string[],
    type: 'json' | 'csv' = 'json',
  ) {
    loadingRef.value = true;

    if (dataset === null) {
      loadingRef.value = false;
      return;
    }

    const payload: unknown[] = [];

    const {points, metadata} = dataset;

    if (selectionStore.band === null || selectionStore.integration === null) {
      return payload;
    }

    for (let i = 0; i < points.length; ++i) {
      const shouldBeFilteredOut = shouldBeFiltered(i, metaProperties);

      if (shouldBeFilteredOut) {
        continue;
      }

      const point = points[i];
      const data = metadata[i] as unknown as ScatterMetadata;
      const timestamp = data.timestamp;
      const [groupIndex] = await readGroupIndexFromTimestamp(timestamp);

      const fileIndex = data.fileIndex;

      const features = await readGroupedFeatures(fileIndex, groupIndex);

      if (features === null) {
        console.log(features);
        continue;
      }

      if (type === 'json') {
        payload.push({
          point: point,
          data: data,
          features: features,
        });
      } else if (type === 'csv') {
        const content = createCSVContent(point, data, features);
        payload.push(content);
      }
    }

    return payload;
  }

  function createCSVContent(
    points: Point2D | Point3D,
    data: ScatterMetadata,
    features: number[],
  ) {
    const content = [];

    settingsStore.umap.export.labels && content.push(data.fileIndex);
    settingsStore.umap.export.timestamps && content.push(data.timestamp);
    settingsStore.umap.export.points && content.push(points);
    settingsStore.umap.export.meta && content.push(data.metaValues);
    settingsStore.umap.export.features && content.push(features);

    return content;
  }

  function convertMetaPropertiesForExport(metaProperties: string[]): string[] {
    return metaProperties.map((c) => `meta_${c}`);
  }

  function createCSVFirstRow(
    metaProperties: string[],
    dimensions: number,
  ): string[] {
    const firstRow = [];

    const createDimensions = (row: unknown[]): unknown[] => {
      for (let i = 0; i < dimensions; i += 1) {
        row.push(`d_${i + 1}`);
      }

      return row;
    };

    const createFeatures = (row: unknown[]): unknown[] => {
      for (let i = 0; i < 128; i += 1) {
        row.push(`f_${i + 1}`);
      }

      return row;
    };

    settingsStore.umap.export.labels && firstRow.push('fileIndex');
    settingsStore.umap.export.timestamps && firstRow.push('timestamp');
    settingsStore.umap.export.points && createDimensions(firstRow);
    settingsStore.umap.export.meta &&
      firstRow.push(...convertMetaPropertiesForExport(metaProperties));
    settingsStore.umap.export.features && createFeatures(firstRow);

    return firstRow;
  }

  async function handleClick(type: ExportType = 'json') {
    const metaProperties = metaPropertiesRef.value;

    if (
      selectionStore.band === null ||
      selectionStore.integration === null ||
      metaProperties === null
    ) {
      return;
    }

    const filename = getFilename() || EXPORT_FILENAME;

    notify(
      'info',
      'Explore',
      'Exporting collected points. Selected points will be ignored.',
    );

    const results = await parse(
      scatterDatasetStore.dataset,
      filename,
      metaProperties,
      type,
    );

    if (typeof results === 'undefined') {
      return;
    }

    let dimensions;

    try {
      // @ts-expect-error: TS2571
      dimensions = results[0][2].length;
    } catch {
      // @ts-expect-error: TS2571
      dimensions = Object.values(results)[0].point.length;
    }

    if (type === 'json') {
      const json = convertObjectToJsonString(results);

      triggerBrowserDownload(
        json,
        `${filename}.json`,
        () => (loadingRef.value = false),
      );
    } else if (type === 'csv') {
      const firstRow = createCSVFirstRow(metaProperties, dimensions);

      const csv = convertArrayToCsv(results as string[][], firstRow);

      triggerBrowserDownload(
        csv,
        `${filename}.csv`,
        () => (loadingRef.value = false),
      );
    }
  }

  return {
    loadingRef: loadingRef,
    handleClick: handleClick,
  };
}
