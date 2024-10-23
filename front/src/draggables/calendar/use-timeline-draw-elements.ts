import {useTimelineColors} from 'src/draggables/calendar/use-timeline-colors';
import {useTimelineConfig} from 'src/draggables/calendar/use-timeline-config';
import {useTimelineContext} from 'src/draggables/calendar/use-timeline-context';
import {useTimelineElements} from 'src/draggables/calendar/use-timeline-elements';
import {useTimelineUtils} from 'src/draggables/calendar/use-timeline-utils';

export function useTimelineDrawElements() {
  const {context, hovered} = useTimelineContext();
  const {config, time} = useTimelineConfig();
  const {timeToCanvasX} = useTimelineUtils();
  const {elements} = useTimelineElements();
  const {highlight} = useTimelineColors();

  const drawElements = () => {
    if (!context.value) {
      return;
    }

    const ctx = context.value;

    for (let i = 0; i < elements.value.length; i += 1) {
      const element = elements.value[i];
      const y = config.value.startY + element.row * config.value.rowHeight + 5;

      const x = timeToCanvasX(
        element.start,
        time.value.minTime,
        time.value.maxTime,
        config.value.startX,
        config.value.startX + config.value.width,
      );

      const endX = timeToCanvasX(
        element.end,
        time.value.minTime,
        time.value.maxTime,
        config.value.startX,
        config.value.startX + config.value.width,
      );

      const w = endX - x;

      const isCurrentHover =
        hovered.value?.row === element.row &&
        hovered.value?.color === element.color &&
        hovered.value?.start === element.start &&
        hovered.value?.end === element.end;

      ctx.fillStyle = element.color;

      if (isCurrentHover) {
        ctx.fillStyle = highlight(element.color);
        ctx.shadowColor = 'rgba(0, 0, 0, 0.33)';
        ctx.shadowBlur = 3;
        ctx.shadowOffsetX = -1;
        ctx.shadowOffsetY = 1;
      } else {
        ctx.fillStyle = element.color;
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
      }

      ctx.fillRect(x, y, w, config.value.rowHeight - 10);

      // reset shadows
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
    }
  };

  return {
    drawElements: drawElements,
  };
}
