import {useRefHistory} from '@vueuse/core';
import {useAggregations} from 'src/composables/use-aggregations';
import {useClientSettings} from 'src/composables/use-client-settings';
import {DraggableKey, useDraggables} from 'src/composables/use-draggables';
import {useIntervalAudioAutoload} from 'src/composables/use-interval-audio-autoload';
import {type Interval, useIntervals} from 'src/composables/use-intervals';
import {useAudioFile} from 'src/draggables/audio/use-audio-file';
import {computed, ref} from 'vue';

const currentIndex = ref<number | null>(null);
const {history, undo, redo, canUndo, canRedo} = useRefHistory(currentIndex);

const currentInterval = ref<Interval | null>(null);
const hasInterval = computed<boolean>(() => currentInterval.value !== null);

export function useIntervalTransport() {
  const {isAudioAutoOpen, isDetailsAutoOpen} = useClientSettings();
  const {open} = useDraggables();
  const {isLoading} = useAudioFile();
  const {aggregations} = useAggregations();
  const {intervals} = useIntervals();
  const {autoload} = useIntervalAudioAutoload();

  const selectInterval = (index: number | null) => {
    if (
      isLoading.value ||
      currentIndex.value === index ||
      intervals.value === null
    ) {
      return;
    }

    currentIndex.value = index;
    currentInterval.value = index === null ? index : intervals.value[index];

    if (isAudioAutoOpen.value && currentInterval.value !== null) {
      autoload(currentInterval.value);
      open(DraggableKey.enum.audio);
    }

    if (isDetailsAutoOpen.value) {
      open(DraggableKey.enum.details);
    }
  };

  const forward = () => {
    if (currentIndex.value === null || aggregations.value === null) {
      return;
    }

    let nextIndex = currentIndex.value + 1;

    if (nextIndex >= aggregations.value.timestamps.length) {
      nextIndex = 0;
    }

    selectInterval(nextIndex);
  };

  const back = () => {
    if (currentIndex.value === null || aggregations.value === null) {
      return;
    }

    let previousIndex = currentIndex.value - 1;

    if (previousIndex < 0) {
      previousIndex = aggregations.value.timestamps.length - 1;
    }

    selectInterval(previousIndex);
  };

  return {
    currentIndex,
    currentInterval,
    hasInterval,
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
