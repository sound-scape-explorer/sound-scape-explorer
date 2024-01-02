import {reactive, watchEffect} from 'vue';

import {settingsRef} from '../../hooks/useStorageSettings';

interface AudioContextRef {
  value: AudioContext | null;
}

export const audioContextRef = reactive<AudioContextRef>({
  value: null,
});

export function useAudioContext() {
  const createAudioContext = () => {
    if (settingsRef.value === null) {
      return;
    }

    audioContextRef.value = new AudioContext({
      sampleRate: settingsRef.value.expected_sample_rate,
    });
  };

  watchEffect(createAudioContext);
}
