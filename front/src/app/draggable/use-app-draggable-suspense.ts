import type {AppDraggableProps} from 'src/app/draggable/app-draggable.vue';
import {useViewState} from 'src/composables/use-view-state';
import {useAudioOpen} from 'src/draggables/audio/use-audio-open';
import {computed} from 'vue';

interface Suspense {
  message: string;
  while: boolean;
}

export function useAppDraggableSuspense(props: AppDraggableProps) {
  const {hasView} = useViewState();
  const {hasClicked} = useAudioOpen();

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
