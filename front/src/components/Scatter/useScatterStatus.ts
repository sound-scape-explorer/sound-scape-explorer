import {aggregatedTimestampsRef} from 'src/hooks/useAggregatedTimestamps';
import {bandRef} from 'src/hooks/useBands';
import {extractorRef} from 'src/hooks/useExtractors';
import {integrationRef} from 'src/hooks/useIntegrations';
import {reducerRef} from 'src/hooks/useReducers';
import {reactive, watchEffect} from 'vue';

interface ScatterReadyRef {
  value: boolean;
}

export const scatterReadyRef = reactive<ScatterReadyRef>({
  value: false,
});

interface ScatterLoadingRef {
  value: boolean;
}

export const scatterLoadingRef = reactive<ScatterLoadingRef>({
  value: false,
});

export function useScatterStatus() {
  watchEffect(() => {
    if (aggregatedTimestampsRef.value === null) {
      scatterReadyRef.value = false;
      return;
    }

    scatterReadyRef.value = true;
    scatterLoadingRef.value = false;
  });
}
