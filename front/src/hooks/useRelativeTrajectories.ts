import {reactive, watchEffect} from 'vue';

import {bandRef} from './useBands';
import {extractorRef} from './useExtractors';
import {integrationRef} from './useIntegrations';
import {storageFileRef} from './useStorageFile';
import {workerRef} from './useWorker';

export interface RelativeTrajectory {
  index: number;
  name: string;
  labelProperty: string;
  labelValue: string;
  values: number[];
  timestamps: number[];
}

interface RelativeTrajectoriesRef {
  value: null | RelativeTrajectory[];
}

export const relativeTrajectoriesRef = reactive<RelativeTrajectoriesRef>({
  value: null,
});

export function useRelativeTrajectories() {
  const readRelativeTrajectories = async () => {
    if (
      workerRef.value === null ||
      storageFileRef.value === null ||
      bandRef.value === null ||
      integrationRef.value === null ||
      extractorRef.value === null
    ) {
      return;
    }

    relativeTrajectoriesRef.value =
      await workerRef.value.readRelativeTrajectories(
        storageFileRef.value,
        bandRef.value.name,
        integrationRef.value.seconds,
        extractorRef.value.index,
      );
  };

  watchEffect(readRelativeTrajectories);

  const selectRelativeTrajectories = (
    indexes: number[],
  ): RelativeTrajectory[] => {
    if (relativeTrajectoriesRef.value === null) {
      return [];
    }

    return relativeTrajectoriesRef.value.filter((relativeTrajectory) =>
      indexes.includes(relativeTrajectory.index),
    );
  };

  return {
    selectRelativeTrajectories: selectRelativeTrajectories,
  };
}
