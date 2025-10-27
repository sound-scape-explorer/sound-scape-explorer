import {type FileDto} from '@shared/dtos';
import {useConfig} from 'src/composables/use-config';
import {ref} from 'vue';

export interface Site {
  name: string;
  files: FileDto[];
}

const sites = ref<Site[]>([]);

export function useSites() {
  const {config} = useConfig();

  const generate = () => {
    if (config.value === null) {
      return;
    }

    const newSites: Site[] = [];

    // fill
    for (const file of config.value.files) {
      let site = newSites.find((site) => site.name === file.Site);

      if (typeof site === 'undefined') {
        site = {name: file.Site, files: []};
        newSites.push(site);
      }

      site.files.push(file);
    }

    // sort
    for (const site of newSites) {
      site.files = site.files.sort(
        (a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime(),
      );
    }

    sites.value = newSites;
  };

  return {
    sites,
    generate,
  };
}
