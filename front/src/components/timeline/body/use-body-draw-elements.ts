import {useBodyConfig} from 'src/components/timeline/body/use-body-config';
import {useBodyElements} from 'src/components/timeline/body/use-body-elements';
import {useBodyHover} from 'src/components/timeline/body/use-body-hover';
import {useBodyUtils} from 'src/components/timeline/body/use-body-utils';
import {useTimelineContext} from 'src/components/timeline/use-timeline-context';
import {type TimelineElement} from 'src/components/timeline/use-timeline-elements';
import {useTimelineTheme} from 'src/components/timeline/use-timeline-theme';
import {useIntervalSelector} from 'src/composables/use-interval-selector';

export function useBodyDrawElements() {
  const {context} = useTimelineContext().body;
  const {hovered} = useBodyHover();
  const {rowHeight, elementGaps} = useBodyConfig();
  const {rangeToCanvasX} = useBodyUtils();
  const {elements} = useBodyElements();
  const {highlight, active} = useTimelineTheme();
  const {currentIntervalIndex} = useIntervalSelector();

  const getElementHovered = (element: TimelineElement) => {
    return (
      hovered.value?.row === element.row &&
      hovered.value?.color === element.color &&
      hovered.value?.start === element.start &&
      hovered.value?.end === element.end
    );
  };

  const getElementSelected = (element: TimelineElement) => {
    return currentIntervalIndex.value === element.index;
  };

  const setBlur = (ctx: CanvasRenderingContext2D) => {
    ctx.shadowColor = 'rgba(0, 0, 0, 0.33)';
    ctx.shadowBlur = 3;
    ctx.shadowOffsetX = -1;
    ctx.shadowOffsetY = 1;
  };

  const resetBlur = (ctx: CanvasRenderingContext2D) => {
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
  };

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

      const isElementHovered = getElementHovered(element);
      const isElementSelected = getElementSelected(element);

      ctx.fillStyle = element.color;

      if (isElementSelected) {
        ctx.fillStyle = active(element.color);
        setBlur(ctx);
      } else if (isElementHovered) {
        ctx.fillStyle = highlight(element.color);
        setBlur(ctx);
      } else {
        ctx.fillStyle = element.color;
        resetBlur(ctx);
      }

      ctx.fillRect(xStart, y, xWidth, rowHeight - elementGaps.bottom);
      resetBlur(ctx);
    }
  };

  return {
    drawElements,
  };
}
