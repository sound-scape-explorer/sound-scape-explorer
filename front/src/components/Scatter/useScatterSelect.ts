import {reactive} from 'vue';

interface ScatterSelectPreviousRef {
  value: boolean;
}

// TODO: Remove
export const scatterSelectPreviousRef = reactive<ScatterSelectPreviousRef>({
  value: false,
});

interface ScatterSelectNextRef {
  value: boolean;
}

// TODO: Remove
export const scatterSelectNextRef = reactive<ScatterSelectNextRef>({
  value: false,
});
