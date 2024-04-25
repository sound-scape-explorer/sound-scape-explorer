import {reactive} from 'vue';

interface LabelColumnsRef {
  value: number;
}

export const labelColumnsRef = reactive<LabelColumnsRef>({
  value: 1,
});
