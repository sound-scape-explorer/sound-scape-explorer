import {reactive} from 'vue';

interface AppDraggableSelectedRef {
  value: string | null;
}

export const appDraggableSelectedRef = reactive<AppDraggableSelectedRef>({
  value: null,
});
