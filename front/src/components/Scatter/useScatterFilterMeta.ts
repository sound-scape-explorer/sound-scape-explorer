import {useStorageAggregatedLabels} from 'src/composables/storage-aggregated-labels';
import {useStorageLabels} from 'src/composables/storage-labels';
import {reactive} from 'vue';

import {labelsSelectionRef} from '../Label/useLabelsSelection';
import {useScatterTraces} from './useScatterTraces';

interface PointsFilteredByMetaRef {
  value: boolean[] | null;
}

export const pointsFilteredByMetaRef = reactive<PointsFilteredByMetaRef>({
  value: null,
});

export function useScatterFilterMeta() {
  const {labels} = useStorageLabels();
  const {aggregatedLabels} = useStorageAggregatedLabels();

  const isVisibleByMeta = (intervalIndex: number): boolean => {
    let isVisible = true;

    if (
      aggregatedLabels.value === null ||
      labels.value === null ||
      labelsSelectionRef.value === null
    ) {
      return false;
    }

    const properties = Object.keys(labels.value);
    const values = aggregatedLabels.value[intervalIndex];
    const valuesIndexes = Object.keys(values);

    for (let index = 0; index < valuesIndexes.length; index += 1) {
      // item is already not visible
      if (!isVisible) {
        break;
      }

      const property = properties[index];
      const valuesSelection = labelsSelectionRef.value[property];

      // no user selection
      if (valuesSelection.length === 0) {
        continue;
      }

      const value = values[index];
      isVisible = valuesSelection.includes(value);
    }

    return isVisible;
  };

  const {renderTraces} = useScatterTraces();

  const filterByMeta = () => {
    if (aggregatedLabels.value === null) {
      return;
    }

    const pointsFilteredByMeta = [];

    for (
      let intervalIndex = 0;
      intervalIndex < aggregatedLabels.value.length;
      ++intervalIndex
    ) {
      const isVisible = isVisibleByMeta(intervalIndex);
      pointsFilteredByMeta.push(!isVisible);
    }

    pointsFilteredByMetaRef.value = pointsFilteredByMeta;

    renderTraces();
  };

  const resetFilterByMeta = () => {
    pointsFilteredByMetaRef.value = null;
  };

  return {
    filterByMeta: filterByMeta,
    resetFilterByMeta: resetFilterByMeta,
  };
}
