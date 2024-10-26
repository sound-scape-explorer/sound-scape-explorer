import {useOverviewConstants} from 'src/components/timeline/overview/use-overview-constants';
import {useCalendarRange} from 'src/components/timeline/use-calendar-range';
import {useTimelineDom} from 'src/components/timeline/use-timeline-dom';
import {mapRange} from 'src/utils/math';
import {ref} from 'vue';

export type OverviewTarget = 'left' | 'right' | 'move' | null;

const isOverviewHovering = ref<boolean>(false);
const isOverviewDragging = ref<boolean>(false);
const isBodyHovering = ref<boolean>(false);

const overviewHoverTarget = ref<OverviewTarget>(null);
const overviewDragTarget = ref<OverviewTarget>(null);
const overviewDragStartX = ref<number>(0);

export function useOverviewMouse() {
  const {left, right, start, end} = useCalendarRange();
  const {width} = useTimelineDom().overview;
  const {handleWidth} = useOverviewConstants();

  const getWindowWidth = () => {
    const windowEnd = mapRange(
      right.value,
      start.value,
      end.value,
      0,
      width.value,
    );

    return windowEnd - getWindowStart();
  };

  const getWindowStart = () => {
    return mapRange(left.value, start.value, end.value, 0, width.value);
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
