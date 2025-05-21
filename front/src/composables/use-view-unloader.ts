import {useScatterColorScale} from 'src/components/scatter/use-scatter-color-scale';
import {useScatterFilterTag} from 'src/components/scatter/use-scatter-filter-tag';
import {useScatterFilterTime} from 'src/components/scatter/use-scatter-filter-time';
import {useScatterLoading} from 'src/components/scatter/use-scatter-loading';
import {useScatterTraces} from 'src/components/scatter/use-scatter-traces';
import {useAggregations} from 'src/composables/use-aggregations';
import {DraggableKey, useDraggables} from 'src/composables/use-draggables';
import {useReductions} from 'src/composables/use-reductions';
import {useTrajectoriesSelection} from 'src/composables/use-trajectories-selection';
import {useViewSelectionNew} from 'src/composables/use-view-selection-new';
import {useTagSelection} from 'src/draggables/tags/use-tag-selection';
import {useTemporalThresholds} from 'src/draggables/temporal/use-temporal-thresholds';

export function useViewUnloader() {
  const {open, closeAll} = useDraggables();
  const {reset: resetAggregations} = useAggregations();
  const {reset: resetReductionEmbeddings} = useReductions();
  const {resetColorScale} = useScatterColorScale();
  const {resetSelection} = useTagSelection();
  const {reset: resetTrajectoriesSelection} = useTrajectoriesSelection();
  const {resetTraces, isEnabled} = useScatterTraces();
  const {reset: resetFilterByLabel} = useScatterFilterTag();
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

    resetAggregations();
    resetReductionEmbeddings();

    resetViewSelection();
    resetTemporalThresholds();

    isLoading.value = false;
    open(DraggableKey.enum.view);
  };

  return {
    unload,
  };
}
