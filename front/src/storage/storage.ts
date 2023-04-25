import {reactive} from 'vue';

export interface StorageSettings {
  audio_folder: string;
  audio_host: string;
  base_path: string;
  expected_sample_rate: number;
  timezone: string;
  umap_seed: number;
}

export interface StorageBands {
  [band: string]: number[];
}

export interface StorageIntegrations {
  [band: string]: number;
}

export interface StorageRanges {
  [range: string]: number[];
}

export interface Reducer {
  index: number;
  name: string;
  dimensions: number;
  bands: string[];
  integrations: string[];
  ranges: string[];
}

export interface StorageMetas {
  [property: string]: string[];
}

interface Storage {
  file: File | null;
  settings: StorageSettings | null;
  bands: StorageBands | null;
  integrations: StorageIntegrations | null;
  ranges: StorageRanges | null;
  reducers: Reducer[] | null;
  metas: StorageMetas | null;
  files: string[] | null;
  filesMetas: string[][] | null;
}

export const storage = reactive<Storage>({
  file: null,
  settings: null,
  bands: null,
  integrations: null,
  ranges: null,
  reducers: null,
  metas: null,
  files: null,
  filesMetas: null,
});
