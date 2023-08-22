import type {BlockDetails} from 'src/hooks/useAggregatedIntervalDetails';
import {reactive} from 'vue';

import {appDraggablesStore} from '../AppDraggable/appDraggablesStore';

interface CurrentAudioFileRef {
  value: BlockDetails | null;
}

export const currentAudioFileRef = reactive<CurrentAudioFileRef>({
  value: null,
});

export function useAudio() {
  const openAudioModal = () => {
    if (appDraggablesStore.audio === true) {
      return;
    }

    appDraggablesStore.audio = true;
  };

  const setAudioFile = (audioFile: BlockDetails | null) => {
    if (audioFile === currentAudioFileRef.value) {
      return;
    }

    if (audioFile === null) {
      currentAudioFileRef.value = null;
      return;
    }

    currentAudioFileRef.value = audioFile;
    openAudioModal();
  };

  return {
    setAudioFile: setAudioFile,
  };
}
