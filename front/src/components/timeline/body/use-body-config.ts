import {ref} from 'vue';

const rowMin = 5;
const rowHeight = 18;
const rows = ref<number>(rowMin);

const elementGaps = {top: 2, bottom: 4};

export function useBodyConfig() {
  return {
    rows: rows,
    rowHeight: rowHeight,
    elementGaps: elementGaps,
  };
}
