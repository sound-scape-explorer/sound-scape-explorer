import {useStorageReader} from 'src/composables/storage-reader';
import {onMounted, ref} from 'vue';

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
export function useStorageAutoclusters() {
  const {read} = useStorageReader();

  onMounted(async () => {
    if (isLoaded) {
      return;
    }

    isLoaded = true;

    await read(async (worker, file) => {
      autoclusters.value = await worker.readAutoclustersConfiguration(file);
    });
  });

  return {
    autoclusters: autoclusters,
  };
}
