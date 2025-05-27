import {ref} from 'vue';
import {z} from 'zod';

export const CyclingPeriod = z.enum(['HOUR', 'DAY', 'MONTH', 'COMPLETE']);
// eslint-disable-next-line no-redeclare
export type CyclingPeriod = z.infer<typeof CyclingPeriod>;

const cyclingPeriod = ref<CyclingPeriod>(CyclingPeriod.enum.HOUR);

export function useScatterTrajectoryCyclingPeriod() {
  return {
    cyclingPeriod,
  };
}
