import {useAppNotification} from 'src/app/notification/use-app-notification';
import {useStorageFile} from 'src/composables/use-storage-file';
import {useWorker} from 'src/composables/use-worker';
import {ref} from 'vue';

const isReady = ref<boolean>(false);

// storage ready if worker and file ready
export function useStorageReady() {
  const {hasWorker} = useWorker();
  const {hasFile} = useStorageFile();
  const {notify: notifyApp} = useAppNotification();

  const update = () => {
    if (!hasWorker.value || !hasFile.value || isReady.value) {
      return;
    }

    isReady.value = hasWorker.value && hasFile.value;
  };

  const notify = () => {
    if (isReady.value) {
      notifyApp('success', 'storage', 'Storage is ready');
      return;
    }

    notifyApp('warning', 'storage', 'Storage is not ready');
  };

  return {
    isReady: isReady,
    update: update,
    notify: notify,
  };
}
