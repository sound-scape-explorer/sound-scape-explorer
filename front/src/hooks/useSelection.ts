import {reactive, watchEffect} from 'vue';

import {bandRef} from './useBands';
import {extractorRef} from './useExtractors';
import {integrationRef} from './useIntegrations';
import {reducerRef} from './useReducers';

interface IsSelectedRef {
  value: boolean;
}

export const isSelectedRef = reactive<IsSelectedRef>({
  value: false,
});

export function useSelection() {
  watchEffect(() => {
    if (
      bandRef.value === null ||
      integrationRef.value === null ||
      extractorRef.value === null ||
      reducerRef.value === null
    ) {
      isSelectedRef.value = false;
      return;
    }

    isSelectedRef.value = true;
  });
}
