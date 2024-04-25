import {useLabelsSelection} from 'src/components/Label/useLabelsSelection';
import {useScatterColorScale} from 'src/components/Scatter/useScatterColorScale';
import {useScatterFilterMeta} from 'src/components/Scatter/useScatterFilterMeta';
import {useScatterFilterTime} from 'src/components/Scatter/useScatterFilterTime';
import {
  scatterLoadingRef,
  scatterLoadingTextRef,
} from 'src/components/Scatter/useScatterLoading';
import {useScatterTraces} from 'src/components/Scatter/useScatterTraces';
import {useBandSelection} from 'src/composables/band-selection';
import {useDraggables} from 'src/composables/draggables';
import {useSelectExtractor} from 'src/composables/extractor-selection';
import {useIntegrationSelection} from 'src/composables/integration-selection';
import {useReducerSelection} from 'src/composables/reducer-selection';
import {useStorageAggregatedFeatures} from 'src/composables/storage-aggregated-features';
import {useStorageAggregatedIndicators} from 'src/composables/storage-aggregated-indicators';
import {useStorageAggregatedIntervalDetails} from 'src/composables/storage-aggregated-interval-details';
import {useStorageAggregatedLabels} from 'src/composables/storage-aggregated-labels';
import {useStorageAggregatedSites} from 'src/composables/storage-aggregated-sites';
import {useStorageAggregatedTimestamps} from 'src/composables/storage-aggregated-timestamps';
import {useStorageLabels} from 'src/composables/storage-labels';
import {useStorageReducedFeatures} from 'src/composables/storage-reduced-features';
import {useTrajectories} from 'src/hooks/useTrajectories';
import {reactive, watchEffect} from 'vue';

interface IsSelectedRef {
  value: boolean;
}

export const isSelectedRef = reactive<IsSelectedRef>({
  value: false,
});

export function useSelect() {
  const {store} = useDraggables();
  const {readLabels, resetLabels} = useStorageLabels();
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
  const {integration, reset: resetIntegration} = useIntegrationSelection();
  const {extractor, reset: resetExtractor} = useSelectExtractor();
  const {reducer, reset: resetReducer} = useReducerSelection();

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
      integration.value === null ||
      extractor.value === null ||
      reducer.value === null
    ) {
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
    store.selection = false;
  };

  watchEffect(loadSelection);

  return {
    unloadSelection: unloadSelection,
  };
}
