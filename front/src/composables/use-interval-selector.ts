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
  const {isAudioAutoOpen, isDetailsAutoOpen} = useClientSettings();
  const {open} = useDraggables();
  const {isLoading} = useAudioFile();
  const {aggregatedTimestamps} = useStorageAggregatedTimestamps();

  const selectInterval = (index: number | null) => {
    if (isLoading.value || currentIntervalIndex.value === index) {
      return;
    }

    currentIntervalIndex.value = index;

    if (isAudioAutoOpen.value) {
      open('audio');
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

    let nextIndex = currentIntervalIndex.value + 1;

    if (nextIndex >= aggregatedTimestamps.value.length) {
      nextIndex = 0;
    }

    selectInterval(nextIndex);
  };

  const back = () => {
    if (
      currentIntervalIndex.value === null ||
      aggregatedTimestamps.value === null
    ) {
      return;
    }

    let previousIndex = currentIntervalIndex.value - 1;

    if (previousIndex < 0) {
      previousIndex = aggregatedTimestamps.value.length - 1;
    }

    selectInterval(previousIndex);
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
