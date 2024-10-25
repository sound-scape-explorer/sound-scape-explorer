import {useScatterFilterTime} from 'src/components/scatter/use-scatter-filter-time';
import {useOverviewElements} from 'src/components/timeline/overview/use-overview-elements';
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
  const {left, right, start, end} = useCalendarRange();
  const {filterByTime} = useScatterFilterTime();
  const {update: updateElements} = useOverviewElements();

  onMounted(render);
  watch([container, canvas], mount);

  watch([width, height], () => updateSize({width: width, height: height}));

  watch([start, end], updateElements);

  watch([left, right, isActive], () => {
    if (!isActive.value) {
      return;
    }

    filterByTime();
  });

  watch(isActive, filterByTime);
}
