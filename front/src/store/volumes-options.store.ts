import {reactive} from 'vue';
import type {VariableType} from '../types/variable.type';

export interface VolumesOptionsStoreInterface {
  activeSites: string[];
  activeVariable: VariableType;
  activeRange: string | null;
  activeIntervalLabel: string | null;
  activeAggregate: number;
}

export const volumesOptionsStore = reactive<VolumesOptionsStoreInterface>({
  activeSites: [],
  activeVariable: 'sumvar',
  activeRange: null,
  activeIntervalLabel: null,
  activeAggregate: 3600, // seconds
});
