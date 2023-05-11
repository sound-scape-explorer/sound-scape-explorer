import {reactive, watch} from 'vue';
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
  watch(metasRef, () => {
    if (metasRef.value === null) {
      return;
    }

    const metaProperties = Object.keys(metasRef.value);
    metaPropertiesRef.value = metaProperties;
    metaPropertiesAsColorTypesRef.value =
      convertSlugsToColorTypes(metaProperties);
  });
}
