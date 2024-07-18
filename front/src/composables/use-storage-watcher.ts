import {useStorageFile} from 'src/composables/use-storage-file';
import {useStorageReady} from 'src/composables/use-storage-ready';
import {useWorker} from 'src/composables/use-worker';
import {watch} from 'vue';

// should be instantiated once!
export function useStorageWatcher() {
  const {hasWorker} = useWorker();
  const {hasFile} = useStorageFile();
  const {update} = useStorageReady();

  watch([hasWorker, hasFile], update);
}
