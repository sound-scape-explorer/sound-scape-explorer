import {useRefHistory} from '@vueuse/core';
import {useStorageAggregatedTimestamps} from 'src/composables/use-storage-aggregated-timestamps';
import {useAudioFile} from 'src/draggables/audio/use-audio-file';
import {computed, ref} from 'vue';

const currentIntervalIndex = ref<number | null>(null);
const {history, undo, redo, canUndo, canRedo} =
  useRefHistory(currentIntervalIndex);
const hasClicked = computed<boolean>(() => currentIntervalIndex.value !== null);

export function useIntervalSelector() {
  const {isLoading} = useAudioFile();
  const {aggregatedTimestamps} = useStorageAggregatedTimestamps();

  const selectInterval = (index: number | null) => {
    if (currentIntervalIndex.value === index) {
      return;
    }

    if (isLoading.value) {
      return;
    }

    currentIntervalIndex.value = index;

    if (index === null) {
      return;
    }
  };

  const forward = () => {
    if (
      currentIntervalIndex.value === null ||
      aggregatedTimestamps.value === null
    ) {
      return;
    }

    let n = currentIntervalIndex.value + 1;

    if (n >= aggregatedTimestamps.value.length) {
      n = 0;
    }

    currentIntervalIndex.value = n;
  };

  const back = () => {
    if (
      currentIntervalIndex.value === null ||
      aggregatedTimestamps.value === null
    ) {
      return;
    }

    let p = currentIntervalIndex.value - 1;

    if (p < 0) {
      p = aggregatedTimestamps.value.length - 1;
    }

    currentIntervalIndex.value = p;
  };

  return {
    currentIntervalIndex: currentIntervalIndex,
    hasClicked: hasClicked,
    selectInterval: selectInterval,
    history: history,
    undo: undo,
    redo: redo,
    canUndo: canUndo,
    canRedo: canRedo,
    forward: forward,
    back: back,
  };
}
