import {useScatterFilterCalendar} from 'src/components/scatter/use-scatter-filter-calendar';
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
import {onMounted, onUnmounted, watch} from 'vue';
import {useClientSettings} from 'src/composables/use-client-settings';

export function useOverviewLifecycles({width, height}: OverviewSize) {
  const {container, canvas, updateSize} = useTimelineDom().overview;
  const {mount} = useTimelineContext().overview;
  const {render} = useOverviewRender();
  const {isActive} = useDraggableCalendar();
  const {left, right, start, end} = useTimelineRange();
  const {filter: filterByCalendar} = useScatterFilterCalendar();
  const {update: updateElements} = useOverviewElements();
  const {position} = useOverviewHandlers();
  const {isHovering, isDragging} = useTimelineHandlers().overview;
  const {timeshift} = useClientSettings();

  let filterTimer: ReturnType<typeof setTimeout> | null = null;

  const debouncedFilter = () => {
    if (!isActive.value) {
      return;
    }

    if (filterTimer !== null) {
      clearTimeout(filterTimer);
    }

    filterTimer = setTimeout(() => {
      filterTimer = null;
      filterByCalendar();
    }, 150);
  };

  onMounted(render);
  onUnmounted(() => {
    if (filterTimer !== null) {
      clearTimeout(filterTimer);
    }
  });

  watch(
    [
      left,
      right,
      position,
      start,
      end,
      isHovering,
      isDragging,
      width,
      timeshift,
    ],
    render,
  );
  watch([container, canvas], mount);
  watch([width, height], () => updateSize({width, height}));
  watch([start, end, timeshift], updateElements);
  watch([left, right, isActive], debouncedFilter);
  watch(isActive, filterByCalendar);
}
