import {getMouseCoordinatesFromCanvas} from '@shared/browser';
import {useBodyConfig} from 'src/components/timeline/body/use-body-config';
import {useBodyElements} from 'src/components/timeline/body/use-body-elements';
import {useBodyHover} from 'src/components/timeline/body/use-body-hover';
import {useBodyUtils} from 'src/components/timeline/body/use-body-utils';
import {type TimelineElement} from 'src/components/timeline/use-timeline-elements';
import {useInterval} from 'src/composables/use-interval';
import {ref} from 'vue';

export interface MousePosition {
  x: number;
  y: number;
}

const isHovering = ref<boolean>(false);
const position = ref<MousePosition>({x: 0, y: 0});

export function useBodyHandlers() {
  const {hovered} = useBodyHover();
  const {elements} = useBodyElements();
  const {rangeToCanvasX} = useBodyUtils();
  const {selectInterval} = useInterval();
  const {rowHeight, elementGaps} = useBodyConfig();

  const isPointInElement = (x: number, y: number, element: TimelineElement) => {
    const xStart = rangeToCanvasX(element.start);
    const xEnd = rangeToCanvasX(element.end);
    const yStart = element.row * rowHeight + elementGaps.top;
    const height = rowHeight - elementGaps.bottom;

    return x >= xStart && x <= xEnd && y >= yStart && y <= yStart + height;
  };

  const handleMouseMove = (e: MouseEvent) => {
    const {x, y} = getMouseCoordinatesFromCanvas(e);
    position.value = {
      x,
      y,
    };

    const result = elements.value.find((element) =>
      isPointInElement(x, y, element),
    );

    if (!result) {
      hovered.value = null;
      isHovering.value = false;
      return;
    }

    hovered.value = result;
    isHovering.value = true;
  };

  const handleMouseLeave = () => {
    hovered.value = null;
    isHovering.value = false;
  };

  const handleClick = () => {
    if (hovered.value === null) {
      return;
    }

    selectInterval(hovered.value.index);
  };

  return {
    handleMouseMove,
    handleMouseLeave,
    isHovering,
    handleClick,
    position,
  };
}
