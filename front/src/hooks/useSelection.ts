import {appDraggablesStore} from 'src/components/AppDraggable/appDraggablesStore';
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

import {useBandSelection} from '../composables/band-selection';
import {useExtractorSelection} from '../composables/extractor-selection';
import {useStorageAggregatedFeatures} from '../composables/storage-aggregated-features';
import {useStorageAggregatedIndicators} from '../composables/storage-aggregated-indicators';
import {useStorageAggregatedIntervalDetails} from '../composables/storage-aggregated-interval-details';
import {useStorageAggregatedLabels} from '../composables/storage-aggregated-labels';
import {useStorageAggregatedSites} from '../composables/storage-aggregated-sites';
import {useStorageAggregatedTimestamps} from '../composables/storage-aggregated-timestamps';
import {useStorageReducedFeatures} from '../composables/storage-reduced-features';
import {integrationRef, useIntegrations} from './useIntegrations';
import {useLabels} from './useLabels';
import {reducerRef, useReducers} from './useReducers';
import {useTrajectories} from './useTrajectories';

interface IsSelectedRef {
  value: boolean;
}

export const isSelectedRef = reactive<IsSelectedRef>({
  value: false,
});

export function useSelection() {
  const {readLabels, resetLabels} = useLabels();
  const {readAggregatedFeatures, resetAggregatedFeatures} =
    useStorageAggregatedFeatures();
  const {readAggregatedIndicators, resetAggregatedIndicators} =
    useStorageAggregatedIndicators();
  const {readAggregatedTimestamps, resetAggregatedTimestamps} =
    useStorageAggregatedTimestamps();
  const {readAggregatedSites, resetAggregatedSites} =
    useStorageAggregatedSites();
  const {readAggregatedIntervalDetails, resetAggregatedIntervalDetails} =
    useStorageAggregatedIntervalDetails();
  const {readAggregatedLabels, resetAggregatedLabels} =
    useStorageAggregatedLabels();
  const {readReducedFeatures, resetReducedFeatures} =
    useStorageReducedFeatures();
  const {generateColorScale, resetColorScale} = useScatterColorScale();
  const {buildSelection, resetSelection} = useLabelsSelection();
  const {resetTrajectories} = useTrajectories();
  const {renderTraces, resetTraces} = useScatterTraces();
  const {filterByMeta, resetFilterByMeta} = useScatterFilterMeta();
  const {filterByTime, resetFilterByTime} = useScatterFilterTime();
  const {band, reset: resetBand} = useBandSelection();
  const {resetIntegration} = useIntegrations();
  const {extractor, reset: resetExtractor} = useExtractorSelection();
  const {resetReducer} = useReducers();

  const unloadSelection = () => {
    scatterLoadingTextRef.value = 'Unloading selection...';
    scatterLoadingRef.value = true;

    resetBand();
    resetIntegration();
    resetExtractor();
    resetReducer();

    resetLabels();
    resetAggregatedFeatures();
    resetAggregatedIndicators();
    resetAggregatedTimestamps();
    resetAggregatedSites();
    resetAggregatedIntervalDetails();
    resetAggregatedLabels();
    resetReducedFeatures();

    resetTrajectories();
    resetSelection();
    resetColorScale();
    resetTraces();
    resetFilterByMeta();
    resetFilterByTime();

    scatterLoadingRef.value = false;
    isSelectedRef.value = false;
  };

  const loadSelection = async () => {
    if (
      band.value === null ||
      integrationRef.value === null ||
      extractor.value === null ||
      reducerRef.value === null
    ) {
      isSelectedRef.value = false;
      return;
    }

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
    generateColorScale();

    filterByMeta();
    filterByTime();

    renderTraces();

    scatterLoadingRef.value = false;
    appDraggablesStore.selection = false;
  };

  watchEffect(loadSelection);

  return {
    unloadSelection: unloadSelection,
  };
}
