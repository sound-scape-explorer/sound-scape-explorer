import {settingsRef} from 'src/hooks/useStorageSettings';
import {reactive} from 'vue';

interface AudioHostRef {
  value: string | null;
}

export const audioHostRef = reactive<AudioHostRef>({
  value: null,
});

export function useAudioHost() {
  const setAudioHost = () => {
    if (settingsRef.value === null) {
      return;
    }

    if (settingsRef.value.audio_host === '') {
      audioHostRef.value = 'http://localhost:5531/';
      return;
    }

    audioHostRef.value = settingsRef.value.audio_host;
  };

  return {
    setAudioHost: setAudioHost,
  };
}
