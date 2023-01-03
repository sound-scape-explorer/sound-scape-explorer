import {reactive} from 'vue';
import type {ConfigInterface} from '../interfaces/config.interface';

export interface ConfigStoreInterface {
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
