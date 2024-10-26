import {useTimelineDom} from 'src/components/timeline/use-timeline-dom';
import {useTimelineRange} from 'src/components/timeline/use-timeline-range';
import {mapRange} from 'src/utils/math';

export function useBodyUtils() {
  const {width} = useTimelineDom().body;
  const {left, right} = useTimelineRange();

  const rangeToCanvasX = (x: number) => {
    return mapRange(x, left.value, right.value, 0, width.value);
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
    rangeToCanvasX: rangeToCanvasX,
    getMouseCoordinates: getMouseCoordinates,
  };
}
