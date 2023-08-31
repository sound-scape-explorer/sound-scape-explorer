import {reactive} from 'vue';

interface LabelZoomedRef {
  value: boolean;
}

export const labelZoomedRef = reactive<LabelZoomedRef>({
  value: false,
});
