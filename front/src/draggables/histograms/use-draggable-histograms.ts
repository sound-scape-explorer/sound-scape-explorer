import {useIndicators} from 'src/composables/use-indicators';
import {ref} from 'vue';

const divRef = ref<HTMLDivElement | null>(null);
const name = ref<string | null>(null);

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
    divRef,
    names,
    name,
    overs,
    over,
    histogramFunctions,
    histogramFunction,
  };
}
