import {asyncComputed} from '@vueuse/core';
import {computed} from 'vue';
import {useStorage} from '../../hooks/useStorage';
import {selectionStore} from '../Selection/selectionStore';

export async function useMetas() {
  const {getStorageMetas} = await useStorage();

  const metasRef = asyncComputed(async () => {
    if (!selectionStore.band || !selectionStore.integration) {
      return;
    }

    return await getStorageMetas(selectionStore.band, selectionStore.integration);
  });

  const metaPropertiesRef = computed(() => {
    return Object.keys(metasRef.value ?? {});
  });
  const metaSetsRef = computed(() => {
    return Object.values(metasRef.value ?? {});
  });

  return {
    metaPropertiesRef: metaPropertiesRef,
    metaSetsRef: metaSetsRef,
  };
}
