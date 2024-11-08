import {useOverviewConstants} from 'src/components/timeline/overview/use-overview-constants';
import {useOverviewUtils} from 'src/components/timeline/overview/use-overview-utils';
import {useTimelineRange} from 'src/components/timeline/use-timeline-range';
import {ref} from 'vue';

export type OverviewTarget = 'left' | 'right' | 'move' | null;

const isOverviewHovering = ref<boolean>(false);
const isOverviewDragging = ref<boolean>(false);
const isBodyHovering = ref<boolean>(false);

const overviewHoverTarget = ref<OverviewTarget>(null);
const overviewDragTarget = ref<OverviewTarget>(null);
const overviewDragStartX = ref<number>(0);

export function useTimelineHandlers() {
  const {left, right} = useTimelineRange();
  const {handleWidth} = useOverviewConstants();
  const {rangeToCanvasX} = useOverviewUtils();

  const getWindowWidth = () => {
    const wEnd = rangeToCanvasX(right.value);
    return wEnd - getWindowStart();
  };

  const getWindowStart = () => {
    return rangeToCanvasX(left.value);
  };

  const detectOverview = (x: number): OverviewTarget => {
    const wWidth = getWindowWidth();
    const wX = getWindowStart();

    const isHandleLeft = Math.abs(x - wX) <= handleWidth;
    if (isHandleLeft) {
      return 'left';
    }

    const isHandleRight = Math.abs(x - (wX + wWidth)) <= handleWidth;
    if (isHandleRight) {
      return 'right';
    }

    const isInside = x > wX && x < wX + wWidth;
    if (isInside) {
      return 'move';
    }

    return null;
  };

  return {
    overview: {
      isHovering: isOverviewHovering,
      isDragging: isOverviewDragging,
      drag: overviewDragTarget,
      hover: overviewHoverTarget,
      dragStartX: overviewDragStartX,
      detect: detectOverview,
    },
    body: {
      isHovering: isBodyHovering,
    },
  };
}
