import {labelsRef} from 'src/hooks/useLabels';
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
    console.log('build');
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

  return {
    buildSelection: buildSelection,
    updateSelection: updateSelection,
  };
}
