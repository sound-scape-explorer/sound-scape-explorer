import {useBodyConfig} from 'src/components/timeline/body/use-body-config';
import {useBodyElements} from 'src/components/timeline/body/use-body-elements';
import {useBodyHover} from 'src/components/timeline/body/use-body-hover';
import {useBodyUtils} from 'src/components/timeline/body/use-body-utils';
import {useTimelineContext} from 'src/components/timeline/use-timeline-context';
import {useTimelineTheme} from 'src/components/timeline/use-timeline-theme';

export function useBodyDrawElements() {
  const {context} = useTimelineContext().body;
  const {hovered} = useBodyHover();
  const {rowHeight, elementGaps} = useBodyConfig();
  const {rangeToCanvasX} = useBodyUtils();
  const {elements} = useBodyElements();
  const {highlight} = useTimelineTheme();

  const drawElements = () => {
    if (!context.value) {
      return;
    }

    const ctx = context.value;

    for (const element of elements.value) {
      const y = element.row * rowHeight + elementGaps.top;

      const xStart = rangeToCanvasX(element.start);
      const xEnd = rangeToCanvasX(element.end);

      const xWidth = xEnd - xStart;

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

      ctx.fillRect(xStart, y, xWidth, rowHeight - elementGaps.bottom);

      // reset shadows
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
    }
  };

  return {
    drawElements: drawElements,
  };
}
