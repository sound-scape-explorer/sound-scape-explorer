import {useStorageSettings} from 'src/composables/storage-settings';
import {ref, watch} from 'vue';

const audioHost = ref<string | null>(null);

export function useStorageAudioHost() {
  const {settings} = useStorageSettings();

  watch(settings, () => {
    if (settings.value === null) {
      return;
    }

    if (settings.value.audio_host === '') {
      audioHost.value = 'http://localhost:5531/';
      return;
    }

    audioHost.value = settings.value.audio_host;
  });

  return {
    audioHost: audioHost,
  };
}
