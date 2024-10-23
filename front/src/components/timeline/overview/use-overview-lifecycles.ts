import {useScatterFilterTime} from 'src/components/scatter/use-scatter-filter-time';
import {useOverviewRender} from 'src/components/timeline/overview/use-overview-render';
import {useCalendarRange} from 'src/components/timeline/use-calendar-range';
import {useTimelineContext} from 'src/components/timeline/use-timeline-context';
import {
  type OverviewSize,
  useTimelineDom,
} from 'src/components/timeline/use-timeline-dom';
import {useDraggableCalendar} from 'src/draggables/calendar/use-draggable-calendar';
import {onMounted, watch} from 'vue';

export function useOverviewLifecycles({width, height}: OverviewSize) {
  const {container, canvas, updateSize} = useTimelineDom().overview;
  const {mount} = useTimelineContext().overview;
  const {render} = useOverviewRender();
  const {isActive} = useDraggableCalendar();
  const {left, right} = useCalendarRange();
  const {filterByTime} = useScatterFilterTime();

  onMounted(render);
  watch([container, canvas], mount);
  watch([width, height], () => updateSize({width: width, height: height}));
  watch([left, right, isActive], filterByTime);

  // watch(width, render);
  // watch([windowStart, windowEnd], render);
}
