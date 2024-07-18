import {useRefHistory} from '@vueuse/core';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useDraggables} from 'src/composables/use-draggables';
import {useAudioFile} from 'src/draggables/audio/use-audio-file';
import {computed, ref} from 'vue';

const currentIntervalIndex = ref<number | null>(null);
const {undo, redo, canUndo, canRedo} = useRefHistory(currentIntervalIndex);
const hasClicked = computed<boolean>(() => currentIntervalIndex.value !== null);

export function useAudioSelector() {
  const {isLoading} = useAudioFile();
  const {open} = useDraggables();
  const {isDetailsAutoOpen} = useClientSettings();

  const select = (index: number | null) => {
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

  return {
    currentIntervalIndex: currentIntervalIndex,
    hasClicked: hasClicked,
    selectAudio: select,
    undo: undo,
    redo: redo,
    canUndo: canUndo,
    canRedo: canRedo,
  };
}
