import {useScatterFilterTag} from 'src/components/scatter/use-scatter-filter-tag';
import {useTagUniques} from 'src/composables/use-tag-uniques';
import {ref} from 'vue';

export interface TagSelection {
  [tagName: string]: string[];
}

const selection = ref<TagSelection>({});
let isLoaded = false;

export function useTagSelection() {
  const {allUniques} = useTagUniques();
  const {filter: filterByTag} = useScatterFilterTag();

  const build = () => {
    const newSelection: TagSelection = {};

    for (const tagName of Object.keys(allUniques.value)) {
      newSelection[tagName] = [];
    }

    selection.value = newSelection;
    isLoaded = true;
  };

  const update = (tagName: string, selectedUniques: string[]) => {
    if (!isLoaded || selection.value[tagName] === selectedUniques) {
      return;
    }

    selection.value = {
      ...selection.value,
      [tagName]: selectedUniques,
    };

    filterByTag(selection);
  };

  const reset = () => {
    const newSelection: TagSelection = {...selection.value};

    for (const key of Object.keys(newSelection)) {
      newSelection[key] = [];
    }

    selection.value = newSelection;

    filterByTag(selection);
  };

  return {
    selection,
    reset,
    build,
    update,
  };
}
