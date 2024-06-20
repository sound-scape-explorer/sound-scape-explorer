import {useClientSettings} from 'src/composables/client-settings';
import {useDraggables} from 'src/composables/draggables';
import {useAudioFile} from 'src/draggables/audio/audio-file';
import {computed, ref} from 'vue';

const currentIntervalIndex = ref<number | null>(null);
const hasClicked = computed<boolean>(() => currentIntervalIndex.value !== null);

export function useAudioOpen() {
  const {isLoading} = useAudioFile();
  const {store} = useDraggables();
  const {openDetailsOnScatterClick} = useClientSettings();

  const openAudio = (index: number | null) => {
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

    if (openDetailsOnScatterClick.value && !store.details) {
      store.details = true;
    }
  };
  return {
    currentIntervalIndex: currentIntervalIndex,
    hasClicked: hasClicked,
    openAudio: openAudio,
  };
}
