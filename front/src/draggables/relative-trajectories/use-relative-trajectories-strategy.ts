import {ref} from 'vue';
import {z} from 'zod';

export const RelativeTrajectoryStrategy = z.enum(['overlay', 'continuous']);
// eslint-disable-next-line no-redeclare
export type RelativeTrajectoryStrategy = z.infer<
  typeof RelativeTrajectoryStrategy
>;

const strategy = ref<RelativeTrajectoryStrategy>(
  RelativeTrajectoryStrategy.enum.overlay,
);

export function useRelativeTrajectoriesStrategy() {
  return {
    strategy,
  };
}
