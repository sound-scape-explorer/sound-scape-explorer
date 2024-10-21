import {useTimelineConfig} from 'src/draggables/calendar/use-timeline-config';
import {type TimelineElement} from 'src/draggables/calendar/use-timeline-elements';

export function useTimelineUtils() {
  const {config, time} = useTimelineConfig();

  const timeToCanvasX = (
    time: number,
    minTime: number,
    maxTime: number,
    canvasX0: number,
    canvasXMax: number,
  ) => {
    const normalizedTime = (time - minTime) / (maxTime - minTime);
    return canvasX0 + normalizedTime * (canvasXMax - canvasX0);
  };

  const isPointInElement = (x: number, y: number, element: TimelineElement) => {
    const elementX = timeToCanvasX(
      element.start,
      time.value.minTime,
      time.value.maxTime,
      config.value.startX,
      config.value.startX + config.value.width,
    );
    const elementEndX = timeToCanvasX(
      element.end,
      time.value.minTime,
      time.value.maxTime,
      config.value.startX,
      config.value.startX + config.value.width,
    );
    const elementY =
      config.value.startY + element.row * config.value.rowHeight + 5;
    const elementHeight = config.value.rowHeight - 10;

    return (
      x >= elementX &&
      x <= elementEndX &&
      y >= elementY &&
      y <= elementY + elementHeight
    );
  };

  const getMouseCoordinates = (e: MouseEvent) => {
    const target = e.target as HTMLCanvasElement;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    return {
      x: x,
      y: y,
    };
  };

  return {
    timeToCanvasX: timeToCanvasX,
    isPointInElement: isPointInElement,
    getMouseCoordinates: getMouseCoordinates,
  };
}
