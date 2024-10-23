import {useTimelineConfig} from 'src/draggables/calendar/use-timeline-config';
import {useTimelineContext} from 'src/draggables/calendar/use-timeline-context';
import {useTimelineTheme} from 'src/draggables/calendar/use-timeline-theme';

export function useTimelineDrawBackground() {
  const {context} = useTimelineContext();
  const {config, height} = useTimelineConfig();
  const {background} = useTimelineTheme();

  const drawBackground = () => {
    if (!context.value) {
      return;
    }

    const ctx = context.value;
    ctx.fillStyle = background;
    ctx.fillRect(
      config.value.startX,
      config.value.startY,
      config.value.width,
      height.value,
    );
  };

  return {
    drawBackground: drawBackground,
  };
}
