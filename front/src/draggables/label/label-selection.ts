import {useStorageLabels} from 'src/composables/storage-labels';
import {useScatterFilterMeta} from 'src/scatter/scatter-filter-meta';
import {ref} from 'vue';

export interface LabelSelection {
  [property: string]: string[];
}

const selection = ref<LabelSelection>({});
let hasBuilt = false;

export function useLabelSelection() {
  const {labelProperties} = useStorageLabels();
  const {filterByMeta} = useScatterFilterMeta();

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
    filterByMeta(selection);
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
