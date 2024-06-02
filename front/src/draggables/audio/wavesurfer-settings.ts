import {ref} from 'vue';

const showDecibels = ref<boolean>(false);
const overflowLegends = ref<boolean>(false);

export function useWavesurferSettings() {
  return {
    showDecibels: showDecibels,
    overflowLegends: overflowLegends,
  };
}
