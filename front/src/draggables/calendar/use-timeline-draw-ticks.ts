import {useTimelineColors} from 'src/draggables/calendar/use-timeline-colors';
import {useTimelineConfig} from 'src/draggables/calendar/use-timeline-config';
import {useTimelineContext} from 'src/draggables/calendar/use-timeline-context';
import {useTimelineUtils} from 'src/draggables/calendar/use-timeline-utils';

export function useTimelineDrawTicks() {
  const {context} = useTimelineContext();
  const {config, time} = useTimelineConfig();
  const {timeToCanvasX} = useTimelineUtils();
  const {stroke, fill} = useTimelineColors();

  const drawTicks = () => {
    if (!context.value) {
      return;
    }

    const ctx = context.value;
    ctx.strokeStyle = stroke;

    const tickInterval =
      (time.value.maxTime - time.value.minTime) / time.value.divisions;

    let s = 0; // section index

    for (
      let t = time.value.minTime;
      t <= time.value.maxTime;
      t += tickInterval
    ) {
      const x = timeToCanvasX(
        t,
        time.value.minTime,
        time.value.maxTime,
        config.value.startX,
        config.value.startX + config.value.width,
      );

      const isMajorTick = s % time.value.every === 0;
      const tickHeight = isMajorTick ? 10 : 5;

      ctx.beginPath();
      ctx.moveTo(x, config.value.startY);
      ctx.lineTo(x, config.value.startY + tickHeight);
      ctx.stroke();

      if (isMajorTick) {
        ctx.fillStyle = fill;
        ctx.textAlign = 'center';

        const px = config.value.rowHeight * 0.45;
        ctx.font = `${px}px Helvetica`;
        ctx.fillText(
          t.toString(),
          x,
          config.value.startY + config.value.rowHeight * 0.8 + 1,
        );
      }

      s += 1;
    }
  };

  return {
    drawTicks: drawTicks,
  };
}
