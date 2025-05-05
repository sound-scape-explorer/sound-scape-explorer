import {useTimelineDom} from 'src/components/timeline/use-timeline-dom';
import {useTimelineRange} from 'src/components/timeline/use-timeline-range';
import {mapRange} from 'src/utils/math';

export function useBodyUtils() {
  const {width} = useTimelineDom().body;
  const {left, right} = useTimelineRange();

  const rangeToCanvasX = (x: number) => {
    return mapRange(x, left.value, right.value, 0, width.value);
  };

  return {
    rangeToCanvasX,
  };
}
