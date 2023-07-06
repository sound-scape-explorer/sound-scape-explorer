import {reactive, watchEffect} from 'vue';
import {metasRef} from './useStorageMetas';
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
    if (metasRef.value === null) {
      return;
    }

    const metaProperties = Object.keys(metasRef.value);
    metaPropertiesRef.value = metaProperties;
    metaPropertiesAsColorTypesRef.value =
      convertSlugsToColorTypes(metaProperties);
  };

  watchEffect(readMetaProperties);
}
