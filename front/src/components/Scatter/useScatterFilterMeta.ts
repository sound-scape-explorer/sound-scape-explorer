import {reactive} from 'vue';
import {datasetRef} from './useScatterDataset';
import {groupedMetasRef} from 'src/hooks/useStorageGroupedMetas';
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

    if (groupedMetasRef.value === null) {
      return false;
    }

    const metaValues = groupedMetasRef.value[index];

    const metaSelectedIndexes = Object.keys(metaSelectionStore.selection);
    const metaIndexes = Object.keys(metaValues);

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
      const meta = metaValues[metaIndex];
      isVisible = metaSelectionValues.includes(meta);
    }

    return isVisible;
  };

  const filterByMeta = () => {
    if (datasetRef.value === null) {
      return;
    }

    const pointsFilteredByMeta = [];

    for (
      let pointIndex = 0;
      pointIndex < datasetRef.value.points.length;
      ++pointIndex
    ) {
      const isVisible = isVisibleByMeta(pointIndex);
      pointsFilteredByMeta.push(!isVisible);
    }

    pointsFilteredByMetaRef.value = pointsFilteredByMeta;
    console.log('filterByMeta');
  };

  return {
    filterByMeta: filterByMeta,
  };
}
