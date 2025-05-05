import {useDraggables} from 'src/composables/use-draggables';
import {useStorageReady} from 'src/composables/use-storage-ready';

export function useApp() {
  const {isReady} = useStorageReady();
  const {open} = useDraggables();

  const showImport = () => {
    if (isReady.value) {
      return;
    }

    open('open');
  };

  return {
    showImport,
  };
}
