import {aggregatedLabelsRef} from 'src/hooks/useAggregatedLabels';
import {labelsRef} from 'src/hooks/useLabels';
import {computed, reactive, watch} from 'vue';

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
  const {filterByMeta} = useScatterFilterMeta();

  const propertiesRef = computed<string[]>(() => {
    if (labelsRef.value === null) {
      return [];
    }

    return Object.keys(labelsRef.value);
  });

  const buildSelection = () => {
    const selection: LabelsSelectionRef['value'] = {};

    for (const property of propertiesRef.value) {
      selection[property] = [];
    }

    labelsSelectionRef.value = selection;
    filterByMeta();
  };

  // TODO: This iterates too much (length of labels properties)
  watch([aggregatedLabelsRef], buildSelection);

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

  return {
    updateSelection: updateSelection,
  };
}
