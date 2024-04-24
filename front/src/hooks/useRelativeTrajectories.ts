import {reactive, watchEffect} from 'vue';

import {useFileReader} from './file-reader';
import {bandRef} from './useBands';
import {extractorRef} from './useExtractors';
import {integrationRef} from './useIntegrations';

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
  const {read} = useFileReader();

  const readRelativeTrajectories = () =>
    read(async (worker, file) => {
      if (
        bandRef.value === null ||
        integrationRef.value === null ||
        extractorRef.value === null
      ) {
        return;
      }

      relativeTrajectoriesRef.value = await worker.readRelativeTrajectories(
        file,
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
