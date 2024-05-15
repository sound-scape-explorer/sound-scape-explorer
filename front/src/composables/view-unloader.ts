import {useScatterColorScale} from 'src/components/scatter/scatter-color-scale';
import {useScatterFilterLabel} from 'src/components/scatter/scatter-filter-label';
import {useScatterFilterTime} from 'src/components/scatter/scatter-filter-time';
import {useScatterLoading} from 'src/components/scatter/scatter-loading';
import {useScatterTraces} from 'src/components/scatter/scatter-traces';
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
import {useStorageReducedFeatures} from 'src/composables/storage-reduced-features';
import {useTrajectoriesSelection} from 'src/composables/trajectories-selection';
import {useLabelSelection} from 'src/draggables/label/label-selection';

export function useViewUnloader() {
  const {store} = useDraggables();
  const {resetAggregatedFeatures} = useStorageAggregatedFeatures();
  const {resetAggregatedIndicators} = useStorageAggregatedIndicators();
  const {resetAggregatedTimestamps} = useStorageAggregatedTimestamps();
  const {resetAggregatedSites} = useStorageAggregatedSites();
  const {resetAggregatedIntervalDetails} =
    useStorageAggregatedIntervalDetails();
  const {resetAggregatedLabels} = useStorageAggregatedLabels();
  const {resetReducedFeatures} = useStorageReducedFeatures();
  const {resetColorScale} = useScatterColorScale();
  const {resetSelection} = useLabelSelection();
  const {reset: resetTrajectoriesSelection} = useTrajectoriesSelection();
  const {resetTraces, isEnabled} = useScatterTraces();
  const {reset: resetFilterByLabel} = useScatterFilterLabel();
  const {resetFilterByTime} = useScatterFilterTime();
  const {closeAllDraggables} = useDraggables();

  const {reset: resetBand} = useBandSelection();
  const {reset: resetIntegration} = useIntegrationSelection();
  const {reset: resetExtractor} = useSelectExtractor();
  const {reset: resetReducer} = useReducerSelection();
  const {isLoading, loadingText} = useScatterLoading();

  const unload = () => {
    loadingText.value = 'Unloading selection...';
    isLoading.value = true;
    isEnabled.value = false;

    closeAllDraggables();
    resetTrajectoriesSelection();
    resetSelection();
    resetColorScale();
    resetTraces();
    resetFilterByLabel();
    resetFilterByTime();

    resetAggregatedFeatures();
    resetAggregatedIndicators();
    resetAggregatedTimestamps();
    resetAggregatedSites();
    resetAggregatedIntervalDetails();
    resetAggregatedLabels();
    resetReducedFeatures();

    resetBand();
    resetIntegration();
    resetExtractor();
    resetReducer();

    isLoading.value = false;
    store.view = true;
  };

  return {
    unload: unload,
  };
}
