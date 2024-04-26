import {useDraggables} from 'src/composables/draggables';
import {useAudioLoading} from 'src/draggables/audio/audio-loading';
import {settingsStore} from 'src/draggables/settings/settings-store';
import {computed, ref} from 'vue';

const clickedIndex = ref<number | null>(null);
const hasClicked = computed<boolean>(() => clickedIndex.value !== null);

export function useScatterClick() {
  const {verifyAudioLoading} = useAudioLoading();
  const {store} = useDraggables();

  const handleClick = (index: number | null) => {
    if (clickedIndex.value === index) {
      return;
    }

    if (!verifyAudioLoading()) {
      return;
    }

    clickedIndex.value = index;

    if (index === null) {
      return;
    }

    if (settingsStore.autoOpenOnScatterClick) {
      if (store.details === false) {
        store.details = true;
      }
    }
  };

  return {
    clickedIndex: clickedIndex,
    hasClicked: hasClicked,
    handleClick: handleClick,
  };
}
