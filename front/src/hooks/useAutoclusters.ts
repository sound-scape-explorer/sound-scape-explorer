import {reactive, watchEffect} from 'vue';

import {useWorker} from './useWorker';

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
  const {read} = useWorker();

  const readAutoclusters = () =>
    read(async (worker, storage) => {
      autoclustersRef.value = await worker.readAutoclustersConfiguration(
        storage,
      );
    });

  watchEffect(readAutoclusters);
}
