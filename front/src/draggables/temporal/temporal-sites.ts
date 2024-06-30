import type {TreeSelectOption} from 'naive-ui';
import {useStorageSites} from 'src/composables/storage-sites';
import {useTemporal} from 'src/draggables/temporal/temporal';
import {computed, ref} from 'vue';

const current = ref<string[]>([]);

export function useTemporalSites() {
  const {selectSites} = useTemporal();
  const {sites} = useStorageSites();

  const options = computed<TreeSelectOption[]>(() => {
    if (sites.value === null) {
      return [];
    }

    let os: TreeSelectOption[] = [];
    let registeredNames: string[] = [];

    for (let i = 0; i < sites.value.length; i++) {
      const site = sites.value[i];

      if (registeredNames.indexOf(site.name) !== -1) {
        continue;
      }

      registeredNames = [...registeredNames, site.name];

      const o: TreeSelectOption = {
        key: site.name,
        label: site.name,
      };

      os = [...os, o];
    }

    return os;
  });

  const update = (names: string[]) => {
    current.value = names;
    selectSites(names);
  };

  const selectAll = () => {
    if (sites.value === null) {
      return;
    }

    let names: string[] = [];

    for (let i = 0; i < sites.value.length; i++) {
      const name = sites.value[i].name;

      if (names.indexOf(name) !== -1) {
        continue;
      }

      names = [...names, name];
    }

    update(names);
  };

  return {
    current: current,
    options: options,
    update: update,
    selectAll: selectAll,
  };
}
