import {reactive} from 'vue';

interface ScatterResetRef {
  value: boolean;
}

export const scatterResetRef = reactive<ScatterResetRef>({
  value: false,
});
