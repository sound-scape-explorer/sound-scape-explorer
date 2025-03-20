import {useBands} from 'src/composables/use-bands';
import {useExtractors} from 'src/composables/use-extractors';
import {useIntegrations} from 'src/composables/use-integrations';
import {useReducerOptions} from 'src/composables/use-reducer-options';
import {useStorageReader} from 'src/composables/use-storage-reader';
import {type ReducerDtoWithObjects} from 'src/dtos';
import {ref} from 'vue';

const reducers = ref<ReducerDtoWithObjects[] | null>(null);

export function useReducers() {
  const {read: readStorage} = useStorageReader();
  const {create} = useReducerOptions();
  const {bands} = useBands();
  const {integrations} = useIntegrations();
  const {extractors} = useExtractors();

  const read = async () => {
    await readStorage(async (worker, file) => {
      if (
        bands.value === null ||
        integrations.value === null ||
        extractors.value === null
      ) {
        return;
      }

      const storageReducers = await worker.readReducers(file);
      const objectReducers = new Array<ReducerDtoWithObjects>(
        storageReducers.length,
      );

      for (const storageReducer of storageReducers) {
        const objectBands =
          storageReducer.bands.length === 0
            ? bands.value
            : bands.value.filter((b) => storageReducer.bands.includes(b.index));

        const objectIntegrations =
          storageReducer.integrations.length === 0
            ? integrations.value
            : integrations.value.filter((i) =>
              storageReducer.integrations.includes(i.index),
            );

        const objectExtractors =
          storageReducer.extractors.length === 0
            ? extractors.value
            : extractors.value.filter((e) =>
              storageReducer.extractors.includes(e.index),
            );

        const objectReducer: ReducerDtoWithObjects = {
          ...storageReducer,
          bands: objectBands,
          integrations: objectIntegrations,
          extractors: objectExtractors,
        };

        objectReducers[storageReducer.index] = objectReducer;
      }

      reducers.value = objectReducers;
    });

    if (reducers.value) {
      create(reducers.value);
    }
  };

  return {
    reducers: reducers,
    read: read,
  };
}
