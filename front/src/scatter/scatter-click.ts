import {useDraggables} from 'src/composables/draggables';
import {useAudioFile} from 'src/draggables/audio/audio-file';
import {settingsStore} from 'src/draggables/settings/settings-store';
import {computed, ref} from 'vue';

const clickedIndex = ref<number | null>(null);
const hasClicked = computed<boolean>(() => clickedIndex.value !== null);

export function useScatterClick() {
  const {isLoading} = useAudioFile();
  const {store} = useDraggables();

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

    if (settingsStore.autoOpenOnScatterClick && !store.details) {
      store.details = true;
    }
  };

  return {
    clickedIndex: clickedIndex,
    hasClicked: hasClicked,
    handleClick: handleClick,
  };
}
