import {type AutoclusterDto} from '@shared/dtos';
import {useStorageReader} from 'src/composables/use-storage-reader';
import {useViewSelectionNew} from 'src/composables/use-view-selection-new';
import {ref} from 'vue';

export interface Autoclustered {
  autocluster: AutoclusterDto;
  data: number[];
}

const autoclustered = ref<Autoclustered[]>([]);

export function useAutoclustered() {
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

      const autoclusters = extraction.value.autoclusters;
      const newAutoclustered: Autoclustered[] = [];

      for (const autocluster of autoclusters) {
        const data = await worker.readAutoclustered(
          file,
          extraction.value.index,
          band.value.index,
          integration.value.index,
          autocluster.index,
        );

        const ac: Autoclustered = {
          autocluster,
          data,
        };

        newAutoclustered.push(ac);
      }

      autoclustered.value = newAutoclustered;
    });
  };

  const reset = () => {
    autoclustered.value = [];
  };

  return {
    autoclustered,
    read,
    reset,
  };
}
