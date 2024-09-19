import {useIndicators} from 'src/composables/use-indicators';
import {useRefProvide} from 'src/composables/use-ref-provide';
import {ref} from 'vue';

const divRef = ref<HTMLDivElement | null>(null);

const name = ref<string | null>(null);
useRefProvide('histograms/indicatorName', name);

type Over = 'Hours';
const overs: Over[] = ['Hours'];
const over = ref<Over | null>('Hours');

type HistogramFunction = 'count' | 'sum' | 'avg' | 'min' | 'max';
const histogramFunctions: HistogramFunction[] = [
  'count',
  'sum',
  'avg',
  'min',
  'max',
];
const histogramFunction = ref<HistogramFunction>('avg');

export function useDraggableHistograms() {
  const {names} = useIndicators();

  return {
    divRef: divRef,
    names: names,
    name: name,
    overs: overs,
    over: over,
    histogramFunctions: histogramFunctions,
    histogramFunction: histogramFunction,
  };
}
