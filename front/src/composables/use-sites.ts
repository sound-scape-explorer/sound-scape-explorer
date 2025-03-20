import {useFiles} from 'src/composables/use-files';
import {ref, watch} from 'vue';

const sites = ref<string[] | null>(null);

export function useSites() {
  const {files} = useFiles();

  watch(files, () => {
    if (sites.value !== null || files.value === null) {
      return;
    }

    sites.value = [...new Set(files.value.map((f) => f.site))];
  });

  return {
    sites: sites,
  };
}
