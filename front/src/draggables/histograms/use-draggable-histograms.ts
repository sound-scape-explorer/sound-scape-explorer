import {useIndicators} from 'src/composables/use-indicators';
import {ref} from 'vue';
import {z} from 'zod';

const divRef = ref<HTMLDivElement | null>(null);
const name = ref<string | null>(null);

export const HistogramOver = z.enum(['Hours']);
// eslint-disable-next-line no-redeclare
export type HistogramOver = z.infer<typeof HistogramOver>;

export const HistogramFunction = z.enum(['count', 'sum', 'avg', 'min', 'max']);
// eslint-disable-next-line no-redeclare
export type HistogramFunction = z.infer<typeof HistogramFunction>;

const fn = ref<HistogramFunction>(HistogramFunction.enum.avg);
const over = ref<HistogramOver>(HistogramOver.enum.Hours);

export function useDraggableHistograms() {
  const {names} = useIndicators();

  return {
    divRef,
    names,
    name,
    over,
    fn,
  };
}
