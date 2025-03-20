import {type ExtractorDto} from 'src/dtos';
import {ref} from 'vue';

const options = ref<string[]>([]);

export function useExtractorOptions() {
  const create = (extractors: ExtractorDto[]) => {
    options.value = extractors.map((ex) => `${ex.index} - ${ex.name}`);
  };

  return {
    options: options,
    create: create,
  };
}
