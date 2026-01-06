import {useClientSettings} from 'src/composables/use-client-settings';
import {computed} from 'vue';

export function useAudioFft() {
  const {spectrogramFftSize} = useClientSettings();

  const sizeAsNumber = computed(() => Number(spectrogramFftSize.value));

  return {
    size: sizeAsNumber,
  };
}
