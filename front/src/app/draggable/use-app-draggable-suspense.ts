import {type AppDraggableProps} from 'src/app/draggable/app-draggable.vue';
import {useIntervalSelector} from 'src/composables/use-interval-selector';
import {useViewState} from 'src/composables/use-view-state';
import {computed} from 'vue';

interface Suspense {
  message: string;
  while: boolean;
}

export function useAppDraggableSuspense(props: AppDraggableProps) {
  const {hasView} = useViewState();
  const {hasClicked} = useIntervalSelector();

  const suspense = computed<Suspense>(() => {
    switch (props.suspense) {
      case 'view':
        return {
          while: !hasView.value,
          message: 'Please load a view first',
        };
      case 'scatterClick':
        return {
          while: !hasClicked.value,
          message: 'Please select a point first',
        };
      default:
        return {
          while: false,
          message: '',
        };
    }
  });

  return {
    suspense: suspense,
  };
}
