import {reactive, watchEffect} from 'vue';

import {bandRef} from './useBands';
import {extractorRef} from './useExtractors';
import {integrationRef} from './useIntegrations';
import {useWorker} from './useWorker';

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
  const {read} = useWorker();

  const readRelativeTrajectories = () =>
    read(async (worker, storage) => {
      if (
        bandRef.value === null ||
        integrationRef.value === null ||
        extractorRef.value === null
      ) {
        return;
      }

      relativeTrajectoriesRef.value = await worker.readRelativeTrajectories(
        storage,
        bandRef.value.name,
        integrationRef.value.seconds,
        extractorRef.value.index,
      );
    });

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
