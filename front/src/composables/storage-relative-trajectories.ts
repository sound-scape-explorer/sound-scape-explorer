import {useSelectBand} from 'src/composables/select-band';
import {useSelectExtractor} from 'src/composables/select-extractor';
import {useStorageReader} from 'src/composables/storage-reader';
import {integrationRef} from 'src/hooks/useIntegrations';
import {ref, watchEffect} from 'vue';

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
  const {band} = useSelectBand();
  const {extractor} = useSelectExtractor();

  const readRelativeTrajectories = async () => {
    if (isLoaded) {
      return;
    }

    isLoaded = true;

    await read(async (worker, file) => {
      if (
        band.value === null ||
        integrationRef.value === null ||
        extractor.value === null
      ) {
        return;
      }

      relativeTrajectories.value = await worker.readRelativeTrajectories(
        file,
        band.value.name,
        integrationRef.value.seconds,
        extractor.value.index,
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
