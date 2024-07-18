import {useStorageReader} from 'src/composables/use-storage-reader';
import {ref} from 'vue';

export interface Autocluster {
  index: number;
  name: string;
  min_cluster_size: number;
  min_samples: number;
  alpha: number;
  epsilon: number;
}

const autoclusters = ref<Autocluster[]>([]);

// autocluster configs
export function useAutoclusters() {
  const {read: readStorage} = useStorageReader();

  const read = async () => {
    await readStorage(async (worker, file) => {
      autoclusters.value = await worker.readAutoclustersConfiguration(file);
    });
  };

  return {
    autoclusters: autoclusters,
    read: read,
  };
}
