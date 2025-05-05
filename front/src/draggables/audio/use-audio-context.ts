import {useConfig} from 'src/composables/use-config';
import {ref} from 'vue';

let isCreated = false;
const context = ref<AudioContext | null>(null);

export function useAudioContext() {
  const {config} = useConfig();

  const create = () => {
    if (config.value === null) {
      return;
    }

    if (isCreated) {
      return;
    }

    isCreated = true;

    context.value = new AudioContext({
      sampleRate: config.value.settings.expected_sample_rate,
    });
  };

  return {
    context,
    create,
  };
}
