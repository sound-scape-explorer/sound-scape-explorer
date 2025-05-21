import {useRefHistory} from '@vueuse/core';
import {useAggregations} from 'src/composables/use-aggregations';
import {useClientSettings} from 'src/composables/use-client-settings';
import {DraggableKey, useDraggables} from 'src/composables/use-draggables';
import {useAudioFile} from 'src/draggables/audio/use-audio-file';
import {computed, ref} from 'vue';

const currentIntervalIndex = ref<number | null>(null);
const {history, undo, redo, canUndo, canRedo} =
  useRefHistory(currentIntervalIndex);
const hasClicked = computed<boolean>(() => currentIntervalIndex.value !== null);

export function useIntervalSelector() {
  const {isAudioAutoOpen, isDetailsAutoOpen} = useClientSettings();
  const {open} = useDraggables();
  const {isLoading} = useAudioFile();
  const {aggregations} = useAggregations();

  const selectInterval = (index: number | null) => {
    if (isLoading.value || currentIntervalIndex.value === index) {
      return;
    }

    currentIntervalIndex.value = index;

    if (isAudioAutoOpen.value) {
      open(DraggableKey.enum.audio);
    }

    if (isDetailsAutoOpen.value) {
      open(DraggableKey.enum.details);
    }
  };

  const forward = () => {
    if (currentIntervalIndex.value === null || aggregations.value === null) {
      return;
    }

    let nextIndex = currentIntervalIndex.value + 1;

    if (nextIndex >= aggregations.value.timestamps.length) {
      nextIndex = 0;
    }

    selectInterval(nextIndex);
  };

  const back = () => {
    if (currentIntervalIndex.value === null || aggregations.value === null) {
      return;
    }

    let previousIndex = currentIntervalIndex.value - 1;

    if (previousIndex < 0) {
      previousIndex = aggregations.value.timestamps.length - 1;
    }

    selectInterval(previousIndex);
  };

  return {
    currentIntervalIndex,
    hasClicked,
    selectInterval,
    history,
    undo,
    redo,
    canUndo,
    canRedo,
    forward,
    back,
  };
}
