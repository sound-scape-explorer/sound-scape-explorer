import {convertSlugsToColorTypes} from 'src/utils/convert-slugs-to-color-types';
import {reactive} from 'vue';

import {useFileReader} from './file-reader';
import {bandRef} from './useBands';
import {integrationRef} from './useIntegrations';

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
  const {read} = useFileReader();

  const readLabels = () =>
    read(async (worker, file) => {
      if (bandRef.value === null || integrationRef.value === null) {
        return;
      }

      labelsRef.value = await worker.readLabels(
        file,
        bandRef.value.name,
        integrationRef.value.seconds,
      );

      labelsSetsRef.value = Object.values(labelsRef.value);
      const properties = Object.keys(labelsRef.value);
      labelsPropertiesRef.value = properties;
      labelsPropertiesAsColorTypesRef.value =
        convertSlugsToColorTypes(properties);
    });

  const resetLabels = () => {
    labelsRef.value = null;
    labelsSetsRef.value = null;
    labelsPropertiesRef.value = null;
    labelsPropertiesAsColorTypesRef.value = null;
  };

  return {
    readLabels: readLabels,
    resetLabels: resetLabels,
  };
}
