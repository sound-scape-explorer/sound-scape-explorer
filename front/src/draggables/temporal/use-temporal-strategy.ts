import {calculateMean} from 'src/utils/math';
import {ref} from 'vue';
import {z} from 'zod';

export const TemporalStrategy = z.enum(['Mean', 'Min', 'Max']);
// eslint-disable-next-line no-redeclare
export type TemporalStrategy = z.infer<typeof TemporalStrategy>;

const strategy = ref<TemporalStrategy>(TemporalStrategy.enum.Mean);

export function useTemporalStrategy() {
  const apply = (values: number[]) => {
    if (strategy.value === TemporalStrategy.enum.Mean) {
      return calculateMean(values);
    }

    if (strategy.value === TemporalStrategy.enum.Min) {
      return Math.min(...values);
    }

    if (strategy.value === TemporalStrategy.enum.Max) {
      return Math.max(...values);
    }

    throw new Error('Could not find temporal strategy');
  };

  return {
    strategy,
    apply,
  };
}
