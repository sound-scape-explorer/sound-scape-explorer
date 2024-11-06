import {useScatterFilterLabels} from 'src/components/scatter/use-scatter-filter-labels';
import {useScatterFilterTemporal} from 'src/components/scatter/use-scatter-filter-temporal';
import {useScatterFilterTime} from 'src/components/scatter/use-scatter-filter-time';
import {useScatterGlobalFilter} from 'src/composables/use-scatter-global-filter';
import {computed} from 'vue';

export function useFilteringInfoData() {
  const {filtered: global} = useScatterGlobalFilter();
  const {filtered: time} = useScatterFilterTime();
  const {filtered: labels} = useScatterFilterLabels();
  const {filtered: temporal} = useScatterFilterTemporal();

  const totalOut = computed(() => global.value.filter((f) => f).length);
  const totalIn = computed(() => global.value.length - totalOut.value);

  const timeOut = computed(() => time.value.filter((f) => f).length);
  const timeIn = computed(() => time.value.length - timeOut.value);

  const labelsOut = computed(() => labels.value.filter((f) => f).length);
  const labelsIn = computed(() => labels.value.length - labelsOut.value);

  const temporalOut = computed(() => temporal.value.filter((f) => f).length);
  const temporalIn = computed(() => temporal.value.length - temporalOut.value);

  const isTimeActive = computed<boolean>(() => timeOut.value > 0);
  const isLabelsActive = computed<boolean>(() => labelsOut.value > 0);
  const isTemporalActive = computed<boolean>(() => temporalOut.value > 0);
  const population = computed(() => time.value.length);

  return {
    totalOut: totalOut,
    totalIn: totalIn,
    timeOut: timeOut,
    timeIn: timeIn,
    labelsOut: labelsOut,
    labelsIn: labelsIn,
    temporalOut: temporalOut,
    temporalIn: temporalIn,
    isTimeActive: isTimeActive,
    isLabelsActive: isLabelsActive,
    isTemporalActive: isTemporalActive,
    population: population,
  };
}
