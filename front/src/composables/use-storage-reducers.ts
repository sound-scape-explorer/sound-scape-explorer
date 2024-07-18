import {type Band, useBandStorage} from 'src/composables/use-band-storage';
import {
  type Extractor,
  useExtractorStorage,
} from 'src/composables/use-extractor-storage';
import {
  type Integration,
  useIntegrationStorage,
} from 'src/composables/use-integration-storage';
import {useReducerOptions} from 'src/composables/use-reducer-options';
import {useStorageReader} from 'src/composables/use-storage-reader';
import {ref} from 'vue';

export interface ReducerFromStorage {
  index: number;
  name: string;
  dimensions: number;
  bandsNames: Band['name'][];
  integrationsNames: Integration['name'][];
  rangesNames: string[];
}

export interface Reducer {
  index: number;
  name: string;
  dimensions: number;
  bands: Band[];
  integrations: Integration[];
  nnExtractors: Extractor[];
}

const reducers = ref<Reducer[] | null>(null);

export function useStorageReducers() {
  const {read: readStorage} = useStorageReader();
  const {create} = useReducerOptions();
  const {bands} = useBandStorage();
  const {integrations} = useIntegrationStorage();
  const {nnExtractors} = useExtractorStorage();

  const read = async () => {
    await readStorage(async (worker, file) => {
      if (
        bands.value === null ||
        integrations.value === null ||
        nnExtractors.value === null
      ) {
        return;
      }

      const reducersFromStorage = await worker.readReducers(file);
      const rs: Reducer[] = [];

      for (const rFS of reducersFromStorage) {
        const r: Reducer = {
          index: rFS.index,
          name: rFS.name,
          dimensions: rFS.dimensions,
          bands: bands.value.filter((band) =>
            rFS.bandsNames.includes(band.name),
          ),
          integrations: integrations.value.filter((integration) =>
            rFS.integrationsNames.includes(integration.name),
          ),
          nnExtractors: nnExtractors.value,
        };

        rs.push(r);
      }

      reducers.value = rs;
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
