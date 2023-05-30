import {reactive} from 'vue';
import {appDraggablesStore} from '../AppDraggable/appDraggablesStore';

interface ClickedRef {
  value: number | null;
}

export const clickedRef = reactive<ClickedRef>({
  value: null,
});

export function useScatterClick() {
  const handleClick = (index: number | null) => {
    if (clickedRef.value === index) {
      return;
    }

    clickedRef.value = index;

    if (index === null) {
      return;
    }

    if (appDraggablesStore.details === false) {
      appDraggablesStore.details = true;
    }

    if (appDraggablesStore.audio === false) {
      appDraggablesStore.audio = true;
    }
  };

  return {
    handleClick: handleClick,
  };
}
