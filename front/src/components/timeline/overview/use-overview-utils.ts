import {useTimelineDom} from 'src/components/timeline/use-timeline-dom';
import {useTimelineRange} from 'src/components/timeline/use-timeline-range';
import {mapRange} from 'src/utils/math';

export function useOverviewUtils() {
  const {width: canvasWidth} = useTimelineDom().overview;
  const {start: rangeStart, end: rangeEnd} = useTimelineRange();

  const canvasToRangeX = (x: number) => {
    return mapRange(x, 0, canvasWidth.value, rangeStart.value, rangeEnd.value);
  };

  const rangeToCanvasX = (x: number) => {
    return mapRange(x, rangeStart.value, rangeEnd.value, 0, canvasWidth.value);
  };

  return {
    rangeToCanvasX: rangeToCanvasX,
    canvasToRangeX: canvasToRangeX,
  };
}
