import {type FileDto} from '@shared/dtos';
import {useConfig} from 'src/composables/use-config';
import {ref} from 'vue';

type Sites = Record<string, FileDto[]>;
const sites = ref<Sites>({});

// todo: update me
export function useSitesNew() {
  const {config} = useConfig();

  const generate = () => {
    if (config.value === null) {
      return;
    }

    const newSites: Record<string, FileDto[]> = {};

    for (const file of config.value.files) {
      if (newSites[file.Site] === undefined) {
        newSites[file.Site] = [];
      }

      newSites[file.Site].push(file);
    }

    sites.value = newSites;
  };

  return {
    sites,
    generate,
  };
}
