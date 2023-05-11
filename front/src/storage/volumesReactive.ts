import {reactive} from 'vue';
import type {Volume} from './useStorage';

export interface VolumesReactive {
  data: null | Volume[];
}

export const volumesReactive = reactive<VolumesReactive>({
  data: null,
});
