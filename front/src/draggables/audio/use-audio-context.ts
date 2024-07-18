import {useSettings} from 'src/composables/use-settings';
import {ref} from 'vue';

let isCreated = false;
const context = ref<AudioContext | null>(null);

export function useAudioContext() {
  const {settings} = useSettings();

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
