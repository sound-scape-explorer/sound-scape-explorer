import {asyncComputed} from '@vueuse/core';
import {Dataset, File as H5File, Group, ready} from 'h5wasm';
import {StorageMode} from '../common/StorageMode';
import {StoragePath} from '../common/StoragePath';
import {selectionStore} from '../components/Selection/selectionStore';
import {settingsStore} from '../components/Settings/settingsStore';
import {MATRIX_NAMES, PAIRING_NAMES} from '../constants';
import {buildNestedArray} from '../utils/build-nested-array';

export interface StorageSettings {
  audio_folder: string;
  audio_host: string;
  base_path: string;
  expected_sample_rate: number;
  timezone: string;
  umap_seed: number;
}

export type StorageBands = {[band: string]: number[]};
export type StorageRanges = {[range: string]: number[]};
export type StorageMetas = {[property: string]: string[]};

interface Reducer {
  index: number;
  name: string;
  dimensions: number;
  bands: string[];
  integrations: string[];
  ranges: string[];
}

export interface Volume {
  index: number;
  name: string;
  values: number[];
}

type Indicator = Volume;

type Matrix = Volume;

interface Pairing {
  index: number;
  name: string;
  values: number[][];
}

export async function useStorage() {
  const {FS} = await ready;
  const mountPoint = '/home/web_user';
  const fileName = 'sse.h5';
  const filePath = `${mountPoint}/${fileName}`;

  initializeBrowserStorage();

  function initializeBrowserStorage() {
    if (settingsStore.storage.isReady) {
      return;
    }

    // @ts-expect-error TS2339
    FS.mount(FS.filesystems.IDBFS, {}, mountPoint);
    settingsStore.storage.isReady = true;
  }

  async function isLoaded(): Promise<boolean> {
    return new Promise((resolve) => {
      const request = window.indexedDB.open(mountPoint);
      request.onsuccess = () => {
        const length = request.result.objectStoreNames.length;
        resolve(length !== 0);
      };
    });
  }

  function deleteBrowserStorage() {
    window.indexedDB.deleteDatabase(mountPoint);
    window.location.reload();
  }

  async function importUploadedFile(file: File): Promise<void> {
    const arrayBuffer = await file.arrayBuffer();
    FS.writeFile(filePath, new Uint8Array(arrayBuffer));
    save();
  }

  function read<T>(callback: () => T): Promise<T> {
    return new Promise((resolve) => {
      FS.syncfs(true, () => {
        const payload = callback();
        return resolve(payload);
      });
    });
  }

  function save() {
    FS.syncfs(false, () => {
      window.location.reload();
    });
  }

  function getH5(): H5File {
    if (!settingsStore.storage.isReady) {
      throw new Error('Storage is not ready!');
    }

    if (settingsStore.storage.file !== null) {
      return settingsStore.storage.file;
    }

    settingsStore.storage.file = new H5File(filePath, StorageMode.readonly);
    return settingsStore.storage.file;
  }

  async function initializeFile(): Promise<boolean> {
    return await read(() => {
      try {
        const file = getH5();
        const configuration = file.get(StoragePath.configuration) as Group;
        return configuration !== null;
      } catch {
        return false;
      }
    });
  }

  async function getFiles(): Promise<string[]> {
    return await read(() => {
      const file = getH5();
      const files = file.get(StoragePath.files) as Dataset;
      return files.to_array() as string[];
    });
  }

  async function getFile(fileIndex: number) {
    return await read(() => {
      const file = getH5();
      const files = file.get(StoragePath.files) as Dataset;
      const array = files.to_array() as string[];
      return array[fileIndex];
    });
  }

  async function getFilesFeatures(band: string): Promise<number[][]> {
    return await read(async () => {
      const file = getH5();
      const files = await getFiles();

      const features = [];

      for (const f in files) {
        const path = `${StoragePath.features}/${band}/${f}`;
        const feature = file.get(path) as Dataset;
        features.push(feature.to_array() as number[]);
      }

      return features;
    });
  }

  async function getFilesTimestamps(): Promise<number[]> {
    return await read(() => {
      const file = getH5();
      const timestamps = file.get(StoragePath.timestamps) as Dataset;
      return timestamps.to_array() as number[];
    });
  }

  async function getFilesSites(): Promise<string[]> {
    return await read(() => {
      const file = getH5();
      const sites = file.get(StoragePath.files_sites) as Dataset;
      return sites.to_array() as string[];
    });
  }

  async function getFilesMetas(): Promise<string[][]> {
    return await read(() => {
      const h5 = getH5();
      const metas = h5.get(StoragePath.files_metas) as Dataset;
      return metas.to_array() as string[][];
    });
  }

  async function getStorageMetas(
    band: string,
    integrationName: string,
  ): Promise<StorageMetas> {
    return await read(() => {
      const h5 = getH5();
      const integration = getSecondsFromIntegration(h5, integrationName);

      const metaProperties = (
        h5.get(StoragePath.meta_properties) as Dataset
      ).to_array() as string[];
      const metaSets = (
        h5.get(StoragePath.meta_sets) as Dataset
      ).to_array() as string[][];

      const metas: StorageMetas = {};

      const autoclusterPath = `${StoragePath.autocluster}/${band}/${integration}`;
      const autocluster = h5.get(autoclusterPath) as Dataset | null;

      if (autocluster !== null) {
        const autoclusterList = new Set(
          (autocluster.to_array() as number[]).map((n) => n.toString()),
        );
        metas['AUTOCLUSTER'] = [...autoclusterList];
      }

      for (let i = 0; i < metaProperties.length; i += 1) {
        const property = metaProperties[i];
        metas[property] = metaSets[i].filter((element) => element !== '');
      }

      return metas;
    });
  }

  async function getBands(): Promise<StorageBands> {
    return await read(() => {
      const file = getH5();

      const bands = file.get(StoragePath.bands) as Dataset;
      const bandsValues = bands.to_array() as string[];

      const bandsFrequencies = file.get(
        StoragePath.bands_frequencies,
      ) as Dataset;
      const bandsFrequenciesValues = bandsFrequencies.to_array() as number[][];

      const bandsObject: StorageBands = {};

      for (const [index, band] of bandsValues.entries()) {
        bandsObject[band] = bandsFrequenciesValues[index];
      }

      return bandsObject;
    });
  }

  async function getIntegrations(): Promise<string[]> {
    return await read(() => {
      const file = getH5();
      const integrations = file.get(StoragePath.integrations) as Dataset;
      return integrations.to_array() as string[];
    });
  }

  async function getStorageRanges(): Promise<StorageRanges> {
    return await read(() => {
      const file = getH5();
      const ranges = (
        file.get(StoragePath.ranges) as Dataset
      ).to_array() as string[];
      const timestamps = (
        file.get(StoragePath.ranges_timestamps) as Dataset
      ).to_array() as number[][];

      const storageRanges: StorageRanges = {};

      for (const r in ranges) {
        const range = ranges[r];
        storageRanges[range] = timestamps[r];
      }

      return storageRanges;
    });
  }

  function getSecondsFromIntegration(
    file: H5File,
    integration: string,
  ): number {
    const integrations = (
      file.get(StoragePath.integrations) as Dataset
    ).to_array() as string[];
    const seconds = (
      file.get(StoragePath.integrations_seconds) as Dataset
    ).to_array() as number[];

    const index = integrations.indexOf(integration);

    if (index === -1) {
      throw new Error(`UMAP name not found: ${integration}`);
    }

    return seconds[index];
  }

  async function getGroupIndexAndSeconds(
    band: string,
    integration: string,
    timestamp: number,
  ): Promise<[number, number]> {
    return await read(async () => {
      const file = getH5();
      const timestamps = await getGroupedTimestamps(band, integration);
      const groupLength = timestamps[0].length;
      const timestampIndex = timestamps.flat().indexOf(timestamp);
      const groupIndex = timestampIndex % groupLength;

      const seconds = getSecondsFromIntegration(file, integration);

      return [groupIndex, seconds];
    });
  }

  async function getGroupedTimestamps(
    band: string,
    integration: string,
  ): Promise<number[][]> {
    return await read(() => {
      const file = getH5();
      const seconds = getSecondsFromIntegration(file, integration);
      const path = `${StoragePath.grouped_timestamps}/${band}/${seconds}`;

      const timestampsGroup = file.get(path) as Group;
      const timestamps: number[][] = [];

      for (const fileIndex in timestampsGroup.keys()) {
        const dataset = timestampsGroup.get(fileIndex) as Dataset;
        const array = dataset.to_array() as number[];
        timestamps.push(array);
      }

      return timestamps;
    });
  }

  async function getRanges(): Promise<string[][]> {
    return await read(() => {
      const file = getH5();
      const ranges = file.get(StoragePath.ranges) as Dataset;
      return ranges.to_array() as string[][];
    });
  }

  async function getGroupedFeatures(
    band: string,
    integration: string,
    fileIndex: number,
    groupIndex: number,
  ): Promise<number[]> {
    return await read(async () => {
      const file = getH5();
      const seconds = getSecondsFromIntegration(file, integration);
      const path = `${StoragePath.grouped_features}/${band}/${seconds}/${fileIndex}`;
      const features = file.get(path) as Dataset;
      const array = features.to_array() as number[][];
      return array[groupIndex];
    });
  }

  async function getSettings(): Promise<StorageSettings> {
    return await read(() => {
      const file = getH5();
      const configuration = file.get(StoragePath.configuration) as Dataset;
      const attributes = configuration.attrs;

      const settings: Partial<StorageSettings> = {};

      for (const key of Object.keys(attributes)) {
        // @ts-expect-error TS7053
        settings[key] = attributes[key].to_array();
      }

      return settings as StorageSettings;
    });
  }

  async function getReducersNames(): Promise<string[]> {
    return await read(() => {
      const file = getH5();
      const names = file.get(StoragePath.reducers) as Dataset;
      return names.to_array() as string[];
    });
  }

  async function getReducersDimensions(): Promise<number[]> {
    return await read(() => {
      const file = getH5();
      const names = file.get(StoragePath.reducers_dimensions) as Dataset;
      return names.to_array() as number[];
    });
  }

  function trimRectangular<T>(
    array: T[][],
    filterWith: string | number | null = null,
  ): T[][] {
    const isNanStrategy =
      typeof filterWith === 'number' && Number.isNaN(filterWith);

    const trimmedArray = [];

    for (const sublist of array) {
      const trimmedSublist = sublist.filter((element) => {
        if (isNanStrategy) {
          return !Number.isNaN(element);
        }

        return element !== filterWith;
      });
      trimmedArray.push(trimmedSublist);
    }

    return trimmedArray;
  }

  async function getReducersBands(): Promise<string[][]> {
    return await read(() => {
      const file = getH5();
      const names = file.get(StoragePath.reducers_bands) as Dataset;
      const array = names.to_array() as string[][];
      return trimRectangular(array, '');
    });
  }

  async function getReducersIntegrations(): Promise<string[][]> {
    return await read(() => {
      const file = getH5();
      const names = file.get(StoragePath.reducers_integrations) as Dataset;
      const array = names.to_array() as string[][];
      return trimRectangular(array, '');
    });
  }

  async function getReducersRanges(): Promise<string[][]> {
    return await read(() => {
      const file = getH5();
      const names = file.get(StoragePath.reducers_ranges) as Dataset;
      const array = names.to_array() as string[][];
      return trimRectangular(array, '');
    });
  }

  async function getReducers(): Promise<Reducer[]> {
    return await read(async () => {
      const names = await getReducersNames();
      const dimensions = await getReducersDimensions();
      const bands = await getReducersBands();
      const integrations = await getReducersIntegrations();
      const ranges = await getReducersRanges();

      const reducers: Reducer[] = [];

      for (let i = 0; i < names.length; i += 1) {
        const reducer = {
          index: i,
          name: names[i],
          dimensions: dimensions[i],
          bands: bands[i],
          integrations: integrations[i],
          ranges: ranges[i],
        };

        reducers.push(reducer);
      }

      return reducers;
    });
  }

  async function getVolumeNames() {
    return await read(() => {
      const h5 = getH5();
      const volumes = h5.get(StoragePath.volumes) as Dataset;
      return volumes.to_array() as string[];
    });
  }

  async function getIndicatorNames() {
    return await read(() => {
      const h5 = getH5();
      const indicators = h5.get(StoragePath.indicators) as Dataset;
      return indicators.to_array() as string[];
    });
  }

  async function getVolumes(band: string, integrationName: string) {
    return await read(() => {
      const h5 = getH5();
      const integration = getSecondsFromIntegration(h5, integrationName);

      const volumeNames = h5.get(StoragePath.volumes) as Dataset;
      const volumeNamesList = volumeNames.to_array() as string[];

      const volumes: Volume[] = [];

      volumeNamesList.forEach((name, v) => {
        const path = `${StoragePath.volume_}${v}/${band}/${integration}`;
        const group = h5.get(path) as Group;

        let values: number[] = [];

        for (const g in group.keys()) {
          const dataset = h5.get(`${path}/${g}`) as Dataset;

          values = [...values, ...(dataset.to_array() as number[])];
        }

        const volume: Volume = {
          index: v,
          name: name,
          values: values,
        };

        volumes.push(volume);
      });

      return volumes;
    });
  }

  async function getIndicators(
    band: string,
    integrationName: string,
  ): Promise<Indicator[]> {
    return await read(() => {
      const h5 = getH5();
      const integration = getSecondsFromIntegration(h5, integrationName);

      const indicatorNames = h5.get(StoragePath.indicators) as Dataset;
      const indicatorNamesList = indicatorNames.to_array() as string[];

      const indicators: Indicator[] = [];

      indicatorNamesList.forEach((name, i) => {
        const path = `${StoragePath.indicator_}${i}/${band}/${integration}`;
        const group = h5.get(path) as Group;

        let values: number[] = [];

        for (const g in group.keys()) {
          const dataset = h5.get(`${path}/${g}`) as Dataset;

          values = [...values, ...(dataset.to_array() as number[])];
        }

        const indicator: Indicator = {
          index: i,
          name: name,
          values: values,
        };

        indicators.push(indicator);
      });

      return indicators;
    });
  }

  async function getReducedFeatures(
    reducer: number,
    band: string,
    integration: string,
  ): Promise<number[][][]> {
    return await read(() => {
      const file = getH5();
      const seconds = getSecondsFromIntegration(file, integration);

      const path = `${StoragePath.reduced_}${reducer}/${band}/${seconds}`;

      const group = file.get(path) as Group;
      const features = [];

      for (const fileIndex in group.keys()) {
        const dataset = group.get(fileIndex) as Dataset;
        const array = dataset.to_array() as number[][];
        features.push(array);
      }

      return features;
    });
  }

  async function getAutocluster(band: string, integrationName: string) {
    return await read(() => {
      const file = getH5();
      const integration = getSecondsFromIntegration(file, integrationName);
      const path = `${StoragePath.autocluster}/${band}/${integration}`;
      const autocluster = file.get(path) as Dataset | null;

      if (autocluster === null) {
        return [];
      }

      const lengthPerGroup = getLengthPerGroup(file, band, integration);
      const flatArray = autocluster.to_array() as number[];
      return buildNestedArray(flatArray, lengthPerGroup);
    });
  }

  function getLengthPerGroup(file: H5File, band: string, integration: number) {
    const fileIndex = 0;
    const path = `${StoragePath.grouped_timestamps}/${band}/${integration}/${fileIndex}`;
    const dataset = file.get(path) as Dataset;
    return dataset.shape[0];
  }

  async function getAsyncLengthPerGroup(band: string, integrationName: string) {
    return await read(() => {
      const h5 = getH5();
      const integration = getSecondsFromIntegration(h5, integrationName);
      return getLengthPerGroup(h5, band, integration);
    });
  }

  async function getVolumeNew(
    band: string,
    integrationName: string,
    volumeIndex: number,
    metaIndex: number,
  ) {
    return await read(() => {
      const h5 = getH5();
      const integration = getSecondsFromIntegration(h5, integrationName);
      const path = `${StoragePath.volume_}${volumeIndex}/${band}/${integration}/${metaIndex}`;
      const dataset = h5.get(path) as Dataset;
      return dataset.to_array() as number[];
    });
  }

  const volumesRef = asyncComputed(async () => {
    if (!selectionStore.band || !selectionStore.integration) {
      return;
    }

    return await getVolumes(selectionStore.band, selectionStore.integration);
  });

  const volumeNamesRef = asyncComputed(async () => {
    return await getVolumeNames();
  });

  async function getMatrix(
    band: string,
    integrationName: string,
    matrixIndex: number,
    metaIndex: number,
  ) {
    return await read(() => {
      const h5 = getH5();
      const integration = getSecondsFromIntegration(h5, integrationName);
      const path = `${StoragePath.matrix_}${matrixIndex}/${band}/${integration}/${metaIndex}`;
      const dataset = h5.get(path) as Dataset;
      return dataset.to_array() as number[];
    });
  }

  async function getPairing(
    band: string,
    integrationName: string,
    pairingIndex: number,
    metaIndexA: number,
    metaIndexB: number,
  ) {
    return await read(() => {
      const h5 = getH5();
      const integration = getSecondsFromIntegration(h5, integrationName);
      const path = `${StoragePath.pairing_}${pairingIndex}/${band}/${integration}/${metaIndexA}/${metaIndexB}`;
      const dataset = h5.get(path) as Dataset;
      return dataset.to_array() as number[];
    });
  }

  async function getMatrices(band: string, integrationName: string) {
    return await read(() => {
      const h5 = getH5();
      const integration = getSecondsFromIntegration(h5, integrationName);

      const matrices: Matrix[] = [];

      MATRIX_NAMES.forEach((name, v) => {
        const path = `${StoragePath.matrix_}${v}/${band}/${integration}`;
        const group = h5.get(path) as Group;

        let values: number[] = [];

        for (const g in group.keys()) {
          const dataset = h5.get(`${path}/${g}`) as Dataset;

          values = [...values, ...(dataset.to_array() as number[])];
        }

        const matrix: Matrix = {
          index: v,
          name: name,
          values: values,
        };

        matrices.push(matrix);
      });

      return matrices;
    });
  }

  async function getPairings(band: string, integrationName: string) {
    return await read(() => {
      const h5 = getH5();
      const integration = getSecondsFromIntegration(h5, integrationName);

      const pairings: Pairing[] = [];

      PAIRING_NAMES.forEach((name, p) => {
        const path = `${StoragePath.pairing_}${p}/${band}/${integration}`;
        const pGroup = h5.get(path) as Group;

        let values: number[][] = [];

        for (const pG in pGroup.keys()) {
          const aGroup = h5.get(`${path}/${pG}`) as Group;

          for (const aG in aGroup.keys()) {
            const dataset = h5.get(`${path}/${pG}/${aG}`) as Dataset;

            values = [...values, dataset.to_array() as number[]];
          }
        }

        const pairing: Pairing = {
          index: p,
          name: name,
          values: values,
        };

        pairings.push(pairing);
      });

      return pairings;
    });
  }

  const matricesRef = asyncComputed(async () => {
    if (!selectionStore.band || !selectionStore.integration) {
      return;
    }

    return await getMatrices(selectionStore.band, selectionStore.integration);
  });

  const pairingsRef = asyncComputed(async () => {
    if (!selectionStore.band || !selectionStore.integration) {
      return;
    }

    return await getPairings(selectionStore.band, selectionStore.integration);
  });

  const timezoneRef = asyncComputed(async () => {
    const settings = await getSettings();
    return settings?.timezone ?? '';
  });

  return {
    importUploadedFile: importUploadedFile,
    deleteBrowserStorage: deleteBrowserStorage,
    isLoaded: isLoaded,
    initializeFile: initializeFile,
    getSettings: getSettings,
    getFiles: getFiles,
    getFilesTimestamps: getFilesTimestamps,
    getFilesFeatures: getFilesFeatures,
    getFilesSites: getFilesSites,
    getFilesMetas: getFilesMetas,
    getBands: getBands,
    getIntegrations: getIntegrations,
    getRanges: getRanges,
    getStorageRanges: getStorageRanges,
    getStorageMetas: getStorageMetas,
    getGroupedFeatures: getGroupedFeatures,
    getGroupedTimestamps: getGroupedTimestamps,
    getGroupIndexAndSeconds: getGroupIndexAndSeconds,
    getReducers: getReducers,
    getReducedFeatures: getReducedFeatures,
    getVolumes: getVolumes,
    getVolumeNames: getVolumeNames,
    getIndicators: getIndicators,
    getIndicatorNames: getIndicatorNames,
    getAutocluster: getAutocluster,
    getFile: getFile,
    getAsyncLengthPerGroup: getAsyncLengthPerGroup,
    volumesRef: volumesRef,
    volumeNamesRef: volumeNamesRef,
    matricesRef: matricesRef,
    pairingsRef: pairingsRef,
    getMatrix: getMatrix,
    getVolumeNew: getVolumeNew,
    getPairing: getPairing,
    timezoneRef: timezoneRef,
  };
}
