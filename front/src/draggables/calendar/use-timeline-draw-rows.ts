import {useTimelineConfig} from 'src/draggables/calendar/use-timeline-config';
import {useTimelineContext} from 'src/draggables/calendar/use-timeline-context';
import {useTimelineTheme} from 'src/draggables/calendar/use-timeline-theme';

export function useTimelineDrawRows() {
  const {context} = useTimelineContext();
  const {config} = useTimelineConfig();
  const {strokeLight} = useTimelineTheme();

  const drawRows = () => {
    if (!context.value) {
      return;
    }

    const ctx = context.value;

    ctx.strokeStyle = strokeLight;
    ctx.lineWidth = 1;
    for (let i = 0; i <= config.value.rows; i += 1) {
      const y = config.value.startY + i * config.value.rowHeight;
      ctx.beginPath();
      ctx.moveTo(config.value.startX, y);
      ctx.lineTo(config.value.startX + config.value.width, y);
      ctx.stroke();
    }
  };

  return {
    drawRows: drawRows,
  };
}
