import {reactive} from 'vue';
import type {VariableType} from '../types/variable.type';

export interface VolumesStore {
  activeSites: string[];
  activeVariable: VariableType;
  activeRange: string | null;
  activeBand: string | null;
  activeInterval: string | null;
}

export const volumesStore = reactive<VolumesStore>({
  activeSites: [],
  activeVariable: 'sumvar',
  activeRange: null,
  activeBand: null,
  activeInterval: null,
});
