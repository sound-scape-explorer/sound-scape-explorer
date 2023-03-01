import {Dataset, File as H5File, Group, ready} from 'h5wasm';
import {StorageMode} from '../enums/StorageMode';
import {StoragePath} from '../enums/StoragePath';
import {settingsStore} from '../store/settings.store';
import type {StorageSettings} from '../types/StorageSettings';

export type StorageBand = Partial<StorageBands>
export type StorageBands = {[band: string]: number[];}
export type StorageRanges = {[range: string]: number[];}
export type StorageMetas = {[property: string]: string[];}

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

  async function importUploadedFile(file: File): Promise<void> {
    const arrayBuffer = await file.arrayBuffer();
    FS.writeFile(filePath, new Uint8Array(arrayBuffer));
    save();
    window.location.reload();
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
    FS.syncfs(false, () => null);
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

  async function getFilesTimestamps(): Promise<number[]> {
    return await read(() => {
      const file = getFile();
      const timestamps = file.get(StoragePath.files_timestamps) as Dataset;
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

  async function getStorageFilesTags(): Promise<string[]> {
    return await read(() => {
      const file = getFile();
      const tags = file.get(StoragePath.files_tags) as Dataset;
      return tags.to_array() as string[];
    });
  }

  async function getStorageFilesMetas(): Promise<string[][]> {
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
      const metaSets = file.get(StoragePath.meta_sets) as Group;

      const metas: StorageMetas = {};

      for (const property of metaProperties) {
        metas[property] = (metaSets.get(property) as Dataset).to_array() as string[];
      }

      return metas;
    });
  }

  async function getStorageBands(): Promise<StorageBands> {
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

  async function getStorageIntegrations(): Promise<string[]> {
    return await read(() => {
      const file = getFile();
      const integrations = file.get(StoragePath.umaps) as Dataset;
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

  function getUMAPsFeaturesPath(
    band: string,
    integration: number,
  ): string {
    const rootPath = StoragePath.groups_features_reduced_umap_2d;
    return `${rootPath}/${band}/${integration}`;
  }

  function getIntegrationFromUmapName(file: H5File, umapName: string): number {
    const umaps = (file.get(StoragePath.umaps) as Dataset).to_array() as string[];
    const umapsIntegrations = (file.get(StoragePath.umaps_integrations) as Dataset).to_array() as number[];

    const umapIndex = umaps.indexOf(umapName);

    if (umapIndex === -1) {
      throw new Error(`UMAP name not found: ${umapName}`);
    }

    return umapsIntegrations[umapIndex];
  }

  async function getStorageUmapsFeatures(
    band: string,
    umapName: string, // TODO: Is called `integration` previously...
  ): Promise<number[][][]> {
    return await read(() => {
      const file = getFile();
      const integration = getIntegrationFromUmapName(file, umapName);
      const path = getUMAPsFeaturesPath(band, integration);

      const umapsGroup = file.get(path) as Group;
      const umapsFeatures = [];

      for (const fileIndex in umapsGroup.keys()) {
        const dataset = umapsGroup.get(fileIndex) as Dataset;
        const array = dataset.to_array() as number[][];
        umapsFeatures.push(array);
      }

      return umapsFeatures;
    });
  }

  async function getGroupTimestamps(
    bandName: string,
    umapName: string,
  ): Promise<number[][]> {
    return await read(() => {
      const file = getFile();
      const integration = getIntegrationFromUmapName(file, umapName);
      const path = `${StoragePath.groups_timestamps}/${bandName}/${integration}`;

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

  async function getStorageUmapsRanges(): Promise<string[][]> {
    return await read(() => {
      const file = getFile();
      const ranges = file.get(StoragePath.umaps_ranges) as Dataset;
      return ranges.to_array() as string[][];
    });
  }

  async function getGroupFeatures(
    band: string,
    umapName: string,
    fileIndex: number,
    timestamp: number,
  ): Promise<number[]> {
    return await read(async () => {
      const groupTimestamps = await getGroupTimestamps(band, umapName);
      const timestamps = groupTimestamps.flat();
      const index = timestamps.indexOf(timestamp);

      const file = getFile();
      const integration = getIntegrationFromUmapName(file, umapName);
      const path = `${StoragePath.groups_features}/${band}/${integration}/${fileIndex}`;
      const groupFeatures = file.get(path) as Dataset;
      const features = groupFeatures.to_array() as number[][];

      return features[index % integration];
    });
  }

  async function getStorageSettings(): Promise<StorageSettings> {
    return await read(() => {
      const file = getFile();
      const configuration = file.get(StoragePath.configuration) as Dataset;
      const attributes = configuration.attrs;

      let settings: Partial<StorageSettings> = {};

      for (const key of Object.keys(attributes)) {
        // @ts-expect-error TS7053
        settings[key] = attributes[key].to_array();
      }

      return settings as StorageSettings;
    });
  }

  async function getStorageUmaps(): Promise<string[]> {
    return await read(() => {
      const file = getFile();
      const umaps = file.get(StoragePath.umaps) as Dataset;
      return umaps.to_array() as string[];
    });
  }

  initializeBrowserStorage();

  return {
    importUploadedFile,
    getFiles,
    getFilesTimestamps,
    getFilesSites,
    getStorageFilesTags,
    getStorageFilesMetas,
    getStorageBands,
    getStorageRanges,
    getStorageIntegrations,
    getStorageUmaps,
    getStorageUmapsFeatures,
    getGroupTimestamps,
    getStorageUmapsRanges,
    getStorageMetas,
    getGroupFeatures,
    getStorageSettings,
  };
}
