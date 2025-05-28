import {type AppDraggableProps} from 'src/app/draggable/app-draggable.vue';
import {useInterval} from 'src/composables/use-interval';
import {useViewSelection} from 'src/composables/use-view-selection';
import {useViewState} from 'src/composables/use-view-state';
import {computed} from 'vue';
import {z} from 'zod';

export const SuspenseCase = z.enum([
  'NONE',
  'VIEW',
  'SCATTER_CLICK',
  'NO_METRICS',
  'NO_TRAJECTORIES',
]);
// eslint-disable-next-line no-redeclare
export type SuspenseCase = z.infer<typeof SuspenseCase>;

interface Suspense {
  message: string;
  while: boolean;
}

export function useAppDraggableSuspense(props: AppDraggableProps) {
  const {hasView} = useViewState();
  const {hasInterval} = useInterval();
  const {extraction} = useViewSelection();

  // block draggable display on while condition
  const suspense = computed<Suspense>(() => {
    switch (props.suspense) {
      case SuspenseCase.enum.VIEW: {
        return {
          while: !hasView.value,
          message: 'Please load a view first',
        };
      }
      case SuspenseCase.enum.SCATTER_CLICK: {
        return {
          while: !hasInterval.value,
          message: 'Please select an interval first',
        };
      }
      case SuspenseCase.enum.NO_METRICS: {
        return {
          while: extraction.value?.metrics.length === 0,
          message: 'No metrics configured',
        };
      }
      case SuspenseCase.enum.NO_TRAJECTORIES: {
        return {
          while: extraction.value?.trajectories.length === 0,
          message: 'No trajectories configured',
        };
      }
      default: {
        return {
          while: false,
          message: '',
        };
      }
    }
  });

  return {
    suspense,
  };
}
