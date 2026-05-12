import {useBodyColors} from 'src/components/timeline/body/use-body-colors';
import {useBodyConfig} from 'src/components/timeline/body/use-body-config';
import {useBodyElements} from 'src/components/timeline/body/use-body-elements';
import {useBodyHover} from 'src/components/timeline/body/use-body-hover';
import {useBodyUtils} from 'src/components/timeline/body/use-body-utils';
import {useTimelineContext} from 'src/components/timeline/use-timeline-context';
import {useTimelineDom} from 'src/components/timeline/use-timeline-dom';
import {type TimelineElement} from 'src/components/timeline/use-timeline-elements';
import {useTimelineRange} from 'src/components/timeline/use-timeline-range';
import {useIntervalTransport} from 'src/composables/use-interval-transport';

export function useBodyDrawElements() {
  const {context} = useTimelineContext().body;
  const {width: canvasWidth} = useTimelineDom().body;
  const {hovered} = useBodyHover();
  const {rowHeight, elementGaps} = useBodyConfig();
  const {rangeToCanvasX} = useBodyUtils();
  const {elements} = useBodyElements();
  const {highlightMap, activeMap} = useBodyColors();
  const {currentIndex} = useIntervalTransport();
  const {left, right} = useTimelineRange();

  const drawElements = () => {
    if (!context.value) {
      return;
    }

    const ctx = context.value;
    const hoveredVal = hovered.value;
    const currentIdx = currentIndex.value;
    const h = rowHeight - elementGaps.bottom;
    const gapTop = elementGaps.top;
    const hMap = highlightMap.value;
    const aMap = activeMap.value;
    const l = left.value;
    const r = right.value;
    const w = canvasWidth.value;

    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    let selectedEl: TimelineElement | null = null;
    let hoveredEl: TimelineElement | null = null;

    for (const element of elements.value) {
      // viewport cull — skip elements entirely outside visible range
      if (element.end < l || element.start > r) {
        continue;
      }

      if (currentIdx === element.index) {
        selectedEl = element;
        continue;
      }

      if (
        hoveredVal !== null &&
        hoveredVal.row === element.row &&
        hoveredVal.color === element.color &&
        hoveredVal.start === element.start &&
        hoveredVal.end === element.end
      ) {
        hoveredEl = element;
        continue;
      }

      const xStart = rangeToCanvasX(element.start);
      const xEnd = rangeToCanvasX(element.end);

      // clamp to canvas bounds
      const x0 = xStart < 0 ? 0 : xStart;
      const x1 = xEnd > w ? w : xEnd;

      if (x1 <= x0) {
        continue;
      }

      const y = element.row * rowHeight + gapTop;
      ctx.fillStyle = element.color;
      ctx.fillRect(x0, y, x1 - x0, h);
    }

    if (hoveredEl || selectedEl) {
      ctx.shadowColor = 'rgba(0, 0, 0, 0.33)';
      ctx.shadowBlur = 3;
      ctx.shadowOffsetX = -1;
      ctx.shadowOffsetY = 1;

      if (hoveredEl) {
        const y = hoveredEl.row * rowHeight + gapTop;
        const xStart = rangeToCanvasX(hoveredEl.start);
        const xEnd = rangeToCanvasX(hoveredEl.end);
        ctx.fillStyle = hMap.get(hoveredEl.color) ?? hoveredEl.color;
        ctx.fillRect(xStart, y, xEnd - xStart, h);
      }

      if (selectedEl) {
        const y = selectedEl.row * rowHeight + gapTop;
        const xStart = rangeToCanvasX(selectedEl.start);
        const xEnd = rangeToCanvasX(selectedEl.end);
        ctx.fillStyle = aMap.get(selectedEl.color) ?? selectedEl.color;
        ctx.fillRect(xStart, y, xEnd - xStart, h);
      }

      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    }
  };

  return {
    drawElements,
  };
}
