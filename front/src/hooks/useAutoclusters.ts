import {reactive, watchEffect} from 'vue';

import {useStorageReader} from '../composables/storage-reader';

export interface Autocluster {
  index: number;
  name: string;
  min_cluster_size: number;
  min_samples: number;
  alpha: number;
  epsilon: number;
}

interface AutoclustersRef {
  value: Autocluster[];
}

export const autoclustersRef = reactive<AutoclustersRef>({
  value: [],
});

// These are autoclusters configurations
export function useAutoclusters() {
  const {read} = useStorageReader();

  const readAutoclusters = () =>
    read(async (worker, file) => {
      autoclustersRef.value = await worker.readAutoclustersConfiguration(file);
    });

  watchEffect(readAutoclusters);
}
