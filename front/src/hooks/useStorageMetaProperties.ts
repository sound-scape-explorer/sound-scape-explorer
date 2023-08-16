import {reactive, watchEffect} from 'vue';
import {labelsRef} from './useLabels';
import {convertSlugsToColorTypes} from 'src/utils/convert-slugs-to-color-types';

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

    const metaProperties = Object.keys(labelsRef.value);
    metaPropertiesRef.value = metaProperties;
    metaPropertiesAsColorTypesRef.value =
      convertSlugsToColorTypes(metaProperties);
  };

  watchEffect(readMetaProperties);
}
