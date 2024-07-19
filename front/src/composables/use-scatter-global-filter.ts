import {useScatterFilterLabels} from 'src/components/scatter/use-scatter-filter-labels';
import {useScatterFilterTemporal} from 'src/components/scatter/use-scatter-filter-temporal';
import {useScatterFilterTime} from 'src/components/scatter/use-scatter-filter-time';
import {ref} from 'vue';

const filtered = ref<boolean[]>([]);

// global interval filter
export function useScatterGlobalFilter() {
  const {filtered: labelFiltered} = useScatterFilterLabels();
  const {filtered: timeFiltered} = useScatterFilterTime();
  const {filtered: temporalFiltered} = useScatterFilterTemporal();

  const update = () => {
    const l = timeFiltered.value.length;
    const newFiltered = new Array(l);

    for (let i = 0; i < l; i += 1) {
      newFiltered[i] =
        labelFiltered.value[i] ||
        timeFiltered.value[i] ||
        temporalFiltered.value[i];
    }

    filtered.value = newFiltered;
  };

  const getActiveIntervalIndices = () => {
    let indices: number[] = [];

    for (let i = 0; i < filtered.value.length; i += 1) {
      const isFiltered = filtered.value[i];
      if (!isFiltered && indices.indexOf(i) === -1) {
        indices = [...indices, i];
      }
    }

    return indices;
  };

  return {
    filtered: filtered,
    update: update,
    getActiveIntervalIndices: getActiveIntervalIndices,
  };
}
