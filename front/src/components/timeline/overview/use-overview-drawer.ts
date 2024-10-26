import {useOverviewConstants} from 'src/components/timeline/overview/use-overview-constants';
import {useOverviewElements} from 'src/components/timeline/overview/use-overview-elements';
import {useOverviewMouse} from 'src/components/timeline/overview/use-overview-mouse';
import {useOverviewUtils} from 'src/components/timeline/overview/use-overview-utils';
import {useTimelineContext} from 'src/components/timeline/use-timeline-context';
import {useTimelineDom} from 'src/components/timeline/use-timeline-dom';
import {useTimelineRange} from 'src/components/timeline/use-timeline-range';

const gap = 1;

export function useOverviewDrawer() {
  const {canvas, width, height} = useTimelineDom().overview;
  const {context} = useTimelineContext().overview;
  const {left, right} = useTimelineRange();
  const {hover, drag, isHovering} = useOverviewMouse().overview;
  const {handleWidth} = useOverviewConstants();
  const {elements} = useOverviewElements();
  const {rangeToCanvasX} = useOverviewUtils();

  const drawOverviewBackground = () => {
    if (context.value === null) {
      return;
    }

    const ctx = context.value;

    // background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width.value, height.value);

    // interests
    ctx.fillStyle = 'red';
    for (const element of elements.value) {
      const newStart = rangeToCanvasX(element.start) - gap;
      const newEnd = rangeToCanvasX(element.end) - gap;
      const newWidth = newEnd - newStart;

      ctx.fillRect(newStart, 0, newWidth, height.value);
    }
  };

  const drawOverviewWindow = () => {
    if (context.value === null) {
      return;
    }

    const ctx = context.value;

    const wStart = rangeToCanvasX(left.value);
    const wEnd = rangeToCanvasX(right.value);
    const wWidth = wEnd - wStart;

    // Draw window rectangle with different colors based on hover state
    ctx.fillStyle = isHovering.value
      ? 'rgba(0, 0, 0, 0.3)'
      : 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(wStart, 0, wWidth, height.value);

    // Draw window borders
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.strokeRect(wStart, 0, wWidth, height.value);

    // Draw handles with hover effect
    const leftHandleColor = hover.value === 'left' ? '#555' : 'black';
    const rightHandleColor = hover.value === 'right' ? '#555' : 'black';

    // Left handle
    ctx.fillStyle = leftHandleColor;
    ctx.fillRect(wStart - handleWidth / 2, 0, handleWidth, height.value);

    // Right handle
    ctx.fillStyle = rightHandleColor;
    ctx.fillRect(
      wStart + wWidth - handleWidth / 2,
      0,
      handleWidth,
      height.value,
    );

    updateOverviewCursor();
  };

  const updateOverviewCursor = () => {
    if (canvas.value === null) {
      return;
    }

    if (drag.value === 'move') {
      canvas.value.style.cursor = 'grabbing';
      return;
    }

    switch (hover.value) {
      case 'left':
      case 'right':
        canvas.value.style.cursor = 'ew-resize';
        break;
      case 'move':
        canvas.value.style.cursor = 'grab';
        break;
      default:
        canvas.value.style.cursor = 'pointer';
    }
  };

  return {
    overview: {
      background: drawOverviewBackground,
      window: drawOverviewWindow,
    },
  };
}
