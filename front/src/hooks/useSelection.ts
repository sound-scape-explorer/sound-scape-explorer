import {useLabelsSelection} from 'src/components/Label/useLabelsSelection';
import {useScatterColorScale} from 'src/components/Scatter/useScatterColorScale';
import {useScatterFilterMeta} from 'src/components/Scatter/useScatterFilterMeta';
import {useScatterFilterTime} from 'src/components/Scatter/useScatterFilterTime';
import {scatterLoadingRef} from 'src/components/Scatter/useScatterLoading';
import {useScatterTraces} from 'src/components/Scatter/useScatterTraces';
import {reactive, watchEffect} from 'vue';

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

    await readLabels();
    await readAggregatedTimestamps();
    await readAggregatedSites();
    await readAggregatedIntervalDetails();
    await readAggregatedLabels();
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
