import {reactive, watchEffect} from 'vue';

import {storageFileRef} from './useStorageFile';
import {workerRef} from './useWorker';

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
  const readAutoclusters = async () => {
    if (workerRef.value === null || storageFileRef.value === null) {
      return;
    }

    autoclustersRef.value = await workerRef.value.readAutoclustersConfiguration(
      storageFileRef.value,
    );
  };

  watchEffect(readAutoclusters);
}
