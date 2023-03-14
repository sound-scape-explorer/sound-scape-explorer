import {Dataset, File as H5File, Group, ready} from 'h5wasm';
import {StorageMode} from '../enums/StorageMode';
import {StoragePath} from '../enums/StoragePath';
import {settingsStore} from '../store/settings.store';
import type {StorageSettings} from '../types/StorageSettings';

export type StorageBands = {[band: string]: number[];}
export type StorageRanges = {[range: string]: number[];}
export type StorageMetas = {[property: string]: string[];}

export interface Reducer {
  index: number;
  name: string;
  dimensions: number;
  bands: string[];
  integrations: string[];
  ranges: string[];
}

export async function useStorage() {
  const {FS} = await ready;
  const mountPoint = '/home/web_user';
  const fileName = 'sse.h5';
  const filePath = `${mountPoint}/${fileName}`;

  function initializeBrowserStorage() {
    if (settingsStore.storage.isReady) {
      return;
    }

    // @ts-expect-error TS2339
    FS.mount(FS.filesystems.IDBFS, {}, mountPoint);
    settingsStore.storage.isReady = true;
  }

  async function isLoaded(): Promise<boolean> {
    try {
      const results = await window.indexedDB.databases();
      const names = results.map((result) => result.name);

      return names.includes(mountPoint);
    } catch {
      return false;
    }
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

  function getFile(): H5File {
    if (!settingsStore.storage.isReady) {
      throw new Error('Storage is not ready!');
    }

    if (settingsStore.storage.file !== null) {
      return settingsStore.storage.file;
    }

    settingsStore.storage.file = new H5File(filePath, StorageMode.readonly);
    return settingsStore.storage.file;
  }

  async function getFiles(): Promise<string[]> {
    return await read(() => {
      const file = getFile();
      const files = file.get(StoragePath.files) as Dataset;
      return files.to_array() as string[];
    });
  }

  async function getFilesFeatures(band: string): Promise<number[][]> {
    return await read(async () => {
      const file = getFile();
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
      const file = getFile();
      const timestamps = file.get(StoragePath.timestamps) as Dataset;
      return timestamps.to_array() as number[];
    });
  }

  async function getFilesSites(): Promise<string[]> {
    return await read(() => {
      const file = getFile();
      const sites = file.get(StoragePath.files_sites) as Dataset;
      return sites.to_array() as string[];
    });
  }

  async function getFilesMetas(): Promise<string[][]> {
    return await read(() => {
      const file = getFile();
      const metas = file.get(StoragePath.files_metas) as Dataset;
      return metas.to_array() as string[][];
    });
  }

  async function getStorageMetas(): Promise<StorageMetas> {
    return await read(() => {
      const file = getFile();

      const metaProperties = (file.get(StoragePath.meta_properties) as Dataset).to_array() as string[];
      const metaSets = (file.get(StoragePath.meta_sets) as Dataset).to_array() as string[][];

      const metas: StorageMetas = {};

      for (let i = 0; i < metaProperties.length; i += 1) {
        const property = metaProperties[i];
        metas[property] = metaSets[i].filter((element) => element !== '');
      }

      return metas;
    });
  }

  async function getBands(): Promise<StorageBands> {
    return await read(() => {
      const file = getFile();

      const bands = file.get(StoragePath.bands) as Dataset;
      const bandsValues = bands.to_array() as string[];

      const bandsFrequencies = file.get(StoragePath.bands_frequencies) as Dataset;
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
      const file = getFile();
      const integrations = file.get(StoragePath.integrations) as Dataset;
      return integrations.to_array() as string[];
    });
  }

  async function getStorageRanges(): Promise<StorageRanges> {
    return await read(() => {
      const file = getFile();
      const ranges = (file.get(StoragePath.ranges) as Dataset).to_array() as string[];
      const timestamps = (file.get(StoragePath.ranges_timestamps) as Dataset).to_array() as number[][];

      const storageRanges: StorageRanges = {};

      for (const r in ranges) {
        const range = ranges[r];
        storageRanges[range] = timestamps[r];
      }

      return storageRanges;
    });
  }

  function getSecondsFromIntegration(file: H5File, integration: string): number {
    const integrations = (file.get(StoragePath.integrations) as Dataset).to_array() as string[];
    const seconds = (file.get(StoragePath.integrations_seconds) as Dataset).to_array() as number[];

    const index = integrations.indexOf(integration);

    if (index === -1) {
      throw new Error(`UMAP name not found: ${integration}`);
    }

    return seconds[index];
  }

  async function getGroupedTimestamps(
    band: string,
    integration: string,
  ): Promise<number[][]> {
    return await read(() => {
      const file = getFile();
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
      const file = getFile();
      const ranges = file.get(StoragePath.ranges) as Dataset;
      return ranges.to_array() as string[][];
    });
  }

  async function getGroupedFeatures(
    band: string,
    integrations: string,
    fileIndex: number,
    timestamp: number,
  ): Promise<number[]> {
    return await read(async () => {
      const groupTimestamps = await getGroupedTimestamps(band, integrations);
      const timestamps = groupTimestamps.flat();
      const index = timestamps.indexOf(timestamp);

      const file = getFile();
      const integration = getSecondsFromIntegration(file, integrations);
      const path = `${StoragePath.grouped_features}/${band}/${integration}/${fileIndex}`;
      const groupFeatures = file.get(path) as Dataset;
      const features = groupFeatures.to_array() as number[][];

      return features[index % integration];
    });
  }

  async function getSettings(): Promise<StorageSettings> {
    return await read(() => {
      const file = getFile();
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
      const file = getFile();
      const names = file.get(StoragePath.reducers) as Dataset;
      return names.to_array() as string[];
    });
  }

  async function getReducersDimensions(): Promise<number[]> {
    return await read(() => {
      const file = getFile();
      const names = file.get(StoragePath.reducers_dimensions) as Dataset;
      return names.to_array() as number[];
    });
  }

  function trimRectangular<T>(
    array: T[][],
    filterWith: string | number | null = null,
  ): T[][] {
    const trimmedArray = [];

    for (const sublist of array) {
      const trimmedSublist = sublist.filter((element) => element !== filterWith);
      trimmedArray.push(trimmedSublist);
    }

    return trimmedArray;
  }

  async function getReducersBands(): Promise<string[][]> {
    return await read(() => {
      const file = getFile();
      const names = file.get(StoragePath.reducers_bands) as Dataset;
      const array = names.to_array() as string[][];
      return trimRectangular(array, '');
    });
  }

  async function getReducersIntegrations(): Promise<string[][]> {
    return await read(() => {
      const file = getFile();
      const names = file.get(StoragePath.reducers_integrations) as Dataset;
      const array = names.to_array() as string[][];
      return trimRectangular(array, '');
    });
  }

  async function getReducersRanges(): Promise<string[][]> {
    return await read(() => {
      const file = getFile();
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

  async function getVolumes(): Promise<string[]> {
    return await read(() => {
      const file = getFile();
      const volumes = file.get(StoragePath.volumes) as Dataset;
      return volumes.to_array() as string[];
    });
  }

  async function getIndicators(): Promise<string[]> {
    return await read(() => {
      const file = getFile();
      const indicators = file.get(StoragePath.indicators) as Dataset;
      return indicators.to_array() as string[];
    });
  }

  async function getReducedFeatures(
    reducer: number,
    band: string,
    integration: string,
  ): Promise<number[][][]> {
    return await read(() => {
      const file = getFile();
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

  initializeBrowserStorage();

  return {
    importUploadedFile,
    deleteBrowserStorage,
    isLoaded,
    getSettings,
    getFiles,
    getFilesTimestamps,
    getFilesFeatures,
    getFilesSites,
    getFilesMetas,
    getBands,
    getIntegrations,
    getRanges,
    getStorageRanges,
    getStorageMetas,
    getGroupedFeatures,
    getGroupedTimestamps,
    getReducers,
    getReducedFeatures,
    getVolumes,
    getIndicators,
  };
}
