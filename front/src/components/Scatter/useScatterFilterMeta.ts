import {aggregatedLabelsRef} from 'src/hooks/useAggregatedLabels';
import {aggregatedTimestampsRef} from 'src/hooks/useAggregatedTimestamps';
import {reactive} from 'vue';

import {metaSelectionStore} from '../Meta/metaSelectionStore';

interface PointsFilteredByMetaRef {
  value: boolean[] | null;
}

export const pointsFilteredByMetaRef = reactive<PointsFilteredByMetaRef>({
  value: null,
});

export function useScatterFilterMeta() {
  // TODO: This performance can certainly be improved
  const isVisibleByMeta = (index: number): boolean => {
    let isVisible = true;

    if (aggregatedLabelsRef.value === null) {
      return false;
    }

    const labelValues = aggregatedLabelsRef.value[index];

    const metaSelectedIndexes = Object.keys(metaSelectionStore.selection);
    const metaIndexes = Object.keys(labelValues);

    for (let i = 0; i < metaSelectedIndexes.length; ++i) {
      // item is already not visible
      if (!isVisible) {
        break;
      }

      const metaSelectedIndex = Number(metaSelectedIndexes[i]);
      const metaSelection = metaSelectionStore.selection[metaSelectedIndex];
      const metaSelectionValues = Object.values(metaSelection);

      // no user selection
      if (metaSelectionValues.length === 0) {
        continue;
      }

      const metaIndex = Number(metaIndexes[i]);
      const meta = labelValues[metaIndex];
      isVisible = metaSelectionValues.includes(meta);
    }

    return isVisible;
  };

  const filterByMeta = () => {
    if (aggregatedTimestampsRef.value === null) {
      return;
    }

    const pointsFilteredByMeta = [];

    for (
      let intervalIndex = 0;
      intervalIndex < aggregatedTimestampsRef.value.length;
      ++intervalIndex
    ) {
      const isVisible = isVisibleByMeta(intervalIndex);
      pointsFilteredByMeta.push(!isVisible);
    }

    pointsFilteredByMetaRef.value = pointsFilteredByMeta;
    console.log('filterByMeta');
  };

  return {
    filterByMeta: filterByMeta,
  };
}
