import {reactive} from 'vue';

interface Index {
  value: number | null;
}

interface FileName {
  path: string | null;
}

export const fileNameStore = reactive<FileName>({
  path: null,
});

export const fileIndexStore = reactive<Index>({
  value: null,
});

export const groupIndexStore = reactive<Index>({
  value: null,
});

export const fileTimestampStore = reactive<Index>({
  value: null,
});
