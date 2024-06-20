import {ref} from 'vue';

const isAllSelected = ref<boolean>(true);
const duration = ref<number>(3600);
const current = ref<number>(-1);
const min = ref<number>(-1);
const max = ref<number>(-1);

export function useDraggableTime() {
  return {
    isAllSelected: isAllSelected,
    duration: duration,
    current: current,
    min: min,
    max: max,
  };
}
