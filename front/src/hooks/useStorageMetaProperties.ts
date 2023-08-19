import {convertSlugsToColorTypes} from 'src/utils/convert-slugs-to-color-types';
import {reactive, watchEffect} from 'vue';

import {labelsRef} from './useLabels';

interface MetaPropertiesRef {
  value: string[] | null;
}

export const metaPropertiesRef = reactive<MetaPropertiesRef>({
  value: null,
});

export const metaPropertiesAsColorTypesRef = reactive<MetaPropertiesRef>({
  value: null,
});

export function useStorageMetaProperties() {
  const readMetaProperties = () => {
    if (labelsRef.value === null) {
      return;
    }

    const properties = Object.keys(labelsRef.value);
    metaPropertiesRef.value = properties;
    metaPropertiesAsColorTypesRef.value = convertSlugsToColorTypes(properties);
  };

  watchEffect(readMetaProperties);
}
