import {convertSlugsToColorTypes} from 'src/utils/convert-slugs-to-color-types';
import {reactive} from 'vue';

import {bandRef} from './useBands';
import {integrationRef} from './useIntegrations';
import {storageFileRef} from './useStorageFile';
import {workerRef} from './useWorker';

// Label properties and sets
export interface Labels {
  [property: string]: string[];
}

interface LabelsRef {
  value: Labels | null;
}

export const labelsRef = reactive<LabelsRef>({
  value: null,
});

interface LabelsSetsRef {
  value: string[][] | null;
}

export const labelsSetsRef = reactive<LabelsSetsRef>({
  value: null,
});

interface LabelsPropertiesRef {
  value: string[] | null;
}

export const labelsPropertiesRef = reactive<LabelsPropertiesRef>({
  value: null,
});

export const labelsPropertiesAsColorTypesRef = reactive<LabelsPropertiesRef>({
  value: null,
});

export function useLabels() {
  const readLabels = async () => {
    if (
      storageFileRef.value === null ||
      workerRef.value === null ||
      bandRef.value === null ||
      integrationRef.value === null
    ) {
      return;
    }

    labelsRef.value = await workerRef.value.readLabels(
      storageFileRef.value,
      bandRef.value.name,
      integrationRef.value.seconds,
    );

    labelsSetsRef.value = Object.values(labelsRef.value);
    const properties = Object.keys(labelsRef.value);
    labelsPropertiesRef.value = properties;
    labelsPropertiesAsColorTypesRef.value =
      convertSlugsToColorTypes(properties);
  };

  return {
    readLabels: readLabels,
  };
}
