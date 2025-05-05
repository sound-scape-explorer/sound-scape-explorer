import {useScatterColorScale} from 'src/components/scatter/use-scatter-color-scale';
import {useScatterFilterLabels} from 'src/components/scatter/use-scatter-filter-labels';
import {useScatterFilterTime} from 'src/components/scatter/use-scatter-filter-time';
import {useScatterLoading} from 'src/components/scatter/use-scatter-loading';
import {useScatterTraces} from 'src/components/scatter/use-scatter-traces';
import {useAggregated} from 'src/composables/use-aggregated';
import {useDraggables} from 'src/composables/use-draggables';
import {useStorageReducedEmbeddings} from 'src/composables/use-storage-reduced-embeddings';
import {useTrajectoriesSelection} from 'src/composables/use-trajectories-selection';
import {useViewSelectionNew} from 'src/composables/use-view-selection-new';
import {useLabelSelection} from 'src/draggables/labels/use-label-selection';
import {useTemporalThresholds} from 'src/draggables/temporal/use-temporal-thresholds';

export function useViewUnloader() {
  const {open, closeAll} = useDraggables();
  const {reset: resetAggregated} = useAggregated();
  const {resetReducedEmbeddings} = useStorageReducedEmbeddings();
  const {resetColorScale} = useScatterColorScale();
  const {resetSelection} = useLabelSelection();
  const {reset: resetTrajectoriesSelection} = useTrajectoriesSelection();
  const {resetTraces, isEnabled} = useScatterTraces();
  const {reset: resetFilterByLabel} = useScatterFilterLabels();
  const {resetFilterByTime} = useScatterFilterTime();
  const {reset: resetViewSelection} = useViewSelectionNew();
  const {isLoading, loadingText} = useScatterLoading();
  const {reset: resetTemporalThresholds} = useTemporalThresholds();

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

    resetAggregated();
    resetReducedEmbeddings();

    resetViewSelection();
    resetTemporalThresholds();

    isLoading.value = false;
    open('view');
  };

  return {
    unload,
  };
}
