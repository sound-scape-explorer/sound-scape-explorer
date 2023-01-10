import {reactive} from 'vue';
import type {ConfigInterface} from '../interfaces/config.interface';

export interface ConfigStoreInterface {
  version: string;
  isLoaded: boolean;
  isError: boolean;
  config?: ConfigInterface;
  bands: string[];
  intervals: number[];
  intervalLabels: string[];
  ranges: string[];
  sites: string[];
  metaProperties: string[];
  metaContents: string[][];
}

export const configStore = reactive<ConfigStoreInterface>({
  version: '',
  isLoaded: false,
  isError: false,
  bands: [],
  intervals: [],
  intervalLabels: [],
  ranges: [],
  sites: [],
  metaProperties: [],
  metaContents: [],
});
