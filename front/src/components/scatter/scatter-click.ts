import {useClientSettings} from 'src/composables/client-settings';
import {useDraggables} from 'src/composables/draggables';
import {useAudioFile} from 'src/draggables/audio/audio-file';
import {computed, ref} from 'vue';

const clickedIndex = ref<number | null>(null);
const hasClicked = computed<boolean>(() => clickedIndex.value !== null);

export function useScatterClick() {
  const {isLoading} = useAudioFile();
  const {store} = useDraggables();
  const {openDetailsOnScatterClick} = useClientSettings();

  const handleClick = (index: number | null) => {
    if (clickedIndex.value === index) {
      return;
    }

    if (isLoading.value) {
      return;
    }

    clickedIndex.value = index;

    if (index === null) {
      return;
    }

    if (openDetailsOnScatterClick.value && !store.details) {
      store.details = true;
    }
  };
  return {
    clickedIndex: clickedIndex,
    hasClicked: hasClicked,
    handleClick: handleClick,
  };
}
