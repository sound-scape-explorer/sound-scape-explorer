import {ref, watchEffect} from 'vue';

import {extractorRef} from '../hooks/useExtractors';
import {integrationRef} from '../hooks/useIntegrations';
import {useBandSelection} from './band-selection';
import {useStorageReader} from './storage-reader';

export interface RelativeTrajectory {
  index: number;
  name: string;
  labelProperty: string;
  labelValue: string;
  values: number[];
  timestamps: number[];
}

const relativeTrajectories = ref<RelativeTrajectory[] | null>(null);
let isLoaded = false;

export function useStorageRelativeTrajectories() {
  const {read} = useStorageReader();
  const {band} = useBandSelection();

  const readRelativeTrajectories = async () => {
    if (isLoaded) {
      return;
    }

    isLoaded = true;

    await read(async (worker, file) => {
      if (
        band.value === null ||
        integrationRef.value === null ||
        extractorRef.value === null
      ) {
        return;
      }

      relativeTrajectories.value = await worker.readRelativeTrajectories(
        file,
        band.value.name,
        integrationRef.value.seconds,
        extractorRef.value.index,
      );
    });
  };

  watchEffect(readRelativeTrajectories);

  const selectRelativeTrajectories = (
    indexes: number[],
  ): RelativeTrajectory[] => {
    if (relativeTrajectories.value === null) {
      return [];
    }

    return relativeTrajectories.value.filter((relativeTrajectory) =>
      indexes.includes(relativeTrajectory.index),
    );
  };

  return {
    relativeTrajectories: relativeTrajectories,
    selectRelativeTrajectories: selectRelativeTrajectories,
  };
}
