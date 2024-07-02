import {useScatterFilterLabel} from 'src/components/scatter/use-scatter-filter-label';
import {useStorageLabels} from 'src/composables/use-storage-labels';
import {ref} from 'vue';

export interface LabelSelection {
  [property: string]: string[];
}

const selection = ref<LabelSelection>({});
let hasBuilt = false;

export function useLabelsSelection() {
  const {labelProperties} = useStorageLabels();
  const {filter: filterByLabel} = useScatterFilterLabel();

  const build = () => {
    if (labelProperties.value === null) {
      return;
    }

    const newSelection: LabelSelection = {};

    for (const property of labelProperties.value) {
      newSelection[property] = [];
    }

    selection.value = newSelection;
    hasBuilt = true;
  };

  const update = (property: string, values: string[]) => {
    if (!hasBuilt || selection.value[property] === values) {
      return;
    }

    selection.value[property] = values;
    filterByLabel(selection);
  };

  const reset = () => {
    selection.value = {};
  };

  return {
    selection: selection,
    buildSelection: build,
    updateSelection: update,
    resetSelection: reset,
  };
}
