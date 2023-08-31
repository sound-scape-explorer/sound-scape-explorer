import {useLabelsSelection} from 'src/components/Label/useLabelsSelection';
import {useScatterColorScale} from 'src/components/Scatter/useScatterColorScale';
import {useScatterFilterMeta} from 'src/components/Scatter/useScatterFilterMeta';
import {useScatterFilterTime} from 'src/components/Scatter/useScatterFilterTime';
import {
  scatterLoadingRef,
  scatterLoadingTextRef,
} from 'src/components/Scatter/useScatterLoading';
import {useScatterTraces} from 'src/components/Scatter/useScatterTraces';
import {reactive, watchEffect} from 'vue';

import {useAggregatedFeatures} from './useAggregatedFeatures';
import {useAggregatedIndicators} from './useAggregatedIndicators';
import {useAggregatedIntervalDetails} from './useAggregatedIntervalDetails';
import {useAggregatedLabels} from './useAggregatedLabels';
import {useAggregatedSites} from './useAggregatedSites';
import {useAggregatedTimestamps} from './useAggregatedTimestamps';
import {bandRef} from './useBands';
import {extractorRef} from './useExtractors';
import {integrationRef} from './useIntegrations';
import {useLabels} from './useLabels';
import {useReducedFeatures} from './useReducedFeatures';
import {reducerRef} from './useReducers';

interface IsSelectedRef {
  value: boolean;
}

export const isSelectedRef = reactive<IsSelectedRef>({
  value: false,
});

export function useSelection() {
  const {readLabels} = useLabels();
  const {readAggregatedFeatures} = useAggregatedFeatures();
  const {readAggregatedIndicators} = useAggregatedIndicators();
  const {readAggregatedTimestamps} = useAggregatedTimestamps();
  const {readAggregatedSites} = useAggregatedSites();
  const {readAggregatedIntervalDetails} = useAggregatedIntervalDetails();
  const {readAggregatedLabels} = useAggregatedLabels();
  const {readReducedFeatures} = useReducedFeatures();
  const {readColorScale} = useScatterColorScale();
  const {buildSelection} = useLabelsSelection();
  const {renderTraces} = useScatterTraces();
  const {filterByMeta} = useScatterFilterMeta();
  const {filterByTime} = useScatterFilterTime();

  watchEffect(async () => {
    if (
      bandRef.value === null ||
      integrationRef.value === null ||
      extractorRef.value === null ||
      reducerRef.value === null
    ) {
      console.log('selected false');
      isSelectedRef.value = false;
      return;
    }

    console.log('selected true');
    isSelectedRef.value = true;
    scatterLoadingRef.value = true;

    scatterLoadingTextRef.value = 'Reading labels';
    await readLabels();

    scatterLoadingTextRef.value = 'Reading features';
    await readAggregatedFeatures();

    scatterLoadingTextRef.value = 'Reading indicators';
    await readAggregatedIndicators();

    scatterLoadingTextRef.value = 'Reading timestamps';
    await readAggregatedTimestamps();

    scatterLoadingTextRef.value = 'Reading sites';
    await readAggregatedSites();

    scatterLoadingTextRef.value = 'Reading intervals';
    await readAggregatedIntervalDetails();

    scatterLoadingTextRef.value = 'Reading labels';
    await readAggregatedLabels();

    scatterLoadingTextRef.value = 'Reading reduced features';
    await readReducedFeatures();

    buildSelection();
    readColorScale();

    filterByMeta();
    filterByTime();

    renderTraces();

    console.log('selection done');
    scatterLoadingRef.value = false;
  });
}
