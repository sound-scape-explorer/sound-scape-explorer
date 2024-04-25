import {reactive} from 'vue';

interface ScatterLoadingRef {
  value: boolean;
}

export const scatterLoadingRef = reactive<ScatterLoadingRef>({
  value: false,
});

interface ScatterLoadingTextRef {
  value: string;
}

export const scatterLoadingTextRef = reactive<ScatterLoadingTextRef>({
  value: '',
});
