import {useOverviewConstants} from 'src/components/timeline/overview/use-overview-constants';
import {useTimelineDom} from 'src/components/timeline/use-timeline-dom';
import {useTimelineRange} from 'src/components/timeline/use-timeline-range';
import {ref} from 'vue';

export type OverviewTarget = 'left' | 'right' | 'move' | null;

const isOverviewHovering = ref<boolean>(false);
const isOverviewDragging = ref<boolean>(false);
const isBodyHovering = ref<boolean>(false);

const overviewHoverTarget = ref<OverviewTarget>(null);
const overviewDragTarget = ref<OverviewTarget>(null);
const overviewDragStartX = ref<number>(0);

export function useOverviewMouse() {
  const {range, start, end} = useTimelineRange();
  const {width} = useTimelineDom().overview;
  const {handleWidth} = useOverviewConstants();

  const getWindowWidth = () => {
    return ((end.value - start.value) / range.value) * width.value;
  };

  const getWindowX = () => {
    return (start.value / range.value) * width.value;
  };

  const detectOverview = (x: number): OverviewTarget => {
    const wWidth = getWindowWidth();
    const wX = getWindowX();

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
