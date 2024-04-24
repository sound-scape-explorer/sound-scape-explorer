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

import {useStorageReducedFeatures} from '../composables/storage-reduced-features';
import {useAggregatedFeatures} from './useAggregatedFeatures';
import {useAggregatedIndicators} from './useAggregatedIndicators';
import {useAggregatedIntervalDetails} from './useAggregatedIntervalDetails';
import {useAggregatedLabels} from './useAggregatedLabels';
import {useAggregatedSites} from './useAggregatedSites';
import {useAggregatedTimestamps} from './useAggregatedTimestamps';
import {bandRef, useBands} from './useBands';
import {extractorRef, useExtractors} from './useExtractors';
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
    useAggregatedFeatures();
  const {readAggregatedIndicators, resetAggregatedIndicators} =
    useAggregatedIndicators();
  const {readAggregatedTimestamps, resetAggregatedTimestamps} =
    useAggregatedTimestamps();
  const {readAggregatedSites, resetAggregatedSites} = useAggregatedSites();
  const {readAggregatedIntervalDetails, resetAggregatedIntervalDetails} =
    useAggregatedIntervalDetails();
  const {readAggregatedLabels, resetAggregatedLabels} = useAggregatedLabels();
  const {readReducedFeatures, resetReducedFeatures} =
    useStorageReducedFeatures();
  const {generateColorScale, resetColorScale} = useScatterColorScale();
  const {buildSelection, resetSelection} = useLabelsSelection();
  const {resetTrajectories} = useTrajectories();
  const {renderTraces, resetTraces} = useScatterTraces();
  const {filterByMeta, resetFilterByMeta} = useScatterFilterMeta();
  const {filterByTime, resetFilterByTime} = useScatterFilterTime();
  const {resetBand} = useBands();
  const {resetIntegration} = useIntegrations();
  const {resetExtractor} = useExtractors();
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
      bandRef.value === null ||
      integrationRef.value === null ||
      extractorRef.value === null ||
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
