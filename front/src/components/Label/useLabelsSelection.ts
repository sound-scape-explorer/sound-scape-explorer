import {useStorageLabels} from 'src/composables/storage-labels';
import {computed, reactive} from 'vue';

import {useScatterFilterMeta} from '../Scatter/useScatterFilterMeta';

interface LabelsSelectionRef {
  value: {
    [property: string]: string[];
  } | null;
}

export const labelsSelectionRef = reactive<LabelsSelectionRef>({
  value: null,
});

export function useLabelsSelection() {
  const {labels} = useStorageLabels();
  const {filterByMeta} = useScatterFilterMeta();

  const propertiesRef = computed<string[]>(() => {
    if (labels.value === null) {
      return [];
    }

    return Object.keys(labels.value);
  });

  const buildSelection = () => {
    const selection: LabelsSelectionRef['value'] = {};

    for (const property of propertiesRef.value) {
      selection[property] = [];
    }

    labelsSelectionRef.value = selection;
  };

  const updateSelection = (property: string, values: string[]) => {
    if (labelsSelectionRef.value === null) {
      return;
    }

    if (labelsSelectionRef.value[property] === values) {
      return;
    }

    labelsSelectionRef.value[property] = values;
    filterByMeta();
  };

  const resetSelection = () => {
    labelsSelectionRef.value = null;
  };

  return {
    buildSelection: buildSelection,
    updateSelection: updateSelection,
    resetSelection: resetSelection,
  };
}
