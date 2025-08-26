import {useScatterColorScale} from 'src/components/scatter/use-scatter-color-scale';
import {useScatterFilterSpatial} from 'src/components/scatter/use-scatter-filter-spatial';
import {useScatterFilterTag} from 'src/components/scatter/use-scatter-filter-tag';
import {useScatterFilterTemporal} from 'src/components/scatter/use-scatter-filter-temporal';
import {useScatterFilterTime} from 'src/components/scatter/use-scatter-filter-time';
import {useScatterLoading} from 'src/components/scatter/use-scatter-loading';
import {useScatterRender} from 'src/components/scatter/use-scatter-render';
import {useAggregations} from 'src/composables/use-aggregations';
import {DraggableKey, useDraggables} from 'src/composables/use-draggables';
import {useReductions} from 'src/composables/use-reductions';
import {useTrajectoriesSelection} from 'src/composables/use-trajectories-selection';
import {useViewSelection} from 'src/composables/use-view-selection';
import {useTagSelection} from 'src/draggables/tags/use-tag-selection';
import {useTemporalThresholds} from 'src/draggables/temporal/use-temporal-thresholds';

export function useViewUnloader() {
  const {open, closeAll} = useDraggables();
  const {reset: resetAggregations} = useAggregations();
  const {reset: resetReductionEmbeddings} = useReductions();
  const {resetColorScale} = useScatterColorScale();
  const {resetSelection} = useTagSelection();
  const {reset: resetTrajectoriesSelection} = useTrajectoriesSelection();
  const {reset: resetScatter, isEnabled} = useScatterRender();
  const {reset: resetFilterByLabel} = useScatterFilterTag();
  const {reset: resetFilterTemporal} = useScatterFilterTemporal();
  const {reset: resetFilterByTime} = useScatterFilterTime();
  const {reset: resetFilterSpatial} = useScatterFilterSpatial();
  const {reset: resetViewSelection} = useViewSelection();
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
    resetScatter();
    resetFilterByLabel();
    resetFilterByTime();
    resetFilterTemporal();
    resetFilterSpatial();

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
