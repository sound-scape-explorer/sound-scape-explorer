import {Dataset, File as H5File, Group, ready} from 'h5wasm';
import {StorageModeEnum} from '../enums/StorageModeEnum';
import {StoragePathEnum} from '../enums/StoragePathEnum';
import {settingsStore} from '../store/settings.store';

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

    settingsStore.storage.file = new H5File(filePath, StorageModeEnum.readonly);
    return settingsStore.storage.file;
  }

  async function getStorageFiles(): Promise<string[]> {
    return await read(() => {
      const file = getFile();
      const files = file.get(StoragePathEnum.files) as Dataset;
      return files.to_array() as string[];
    });
  }

  async function getStorageFilesTimestamps(): Promise<number[]> {
    return await read(() => {
      const file = getFile();
      const timestamps = file.get(StoragePathEnum.files_timestamps) as Dataset;
      return timestamps.to_array() as number[];
    });
  }

  async function getStorageFilesTags(): Promise<string[]> {
    return await read(() => {
      const file = getFile();
      const tags = file.get(StoragePathEnum.files_tags) as Dataset;
      return tags.to_array() as string[];
    });
  }

  async function getStorageFilesMetas(): Promise<string[][]> {
    return await read(() => {
      const file = getFile();
      const metas = file.get(StoragePathEnum.files_metas) as Dataset;
      return metas.to_array() as string[][];
    });
  }

  async function getStorageMetas(): Promise<StorageMetas> {
    return await read(() => {
      const file = getFile();

      const metaProperties = (file.get(StoragePathEnum.meta_properties) as Dataset).to_array() as string[];
      const metaSets = file.get(StoragePathEnum.meta_sets) as Group;

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

      const bands = file.get(StoragePathEnum.bands) as Dataset;
      const bandsValues = bands.to_array() as string[];

      const bandsFrequencies = file.get(StoragePathEnum.bands_frequencies) as Dataset;
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
      const integrations = file.get(StoragePathEnum.umaps) as Dataset;
      return integrations.to_array() as string[];
    });
  }

  async function getStorageRanges(): Promise<StorageRanges> {
    return await read(() => {
      const file = getFile();
      const ranges = file.get(StoragePathEnum.ranges) as Dataset;
      const rangesValues = ranges.to_array() as string[];

      const storageRanges: StorageRanges = {};

      for (const range of rangesValues) {
        console.log(range);
        storageRanges[range] = [0, 0];
      }

      return storageRanges;
    });
  }

  function getUMAPsFeaturesPath(
    band: string,
    integration: number,
  ): string {
    const rootPath = StoragePathEnum.groups_features_reduced;
    return `${rootPath}/${band}/${integration}`;
  }

  function getIntegrationFromUmapName(file: H5File, umapName: string): number {
    const umaps = (file.get(StoragePathEnum.umaps) as Dataset).to_array() as string[];
    const umapsIntegrations = (file.get(StoragePathEnum.umaps_integrations) as Dataset).to_array() as number[];

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

  async function getStorageUmapsTimestamps(
    bandName: string,
    umapName: string,
  ): Promise<number[][]> {
    return await read(() => {
      const file = getFile();
      const integration = getIntegrationFromUmapName(file, umapName);
      const path = `${StoragePathEnum.groups_timestamps}/${bandName}/${integration}`;

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

  async function getStorageGroupsFeatures(
    band: string,
    integration: string,
    timestamp: number,
    i: number,
  ): Promise<number[]> {
    return await read(async () => {
      const file = getFile();

      const timestampsPath = `${StoragePathEnum.groups_timestamps}/${band}/${integration}`;

      const timestampsGroup = file.get(timestampsPath) as Group;
      const timestamps: number[][] = [];

      for (const fileIndex in timestampsGroup.keys()) {
        const dataset = timestampsGroup.get(fileIndex) as Dataset;
        const array = dataset.to_array() as number[];
        timestamps.push(array);
      }

      const fileIndex = timestamps[0].indexOf(timestamp);

      if (fileIndex === -1) {
        throw new Error('Error');
      }

      const path = `${StoragePathEnum.groups_features}/${band}/${integration}/${fileIndex}`;
      const features = file.get(path) as Dataset;

      console.log(path, features);

      return features.to_array() as number[];
    });
  }

  initializeBrowserStorage();

  return {
    importUploadedFile,
    getStorageFiles,
    getStorageFilesTimestamps,
    getStorageFilesTags,
    getStorageFilesMetas,
    getStorageBands,
    getStorageIntegrations,
    getStorageUmapsFeatures,
    getStorageUmapsTimestamps,
    getStorageRanges,
    getStorageMetas,
    getStorageGroupsFeatures,
  };
}
