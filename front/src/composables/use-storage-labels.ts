import {StorageLabelsError} from 'src/common/Errors';
import {useBandSelection} from 'src/composables/use-band-selection';
import {useExtractorSelection} from 'src/composables/use-extractor-selection';
import {useIntegrationSelection} from 'src/composables/use-integration-selection';
import {useStorageReader} from 'src/composables/use-storage-reader';
import {useStorageReady} from 'src/composables/use-storage-ready';
import {ref} from 'vue';

// Label properties and sets
export interface Labels {
  [property: string]: string[];
}

let isLoaded = false;

const labels = ref<Labels | null>(null);

const labelProperties = ref<string[] | null>(null);
const labelSets = ref<string[][] | null>(null);

// `Actual` for existing in storage, (slice manually injected labels)
const injectedCount = 1;
const labelPropertiesActual = ref<string[] | null>(null);
const labelSetsActual = ref<string[][] | null>(null);

export function useStorageLabels() {
  const {read} = useStorageReader();
  const {isReady} = useStorageReady();

  const readLabels = async () => {
    if (!isReady.value) {
      return;
    }

    if (isLoaded) {
      return;
    }

    isLoaded = true;

    await read(async (worker, file) => {
      const {band} = useBandSelection();
      const {integration} = useIntegrationSelection();
      const {extractor} = useExtractorSelection();

      if (
        band.value === null ||
        integration.value === null ||
        extractor.value === null
      ) {
        throw new StorageLabelsError('selection is missing');
      }

      labels.value = await worker.readLabels(
        file,
        band.value.index,
        integration.value.index,
        extractor.value.index,
      );

      const properties = Object.keys(labels.value);

      labelSets.value = Object.values(labels.value);
      labelProperties.value = properties;

      labelSetsActual.value = labelSets.value.slice(injectedCount);
      labelPropertiesActual.value = labelProperties.value.slice(injectedCount);
    });
  };

  return {
    labels: labels,
    labelProperties: labelProperties,
    labelPropertiesActual: labelPropertiesActual,
    labelSets: labelSets,
    labelSetsActual: labelSetsActual,
    readLabels: readLabels,
  };
}
