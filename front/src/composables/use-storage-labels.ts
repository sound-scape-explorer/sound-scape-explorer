import {useBandSelection} from 'src/composables/use-band-selection';
import {useIntegrationSelection} from 'src/composables/use-integration-selection';
import {useStorageReader} from 'src/composables/use-storage-reader';
import {useStorageReady} from 'src/composables/use-storage-ready';
import {convertSlugsToColorTypes} from 'src/utils/convert-slugs-to-color-types';
import {ref} from 'vue';

// Label properties and sets
export interface Labels {
  [property: string]: string[];
}

let isLoaded = false;
const labels = ref<Labels | null>(null);
const labelProperties = ref<string[] | null>(null);
const labelSets = ref<string[][] | null>(null);
const labelPropertiesAsColorTypes = ref<string[] | null>(null);

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

      labelSets.value = Object.values(labels.value);
      const properties = Object.keys(labels.value);
      labelProperties.value = properties;
      labelPropertiesAsColorTypes.value = convertSlugsToColorTypes(properties);
    });
  };

  return {
    labels: labels,
    labelProperties: labelProperties,
    labelSets: labelSets,
    labelPropertiesAsColorTypes: labelPropertiesAsColorTypes,
    readLabels: readLabels,
    // resetLabels: resetLabels,
  };
}
