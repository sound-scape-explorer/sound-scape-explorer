import {reactive} from 'vue';

interface ScatterResetRef {
  value: boolean;
}

// TODO: Remove
export const scatterResetRef = reactive<ScatterResetRef>({
  value: false,
});
