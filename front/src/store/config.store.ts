import {reactive} from 'vue';
import type {ConfigInterface} from '../interfaces/config.interface';

export interface ConfigStoreInterface {
  isLoaded: boolean;
  isError: boolean;
  config?: ConfigInterface;
  bands?: string[];
  intervals?: number[];
  intervalLabels?: string[];
  ranges?: string[];
  sites?: string[];
  columns?: string[][];
  columnsNames?: string[];
}

export const configStore = reactive<ConfigStoreInterface>({
  isLoaded: false,
  isError: false,
});
