import {useOverviewConstants} from 'src/components/timeline/overview/use-overview-constants';
import {useOverviewElements} from 'src/components/timeline/overview/use-overview-elements';
import {useOverviewMouse} from 'src/components/timeline/overview/use-overview-mouse';
import {useCalendarRange} from 'src/components/timeline/use-calendar-range';
import {useTimelineContext} from 'src/components/timeline/use-timeline-context';
import {useTimelineDom} from 'src/components/timeline/use-timeline-dom';
import {mapRange} from 'src/utils/map-range';

export function useOverviewDrawer() {
  const {canvas, width, height} = useTimelineDom().overview;
  const {context} = useTimelineContext().overview;
  const {left, right, start, end} = useCalendarRange();
  const {hover, drag, isHovering} = useOverviewMouse().overview;
  const {handleWidth} = useOverviewConstants();
  const {elements} = useOverviewElements();

  const drawOverviewBackground = () => {
    if (context.value === null) {
      return;
    }

    const ctx = context.value;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width.value, height.value);

    ctx.fillStyle = 'red';
    const g = 1;

    // interests
    for (const element of elements.value) {
      const windowStart = mapRange(
        element.start,
        start.value,
        end.value,
        0,
        width.value,
      );

      const windowEnd = mapRange(
        element.end,
        start.value,
        end.value,
        0,
        width.value,
      );

      ctx.fillRect(
        windowStart - g,
        0,
        windowEnd - windowStart - g,
        height.value,
      );
    }
  };

  const drawOverviewWindow = () => {
    if (context.value === null) {
      return;
    }

    const ctx = context.value;

    const windowStart = mapRange(
      left.value,
      start.value,
      end.value,
      0,
      width.value,
    );

    const windowEnd = mapRange(
      right.value,
      start.value,
      end.value,
      0,
      width.value,
    );

    const windowWidth = windowEnd - windowStart;

    // Draw window rectangle with different colors based on hover state
    ctx.fillStyle = isHovering.value
      ? 'rgba(0, 0, 0, 0.3)'
      : 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(windowStart, 0, windowWidth, height.value);

    // Draw window borders
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.strokeRect(windowStart, 0, windowWidth, height.value);

    const handleHeight = height.value;

    // Draw handles with hover effect
    const leftHandleColor = hover.value === 'left' ? '#555' : 'black';
    const rightHandleColor = hover.value === 'right' ? '#555' : 'black';

    // Left handle
    ctx.fillStyle = leftHandleColor;
    ctx.fillRect(windowStart - handleWidth / 2, 0, handleWidth, handleHeight);

    // Right handle
    ctx.fillStyle = rightHandleColor;
    ctx.fillRect(
      windowStart + windowWidth - handleWidth / 2,
      0,
      handleWidth,
      handleHeight,
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
        canvas.value.style.cursor = 'default';
    }
  };

  return {
    overview: {
      background: drawOverviewBackground,
      window: drawOverviewWindow,
    },
  };
}
