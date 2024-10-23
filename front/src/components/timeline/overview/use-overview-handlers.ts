import {useOverviewMouse} from 'src/components/timeline/overview/use-overview-mouse';
import {useCalendarRange} from 'src/components/timeline/use-calendar-range';
import {useTimelineDom} from 'src/components/timeline/use-timeline-dom';

export function useOverviewHandlers() {
  const {canvas, width} = useTimelineDom().overview;
  const {isDragging, drag, hover, isHovering, dragStartX, detect} =
    useOverviewMouse().overview;
  const {start, end, moveCursor, moveStart, moveEnd} = useCalendarRange();

  const handleMouseMove = (e: MouseEvent) => {
    if (!canvas.value) {
      return;
    }

    const rect = canvas.value.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isDraggingWithTarget = isDragging.value && drag.value;

    if (!isDraggingWithTarget) {
      hover.value = detect(x);
      isHovering.value = hover.value !== null;
      return;
    }

    const range = end.value - start.value;
    const deltaX = x - dragStartX.value;
    const deltaPercent = (deltaX / width.value) * range;

    switch (drag.value) {
      case 'left': {
        moveStart(deltaPercent);
        break;
      }
      case 'right': {
        moveEnd(deltaPercent);
        break;
      }
      case 'move': {
        moveCursor(deltaPercent);
        break;
      }
    }

    dragStartX.value = x;
  };

  const handleMouseUp = () => {
    isDragging.value = false;
    drag.value = null;
    // update timeline-content from here
  };

  const handleMouseLeave = () => {
    isHovering.value = false;
    hover.value = null;
    isDragging.value = false;
    drag.value = null;
  };

  const handleMouseDown = (e: MouseEvent) => {
    if (!canvas.value) {
      return;
    }

    const rect = canvas.value.getBoundingClientRect();
    const x = e.clientX - rect.left;

    drag.value = detect(x);

    if (!drag.value) {
      return;
    }

    startDragging(x);
  };

  const startDragging = (x: number) => {
    isDragging.value = true;
    dragStartX.value = x;
  };

  return {
    handleMouseUp: handleMouseUp,
    handleMouseLeave: handleMouseLeave,
    handleMouseMove: handleMouseMove,
    handleMouseDown: handleMouseDown,
  };
}
