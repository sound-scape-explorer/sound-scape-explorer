import {useConfig} from 'src/composables/use-config';
import {ref, watch} from 'vue';

const sites = ref<string[] | null>(null);

// todo: remove me
export function useSites() {
  const {config} = useConfig();

  watch(config, () => {
    if (sites.value !== null || config.value === null) {
      return;
    }

    sites.value = [...new Set(config.value.files.map((f) => f.Site))];
  });

  return {
    sites,
  };
}
