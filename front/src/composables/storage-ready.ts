import {useStorageFile} from 'src/composables/storage-file';
import {useWorker} from 'src/composables/worker';
import {ref, watch} from 'vue';

const isReady = ref<boolean>(false);

// storage ready if worker and file ready
export function useStorageReady() {
  const {hasWorker} = useWorker();
  const {hasFile} = useStorageFile();

  const updateReady = () => {
    if (!hasWorker.value || !hasFile.value) {
      return;
    }

    isReady.value = hasWorker.value && hasFile.value;
  };

  watch([hasWorker, hasFile], updateReady);

  return {
    isReady: isReady,
  };
}
