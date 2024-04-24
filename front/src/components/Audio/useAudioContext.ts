import {reactive, watchEffect} from 'vue';

import {useStorageSettings} from '../../hooks/useStorageSettings';

interface AudioContextRef {
  value: AudioContext | null;
}

export const audioContextRef = reactive<AudioContextRef>({
  value: null,
});

export function useAudioContext() {
  const {settings} = useStorageSettings();

  const createAudioContext = () => {
    if (settings.value === null) {
      return;
    }

    audioContextRef.value = new AudioContext({
      sampleRate: settings.value.expected_sample_rate,
    });
  };

  watchEffect(createAudioContext);
}
