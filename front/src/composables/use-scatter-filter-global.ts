import {useScatterFilterAcoustic} from 'src/components/scatter/use-scatter-filter-acoustic';
import {useScatterFilterCalendar} from 'src/components/scatter/use-scatter-filter-calendar';
import {useScatterFilterSpatial} from 'src/components/scatter/use-scatter-filter-spatial';
import {useScatterFilterTag} from 'src/components/scatter/use-scatter-filter-tag';
import {ref} from 'vue';

const filtered = ref<boolean[]>([]);

// global interval filter
export function useScatterFilterGlobal() {
  const {filtered: labelFiltered} = useScatterFilterTag();
  const {filtered: calendarFiltered} = useScatterFilterCalendar();
  const {filtered: acousticFiltered} = useScatterFilterAcoustic();
  const {filtered: spatialFiltered} = useScatterFilterSpatial();

  const update = () => {
    const l = calendarFiltered.value.length;
    const newFiltered = new Array(l);

    for (let i = 0; i < l; i += 1) {
      newFiltered[i] =
        labelFiltered.value[i] ||
        calendarFiltered.value[i] ||
        acousticFiltered.value[i] ||
        spatialFiltered.value[i];
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
    filtered,
    update,
    getActiveIntervalIndices,
  };
}
