import {type AutoclusterDto} from '@shared/dtos';
import {useStorageReader} from 'src/composables/use-storage-reader';
import {useViewSelectionNew} from 'src/composables/use-view-selection-new';
import {ref} from 'vue';

export interface Autocluster {
  autocluster: AutoclusterDto;
  data: number[];
}

const autoclusters = ref<Autocluster[]>([]);

export function useAutoclusters() {
  const {read: r} = useStorageReader();
  const {extraction, band, integration} = useViewSelectionNew();

  const read = async () => {
    await r(async (worker, file) => {
      if (
        extraction.value === null ||
        band.value === null ||
        integration.value === null
      ) {
        return;
      }

      const dtos = extraction.value.autoclusters;
      const newAutoclusters: Autocluster[] = [];

      for (const dto of dtos) {
        const data = await worker.readAutoclusters(
          file,
          extraction.value.index,
          band.value.index,
          integration.value.index,
          dto.index,
        );

        const ac: Autocluster = {
          autocluster: dto,
          data,
        };

        newAutoclusters.push(ac);
      }

      autoclusters.value = newAutoclusters;
    });
  };

  const reset = () => {
    autoclusters.value = [];
  };

  return {
    autoclusters,
    read,
    reset,
  };
}
