import {reactive} from 'vue';

interface ScatterStore {
  container: HTMLDivElement | null;
}

export const scatterStore = reactive<ScatterStore>({
  container: null,
});

export const scatterHoverStore = reactive<{index: number | null;}>({
  index: null,
});

export const scatterSelectedStore = reactive<{index: number | null;}>({
  index: null,
});

interface ScatterAlphasStore {
  low: number;
  high: number;
}

export const scatterAlphasStore = reactive<ScatterAlphasStore>({
  low: 0.005,
  high: 0.3,
});
