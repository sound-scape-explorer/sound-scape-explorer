import {computed} from 'vue';

import {settingsRef} from '../../hooks/useStorageSettings';

export function useAudioContext() {
  const audioContextRef = computed<AudioContext | null>(() => {
    if (settingsRef.value === null) {
      return null;
    }

    return new AudioContext({
      sampleRate: settingsRef.value.expected_sample_rate,
    });
  });

  return {
    audioContextRef: audioContextRef,
  };
}
