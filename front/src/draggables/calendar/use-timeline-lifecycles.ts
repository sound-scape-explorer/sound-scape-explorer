import {useDraggableCalendar} from 'src/draggables/calendar/use-draggable-calendar';
import {useTimelineConfig} from 'src/draggables/calendar/use-timeline-config';
import {useTimelineContext} from 'src/draggables/calendar/use-timeline-context';
import {useTimelineElements} from 'src/draggables/calendar/use-timeline-elements';
import {useTimelineHandlers} from 'src/draggables/calendar/use-timeline-handlers';
import {useTimelineRenderer} from 'src/draggables/calendar/use-timeline-renderer';
import {useTimelineScale} from 'src/draggables/calendar/use-timeline-scale';
import {watch} from 'vue';

export function useTimelineLifecycles() {
  const {containerWidth, canvas, mountContext} = useTimelineContext();
  const {refreshWidth, refreshTime} = useTimelineConfig();
  const {position} = useTimelineHandlers();
  const {render} = useTimelineRenderer();
  const {dateStart, dateEnd} = useDraggableCalendar();
  const {elements, update} = useTimelineElements();
  const {generate: generateScale} = useTimelineScale();

  watch(canvas, () => {
    mountContext();
    generateScale();
  });

  watch(containerWidth, () => refreshWidth(containerWidth.value));

  watch([containerWidth, position], () => requestAnimationFrame(render));
  watch([dateStart, dateEnd], update);

  watch(elements, () => {
    refreshTime(elements);
    requestAnimationFrame(render);
  });
}
