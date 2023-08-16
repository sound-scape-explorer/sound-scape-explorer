import {reactive, watchEffect} from 'vue';

import {bandRef} from './useBands';
import {extractorRef} from './useExtractors';
import {integrationRef} from './useIntegrations';
import {reducerRef} from './useReducers';
import {storageFileRef} from './useStorageFile';
import {selectedTrajectoriesRef, type Trajectory} from './useTrajectories';
import {workerRef} from './useWorker';

export type TracedData = number[][];

interface Traced {
  trajectory: Trajectory;
  data: TracedData;
}

interface TracedRef {
  value: Traced[];
}

export const tracedRef = reactive<TracedRef>({
  value: [],
});

interface TracedFusedRef {
  value: boolean;
}

export const tracedFusedRef = reactive<TracedFusedRef>({
  value: false,
});

export function useTraced() {
  const readTraced = async () => {
    if (
      workerRef.value === null ||
      storageFileRef.value === null ||
      bandRef.value === null ||
      integrationRef.value === null ||
      extractorRef.value === null ||
      reducerRef.value === null ||
      selectedTrajectoriesRef.value === null
    ) {
      return;
    }

    const traceds: Traced[] = [];

    for (const sT of selectedTrajectoriesRef.value) {
      const data: TracedData = await workerRef.value.readTraced(
        storageFileRef.value,
        bandRef.value.name,
        integrationRef.value.seconds,
        extractorRef.value.index,
        reducerRef.value.index,
        sT.index,
      );

      const traced: Traced = {
        trajectory: sT,
        data: data,
      };

      traceds.push(traced);
    }

    tracedRef.value = traceds;
  };

  watchEffect(readTraced);
}
