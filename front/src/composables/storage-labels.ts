import {useBandSelection} from 'src/composables/band-selection';
import {useIntegrationSelection} from 'src/composables/integration-selection';
import {useStorageReader} from 'src/composables/storage-reader';
import {useStorageReady} from 'src/composables/storage-ready';
import {convertSlugsToColorTypes} from 'src/utils/convert-slugs-to-color-types';
import {ref} from 'vue';

// Label properties and sets
export interface Labels {
  [property: string]: string[];
}

let isLoaded = false;
const labels = ref<Labels | null>(null);
const labelsProperties = ref<string[] | null>(null);
const labelsSets = ref<string[][] | null>(null);
const labelsPropertiesAsColorTypes = ref<string[] | null>(null);

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
      if (band.value === null || integration.value === null) {
        return;
      }

      labels.value = await worker.readLabels(
        file,
        band.value.name,
        integration.value.seconds,
      );

      labelsSets.value = Object.values(labels.value);
      const properties = Object.keys(labels.value);
      labelsProperties.value = properties;
      labelsPropertiesAsColorTypes.value = convertSlugsToColorTypes(properties);
    });
  };

  const resetLabels = () => {
    labels.value = null;
    labelsSets.value = null;
    labelsProperties.value = null;
    labelsPropertiesAsColorTypes.value = null;
  };

  return {
    labels: labels,
    labelsProperties: labelsProperties,
    labelsSets: labelsSets,
    labelsPropertiesAsColorTypes: labelsPropertiesAsColorTypes,
    readLabels: readLabels,
    resetLabels: resetLabels,
  };
}
