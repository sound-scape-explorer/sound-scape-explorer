import {useScatterFilterTime} from 'src/components/scatter/use-scatter-filter-time';
import {useOverviewElements} from 'src/components/timeline/overview/use-overview-elements';
import {useOverviewHandlers} from 'src/components/timeline/overview/use-overview-handlers';
import {useOverviewRender} from 'src/components/timeline/overview/use-overview-render';
import {useTimelineHandlers} from 'src/components/timeline/overview/use-timeline-handlers';
import {useTimelineContext} from 'src/components/timeline/use-timeline-context';
import {
  type OverviewSize,
  useTimelineDom,
} from 'src/components/timeline/use-timeline-dom';
import {useTimelineRange} from 'src/components/timeline/use-timeline-range';
import {useDraggableCalendar} from 'src/draggables/calendar/use-draggable-calendar';
import {onMounted, watch} from 'vue';

export function useOverviewLifecycles({width, height}: OverviewSize) {
  const {container, canvas, updateSize} = useTimelineDom().overview;
  const {mount} = useTimelineContext().overview;
  const {render} = useOverviewRender();
  const {isActive} = useDraggableCalendar();
  const {left, right, start, end} = useTimelineRange();
  const {filterByTime} = useScatterFilterTime();
  const {update: updateElements} = useOverviewElements();
  const {position} = useOverviewHandlers();
  const {isHovering, isDragging} = useTimelineHandlers().overview;

  const filter = () => {
    if (!isActive.value) {
      return;
    }

    filterByTime();
  };

  onMounted(render);
  watch(
    [left, right, position, start, end, isHovering, isDragging, width],
    render,
  );
  watch([container, canvas], mount);
  watch([width, height], () => updateSize({width, height}));
  watch([start, end], updateElements);
  watch([left, right, isActive], filter);
  watch(isActive, filterByTime);
}
