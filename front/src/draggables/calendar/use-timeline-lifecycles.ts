import {useTimelineConfig} from 'src/draggables/calendar/use-timeline-config';
import {useTimelineContext} from 'src/draggables/calendar/use-timeline-context';
import {useTimelineHandlers} from 'src/draggables/calendar/use-timeline-handlers';
import {useTimelineRenderer} from 'src/draggables/calendar/use-timeline-renderer';
import {watch} from 'vue';

export function useTimelineLifecycles() {
  const {containerWidth, canvas, context, mountContext} = useTimelineContext();
  const {config, refresh} = useTimelineConfig();
  const {position} = useTimelineHandlers();
  const {render} = useTimelineRenderer();

  watch(canvas, mountContext);
  watch([context, config, position], render);
  watch(containerWidth, () => refresh(containerWidth.value));
}
