import {useBandSelection} from 'src/composables/use-band-selection';
import {useExtractorSelection} from 'src/composables/use-extractor-selection';
import {useIntegrationSelection} from 'src/composables/use-integration-selection';
import {useStorageReader} from 'src/composables/use-storage-reader';
import {ref} from 'vue';

export interface RelativeTrajectory {
  index: number;
  name: string;
  labelProperty: string;
  labelValue: string;
  values: number[];
  timestamps: number[];
  quartiles: Nullable<[number, number][]>; // TODO: Make non nullable version 14
}

const relativeTrajectories = ref<RelativeTrajectory[] | null>(null);

export function useRelativeTrajectories() {
  const {read: r} = useStorageReader();

  const read = async () => {
    await r(async (worker, file) => {
      const {band} = useBandSelection();
      const {integration} = useIntegrationSelection();
      const {extractor} = useExtractorSelection();

      if (
        band.value === null ||
        integration.value === null ||
        extractor.value === null
      ) {
        return;
      }

      relativeTrajectories.value = await worker.readRelativeTrajectories(
        file,
        band.value.name,
        integration.value.seconds,
        extractor.value.index,
      );
    });
  };

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
    read: read,
  };
}
