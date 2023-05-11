import {reactive} from 'vue';
import type {Volume} from './useStorage';

export interface IndicatorsReactive {
  data: null | Volume[];
}

export const indicatorsReactive = reactive<IndicatorsReactive>({
  data: null,
});
