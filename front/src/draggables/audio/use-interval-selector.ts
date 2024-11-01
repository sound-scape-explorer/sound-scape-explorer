import {useRefHistory} from '@vueuse/core';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useDraggables} from 'src/composables/use-draggables';
import {useStorageAggregatedTimestamps} from 'src/composables/use-storage-aggregated-timestamps';
import {useAudioFile} from 'src/draggables/audio/use-audio-file';
import {computed, ref} from 'vue';

const currentIntervalIndex = ref<number | null>(null);
const {history, undo, redo, canUndo, canRedo} =
  useRefHistory(currentIntervalIndex);
const hasClicked = computed<boolean>(() => currentIntervalIndex.value !== null);

export function useIntervalSelector() {
  const {isLoading} = useAudioFile();
  const {open} = useDraggables();
  const {isDetailsAutoOpen} = useClientSettings();
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

    if (isDetailsAutoOpen.value) {
      open('details');
    }
  };

  const forward = () => {
    if (
      currentIntervalIndex.value === null ||
      aggregatedTimestamps.value === null
    ) {
      return;
    }

    const n = currentIntervalIndex.value + 1;

    if (n > aggregatedTimestamps.value.length) {
      return;
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

    const p = currentIntervalIndex.value - 1;

    if (p < 0) {
      return;
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
