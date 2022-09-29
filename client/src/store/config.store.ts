import {reactive} from 'vue';
import type {ConfigInterface} from '../interfaces/config.interface';

export interface ConfigStore {
  isLoaded: boolean;
  config?: ConfigInterface;
  bands?: string[];
  intervals?: number[];
  intervalLabels?: string[];
  ranges?: string[];
  sites?: string[];
}

export const configStore = reactive<ConfigStore>({
  isLoaded: false,
});
