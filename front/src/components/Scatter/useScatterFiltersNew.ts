import {reactive, watch} from 'vue';
import {useScatterFilterMeta} from './useScatterFilterMeta';

interface NeedsRefreshRef {
  value: boolean;
}

export const needsRefreshRef = reactive<NeedsRefreshRef>({
  value: false,
});

export function useScatterFiltersNew() {
  const {filterByMeta} = useScatterFilterMeta();

  const refresh = () => {
    if (needsRefreshRef.value === false) {
      return;
    }

    filterByMeta();
    needsRefreshRef.value = false;
  };

  const askForRefresh = () => {
    if (needsRefreshRef.value === true) {
      return;
    }

    needsRefreshRef.value = true;
  };

  watch(needsRefreshRef, refresh);

  return {
    askForRefresh: askForRefresh,
  };
}
