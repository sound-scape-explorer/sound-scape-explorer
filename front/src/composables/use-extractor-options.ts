import type {Extractor} from 'src/composables/use-extractor-storage';
import {ref} from 'vue';

const options = ref<string[]>([]);

export function useExtractorOptions() {
  const create = (extractors: Extractor[]) => {
    options.value = extractors.map((ex) => `${ex.index} - ${ex.name}`);
  };

  return {
    options: options,
    create: create,
  };
}
