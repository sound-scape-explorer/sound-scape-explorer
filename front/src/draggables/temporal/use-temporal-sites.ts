import {type TreeSelectOption} from 'naive-ui';
import {useSites} from 'src/composables/use-sites';
import {useDraggableTemporal} from 'src/draggables/temporal/use-draggable-temporal';
import {useTemporal} from 'src/draggables/temporal/use-temporal';
import {computed, ref} from 'vue';

const current = ref<string[]>([]);

export function useTemporalSites() {
  const {selectSites} = useTemporal();
  const {sites} = useSites();
  const {indicator} = useDraggableTemporal();

  const options = computed<TreeSelectOption[]>(() => {
    if (sites.value === null) {
      return [];
    }

    let os: TreeSelectOption[] = [];
    let registeredNames: string[] = [];

    for (const site of sites.value) {
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

    for (const site of sites.value) {
      const name = site.name;

      if (names.indexOf(name) !== -1) {
        continue;
      }

      names = [...names, name];
    }

    update(names);
  };

  const handleFirstLoad = () => {
    if (indicator.value !== null && current.value.length === 0) {
      selectAll();
    }
  };

  return {
    current: current,
    options: options,
    update: update,
    selectAll: selectAll,
    handleFirstLoad: handleFirstLoad,
  };
}
