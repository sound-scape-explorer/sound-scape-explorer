import {type IntegrationDto} from 'src/dtos';
import {ref} from 'vue';

const options = ref<string[]>([]);

export function useIntegrationOptions() {
  const create = (integrations: IntegrationDto[]) => {
    options.value = integrations.map(
      (i) => `${i.index} - ${i.name} (${i.duration} ms)`,
    );
  };

  return {
    options: options,
    create: create,
  };
}
