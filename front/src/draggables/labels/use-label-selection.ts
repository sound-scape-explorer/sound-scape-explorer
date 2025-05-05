import {useScatterFilterLabels} from 'src/components/scatter/use-scatter-filter-labels';
import {useLabelSets} from 'src/composables/use-label-sets';
import {ref} from 'vue';

export interface LabelSelection {
  [property: string]: string[];
}

const selection = ref<LabelSelection>({});
let isLoaded = false;

export function useLabelSelection() {
  const {sets} = useLabelSets();
  const {filter: filterByLabel} = useScatterFilterLabels();

  const build = () => {
    const newSelection: LabelSelection = {};

    for (const property of Object.keys(sets.value)) {
      newSelection[property] = [];
    }

    selection.value = newSelection;
    isLoaded = true;
  };

  const update = (property: string, values: string[]) => {
    if (!isLoaded || selection.value[property] === values) {
      return;
    }

    selection.value = {
      ...selection.value,
      [property]: values,
    };

    filterByLabel(selection);
  };

  const reset = () => {
    selection.value = {};
  };

  return {
    selection,
    buildSelection: build,
    updateSelection: update,
    resetSelection: reset,
  };
}
