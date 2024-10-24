import {useOverviewRender} from 'src/components/timeline/overview/use-overview-render';
import {useTimelineContext} from 'src/components/timeline/use-timeline-context';
import {
  type OverviewSize,
  useTimelineDom,
} from 'src/components/timeline/use-timeline-dom';
import {useTimelineRange} from 'src/components/timeline/use-timeline-range';
import {onMounted, watch} from 'vue';

export function useOverviewLifecycles({width, height}: OverviewSize) {
  const {container, canvas, updateSize} = useTimelineDom().overview;
  const {mount} = useTimelineContext().overview;
  const {render} = useOverviewRender();
  const {min, max, updateRange} = useTimelineRange();

  onMounted(render);
  watch([container, canvas], mount);
  watch([min, max], updateRange);
  watch([width, height], () => updateSize({width: width, height: height}));

  // watch(width, render);
  // watch([windowStart, windowEnd], render);
}
