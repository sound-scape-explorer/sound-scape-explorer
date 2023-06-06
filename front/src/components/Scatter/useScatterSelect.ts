import {reactive} from 'vue';

interface ScatterSelectPreviousRef {
  value: boolean;
}

export const scatterSelectPreviousRef = reactive<ScatterSelectPreviousRef>({
  value: false,
});

interface ScatterSelectNextRef {
  value: boolean;
}

export const scatterSelectNextRef = reactive<ScatterSelectNextRef>({
  value: false,
});
