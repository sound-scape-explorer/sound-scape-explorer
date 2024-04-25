import {useDraggables} from 'src/composables/draggables';
import {reactive} from 'vue';

import {useAudioLoading} from '../Audio/useAudioLoading';
import {settingsStore} from '../Settings/settingsStore';

interface ClickedRef {
  value: number | null;
}

// INFO: Interval index
export const clickedRef = reactive<ClickedRef>({
  value: null,
});

export function useScatterClick() {
  const {verifyAudioLoading} = useAudioLoading();
  const {store} = useDraggables();

  const handleClick = (index: number | null) => {
    if (clickedRef.value === index) {
      return;
    }

    if (!verifyAudioLoading()) {
      return;
    }

    clickedRef.value = index;

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
    handleClick: handleClick,
  };
}
