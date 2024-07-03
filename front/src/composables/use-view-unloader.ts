import {useScatterColorScale} from 'src/components/scatter/use-scatter-color-scale';
import {useScatterFilterLabel} from 'src/components/scatter/use-scatter-filter-label';
import {useScatterFilterTime} from 'src/components/scatter/use-scatter-filter-time';
import {useScatterLoading} from 'src/components/scatter/use-scatter-loading';
import {useScatterTraces} from 'src/components/scatter/use-scatter-traces';
import {useBandSelection} from 'src/composables/use-band-selection';
import {useDraggables} from 'src/composables/use-draggables';
import {useSelectExtractor} from 'src/composables/use-extractor-selection';
import {useIntegrationSelection} from 'src/composables/use-integration-selection';
import {useReducerSelection} from 'src/composables/use-reducer-selection';
import {useStorageAggregatedFeatures} from 'src/composables/use-storage-aggregated-features';
import {useStorageAggregatedIndicators} from 'src/composables/use-storage-aggregated-indicators';
import {useStorageAggregatedIntervalDetails} from 'src/composables/use-storage-aggregated-interval-details';
import {useStorageAggregatedLabels} from 'src/composables/use-storage-aggregated-labels';
import {useStorageAggregatedSites} from 'src/composables/use-storage-aggregated-sites';
import {useStorageAggregatedTimestamps} from 'src/composables/use-storage-aggregated-timestamps';
import {useStorageReducedFeatures} from 'src/composables/use-storage-reduced-features';
import {useTrajectoriesSelection} from 'src/composables/use-trajectories-selection';
import {useLabelsSelection} from 'src/draggables/labels/use-labels-selection';

export function useViewUnloader() {
  const {open} = useDraggables();
  const {resetAggregatedFeatures} = useStorageAggregatedFeatures();
  const {resetAggregatedIndicators} = useStorageAggregatedIndicators();
  const {resetAggregatedTimestamps} = useStorageAggregatedTimestamps();
  const {resetAggregatedSites} = useStorageAggregatedSites();
  const {resetAggregatedIntervalDetails} =
    useStorageAggregatedIntervalDetails();
  const {resetAggregatedLabels} = useStorageAggregatedLabels();
  const {resetReducedFeatures} = useStorageReducedFeatures();
  const {resetColorScale} = useScatterColorScale();
  const {resetSelection} = useLabelsSelection();
  const {reset: resetTrajectoriesSelection} = useTrajectoriesSelection();
  const {resetTraces, isEnabled} = useScatterTraces();
  const {reset: resetFilterByLabel} = useScatterFilterLabel();
  const {resetFilterByTime} = useScatterFilterTime();
  const {closeAll} = useDraggables();

  const {reset: resetBand} = useBandSelection();
  const {reset: resetIntegration} = useIntegrationSelection();
  const {reset: resetExtractor} = useSelectExtractor();
  const {reset: resetReducer} = useReducerSelection();
  const {isLoading, loadingText} = useScatterLoading();

  const unload = () => {
    loadingText.value = 'Unloading selection...';
    isLoading.value = true;
    isEnabled.value = false;

    closeAll();
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
    open('view');
  };

  return {
    unload: unload,
  };
}
