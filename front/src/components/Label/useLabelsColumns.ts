import {reactive} from 'vue';

interface LabelsColumnsRef {
  value: number;
}

export const labelsColumnsRef = reactive<LabelsColumnsRef>({
  value: 1,
});
