import {useStorageSettings} from 'src/composables/use-storage-settings';
import {ref} from 'vue';

let isCreated = false;
const context = ref<AudioContext | null>(null);

export function useAudioContext() {
  const {settings} = useStorageSettings();

  const create = () => {
    if (settings.value === null) {
      return;
    }

    if (isCreated) {
      return;
    }

    isCreated = true;

    context.value = new AudioContext({
      sampleRate: settings.value.expected_sample_rate,
    });
  };

  return {
    context: context,
    create: create,
  };
}
