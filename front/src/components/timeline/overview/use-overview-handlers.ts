import {useScatterCamera} from 'src/components/scatter/use-scatter-camera';
import {type MousePosition} from 'src/components/timeline/body/use-body-handlers';
import {useOverviewUtils} from 'src/components/timeline/overview/use-overview-utils';
import {useTimelineHandlers} from 'src/components/timeline/overview/use-timeline-handlers';
import {useTimelineDom} from 'src/components/timeline/use-timeline-dom';
import {useTimelineRange} from 'src/components/timeline/use-timeline-range';
import {getMouseCoordinatesFromCanvas} from 'src/utils/browser';
import {ref} from 'vue';

const position = ref<MousePosition>({x: 0, y: 0});

export function useOverviewHandlers() {
  const {canvas, width} = useTimelineDom().overview;
  const {isDragging, drag, hover, isHovering, dragStartX, detect} =
    useTimelineHandlers().overview;
  const {start, end, left, right, moveCursor, moveLeft, moveRight} =
    useTimelineRange();
  const {lock, unlock} = useScatterCamera();
  const {canvasToRangeX} = useOverviewUtils();

  const handleMouseMove = (e: MouseEvent) => {
    const {x, y} = getMouseCoordinatesFromCanvas(e);
    position.value = {x: x, y: y};

    if (!canvas.value) {
      return;
    }

    const rect = canvas.value.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const isDraggingWithTarget = isDragging.value && drag.value;

    if (!isDraggingWithTarget) {
      hover.value = detect(relativeX);
      isHovering.value = hover.value !== null;
      return;
    }

    const range = end.value - start.value;
    const deltaX = relativeX - dragStartX.value;
    const deltaPercent = (deltaX / width.value) * range;

    switch (drag.value) {
      case 'left': {
        moveLeft(deltaPercent);
        break;
      }
      case 'right': {
        moveRight(deltaPercent);
        break;
      }
      case 'move': {
        moveCursor(deltaPercent);
        break;
      }
    }

    dragStartX.value = relativeX;
  };

  const handleMouseUp = () => {
    isDragging.value = false;
    drag.value = null;
    unlock();
  };

  const handleMouseLeave = () => {
    isHovering.value = false;
    hover.value = null;
    isDragging.value = false;
    drag.value = null;
    // todo: fix me
    unlock();
  };

  const handleMouseDown = (e: MouseEvent) => {
    if (!canvas.value) {
      return;
    }

    const rect = canvas.value.getBoundingClientRect();
    const x = e.clientX - rect.left;

    drag.value = detect(x);

    if (!drag.value) {
      const duration = right.value - left.value;
      left.value = canvasToRangeX(x);
      right.value = left.value + duration;
      return;
    }

    startDragging(x);
    lock();
  };

  const startDragging = (x: number) => {
    isDragging.value = true;
    dragStartX.value = x;
  };

  return {
    position: position,
    handleMouseUp: handleMouseUp,
    handleMouseLeave: handleMouseLeave,
    handleMouseMove: handleMouseMove,
    handleMouseDown: handleMouseDown,
  };
}
