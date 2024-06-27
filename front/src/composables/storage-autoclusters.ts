import {useStorageReader} from 'src/composables/storage-reader';
import {useStorageReady} from 'src/composables/storage-ready';
import {ref, watch} from 'vue';

export interface Autocluster {
  index: number;
  name: string;
  min_cluster_size: number;
  min_samples: number;
  alpha: number;
  epsilon: number;
}

const autoclusters = ref<Autocluster[]>([]);
let isLoaded = false;

// These are autoclusters configurations
// todo: refactor this hook (watcher to be in SFC)
export function useStorageAutoclusters() {
  const {read} = useStorageReader();
  const {isReady} = useStorageReady();

  const readAll = async () => {
    if (!isReady.value) {
      return;
    }

    if (isLoaded) {
      return;
    }

    isLoaded = true;

    await read(async (worker, file) => {
      autoclusters.value = await worker.readAutoclustersConfiguration(file);
    });
  };

  watch(isReady, readAll);

  return {
    autoclusters: autoclusters,
  };
}
