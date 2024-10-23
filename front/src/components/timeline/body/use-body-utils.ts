import {useBodyConfig} from 'src/components/timeline/body/use-body-config';
import {type TimelineElement} from 'src/components/timeline/body/use-body-elements';
import {useTimelineDom} from 'src/components/timeline/use-timeline-dom';

export function useBodyUtils() {
  const {width} = useTimelineDom().body;
  const {config, time, elementGaps} = useBodyConfig();

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
      config.value.startX + width.value,
    );
    const elementEndX = timeToCanvasX(
      element.end,
      time.value.minTime,
      time.value.maxTime,
      config.value.startX,
      config.value.startX + width.value,
    );
    const elementY =
      config.value.startY +
      element.row * config.value.rowHeight +
      elementGaps.top;
    const elementHeight = config.value.rowHeight - elementGaps.bottom;

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
