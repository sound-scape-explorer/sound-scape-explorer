import type {Band} from 'src/composables/use-band-storage';
import {ref} from 'vue';

const options = ref<string[]>([]);

export function useBandOptions() {
  const create = (bands: Band[]) => {
    options.value = bands.map(
      (b) => `${b.index} - ${b.name} (${b.low} Hz - ${b.high} Hz)`,
    );
  };

  return {
    options: options,
    create: create,
  };
}
