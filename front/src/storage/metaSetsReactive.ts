import {reactive} from 'vue';

export interface MetaSetsReactive {
  data: null | string[][];
}

export const metaSetsReactive = reactive<MetaSetsReactive>({
  data: null,
});
