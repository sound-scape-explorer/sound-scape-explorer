import type {Integration} from 'src/composables/use-integration-storage';
import {ref} from 'vue';

const options = ref<string[]>([]);

export function useIntegrationOptions() {
  const create = (integrations: Integration[]) => {
    options.value = integrations.map(
      (i) => `${i.index} - ${i.name} (${i.seconds} s)`,
    );
  };

  return {
    options: options,
    create: create,
  };
}
