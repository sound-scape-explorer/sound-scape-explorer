import {useBodyConfig} from 'src/components/timeline/body/use-body-config';
import {useBodyElements} from 'src/components/timeline/body/use-body-elements';
import {useBodyHover} from 'src/components/timeline/body/use-body-hover';
import {useBodyUtils} from 'src/components/timeline/body/use-body-utils';
import {useTimelineContext} from 'src/components/timeline/use-timeline-context';
import {useTimelineDom} from 'src/components/timeline/use-timeline-dom';
import {useTimelineTheme} from 'src/components/timeline/use-timeline-theme';

export function useBodyDrawElements() {
  const {width} = useTimelineDom().body;
  const {context} = useTimelineContext().body;
  const {hovered} = useBodyHover();
  const {config, time, elementGaps} = useBodyConfig();
  const {timeToCanvasX} = useBodyUtils();
  const {elements} = useBodyElements();
  const {highlight} = useTimelineTheme();

  const drawElements = () => {
    if (!context.value) {
      return;
    }

    const ctx = context.value;

    for (const element of elements.value) {
      const y =
        config.value.startY +
        element.row * config.value.rowHeight +
        elementGaps.top;

      const x = timeToCanvasX(
        element.start,
        time.value.minTime,
        time.value.maxTime,
        config.value.startX,
        config.value.startX + width.value,
      );

      const endX = timeToCanvasX(
        element.end,
        time.value.minTime,
        time.value.maxTime,
        config.value.startX,
        config.value.startX + width.value,
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

      ctx.fillRect(x, y, w, config.value.rowHeight - elementGaps.bottom);

      // reset shadows
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
    }
  };

  return {
    drawElements: drawElements,
  };
}
