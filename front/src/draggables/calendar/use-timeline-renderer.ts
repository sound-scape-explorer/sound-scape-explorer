import {useTimelineConfig} from 'src/draggables/calendar/use-timeline-config';
import {useTimelineContext} from 'src/draggables/calendar/use-timeline-context';
import {useTimelineDrawBackground} from 'src/draggables/calendar/use-timeline-draw-background';
import {useTimelineDrawElements} from 'src/draggables/calendar/use-timeline-draw-elements';
import {useTimelineDrawRows} from 'src/draggables/calendar/use-timeline-draw-rows';
import {useTimelineDrawTicks} from 'src/draggables/calendar/use-timeline-draw-ticks';
import {useTimelineDrawTooltip} from 'src/draggables/calendar/use-timeline-draw-tooltip';

export function useTimelineRenderer() {
  const {context} = useTimelineContext();
  const {config} = useTimelineConfig();
  const {drawBackground} = useTimelineDrawBackground();
  const {drawTicks} = useTimelineDrawTicks();
  const {drawRows} = useTimelineDrawRows();
  const {drawElements} = useTimelineDrawElements();
  const {drawTooltip} = useTimelineDrawTooltip();

  const render = () => {
    if (!context.value || config.value.width === 0) {
      return;
    }

    drawBackground();
    drawRows();
    // drawTicks();
    drawElements();
    drawTooltip();
  };

  return {
    render: render,
  };
}
