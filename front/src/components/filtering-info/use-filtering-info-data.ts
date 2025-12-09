import {useScatterFilterSpatial} from 'src/components/scatter/use-scatter-filter-spatial';
import {useScatterFilterTag} from 'src/components/scatter/use-scatter-filter-tag';
import {useScatterFilterTemporal} from 'src/components/scatter/use-scatter-filter-temporal';
import {useScatterFilterTime} from 'src/components/scatter/use-scatter-filter-time';
import {useScatterGlobalFilter} from 'src/composables/use-scatter-global-filter';
import {computed} from 'vue';

export function useFilteringInfoData() {
  const {filtered: global} = useScatterGlobalFilter();
  const {filtered: time} = useScatterFilterTime();
  const {filtered: tags} = useScatterFilterTag();
  const {filtered: temporal} = useScatterFilterTemporal();
  const {filtered: spatial} = useScatterFilterSpatial();

  const totalOut = computed(() => global.value.filter((f) => f).length);
  const totalIn = computed(() => global.value.length - totalOut.value);

  const timeOut = computed(() => time.value.filter((f) => f).length);
  const timeIn = computed(() => time.value.length - timeOut.value);

  const tagsOut = computed(() => tags.value.filter((f) => f).length);
  const tagsIn = computed(() => tags.value.length - tagsOut.value);

  const temporalOut = computed(() => temporal.value.filter((f) => f).length);
  const temporalIn = computed(() => temporal.value.length - temporalOut.value);

  const spatialOut = computed(() => spatial.value.filter((f) => f).length);
  const spatialIn = computed(() => spatial.value.length - spatialOut.value);

  const isTimeActive = computed<boolean>(() => timeOut.value > 0);
  const isTagsActive = computed<boolean>(() => tagsOut.value > 0);
  const isTemporalActive = computed<boolean>(() => temporalOut.value > 0);
  const isSpatialActive = computed<boolean>(() => spatialOut.value > 0);
  const population = computed(() => time.value.length);

  return {
    totalOut,
    totalIn,
    timeOut,
    timeIn,
    tagsOut,
    tagsIn,
    temporalOut,
    temporalIn,
    spatialOut,
    spatialIn,
    isTimeActive,
    isTagsActive,
    isTemporalActive,
    isSpatialActive,
    population,
  };
}
