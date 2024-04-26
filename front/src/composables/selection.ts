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
import {useTrajectoriesSelection} from 'src/composables/trajectories-selection';
import {useLabelSelection} from 'src/draggables/label/label-selection';
import {useScatterColorScale} from 'src/scatter/scatter-color-scale';
import {useScatterFilterMeta} from 'src/scatter/scatter-filter-meta';
import {useScatterFilterTime} from 'src/scatter/scatter-filter-time';
import {
  scatterLoadingRef,
  scatterLoadingTextRef,
} from 'src/scatter/scatter-loading';
import {useScatterTraces} from 'src/scatter/scatter-traces';
import {ref, watchEffect} from 'vue';

const hasSelection = ref<boolean>(false);

export function useSelection() {
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
  const {buildSelection, resetSelection} = useLabelSelection();
  const {reset: resetTrajectoriesSelection} = useTrajectoriesSelection();
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

    resetTrajectoriesSelection();
    resetSelection();
    resetColorScale();
    resetTraces();
    resetFilterByMeta();
    resetFilterByTime();

    scatterLoadingRef.value = false;
    hasSelection.value = false;
  };

  const load = async () => {
    if (
      hasSelection.value ||
      band.value === null ||
      integration.value === null ||
      extractor.value === null ||
      reducer.value === null
    ) {
      return;
    }
    hasSelection.value = true;
    scatterLoadingRef.value = true;
    console.log('selection');

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

  watchEffect(load);

  return {
    hasSelection: hasSelection,
    unloadSelection: unloadSelection,
  };
}
