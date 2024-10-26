import {useBodyConfig} from 'src/components/timeline/body/use-body-config';
import {useBodyElements} from 'src/components/timeline/body/use-body-elements';
import {useBodyHover} from 'src/components/timeline/body/use-body-hover';
import {useBodyUtils} from 'src/components/timeline/body/use-body-utils';
import {type TimelineElement} from 'src/components/timeline/use-timeline-elements';
import {useIntervalSelector} from 'src/draggables/audio/use-interval-selector';
import {ref} from 'vue';

interface Position {
  x: number;
  y: number;
}

const isHovering = ref<boolean>(false);
const position = ref<Position>({x: 0, y: 0});

export function useBodyHandlers() {
  const {hovered} = useBodyHover();
  const {elements} = useBodyElements();
  const {getMouseCoordinates, rangeToCanvasX} = useBodyUtils();
  const {selectInterval} = useIntervalSelector();
  const {rowHeight, elementGaps} = useBodyConfig();

  const isPointInElement = (x: number, y: number, element: TimelineElement) => {
    const xStart = rangeToCanvasX(element.start);
    const xEnd = rangeToCanvasX(element.end);
    const yStart = element.row * rowHeight + elementGaps.top;
    const height = rowHeight - elementGaps.bottom;

    return x >= xStart && x <= xEnd && y >= yStart && y <= yStart + height;
  };

  const handleMouseMove = (e: MouseEvent) => {
    const {x, y} = getMouseCoordinates(e);
    position.value = {
      x: x,
      y: y,
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
    handleMouseMove: handleMouseMove,
    handleMouseLeave: handleMouseLeave,
    isHovering: isHovering,
    handleClick: handleClick,
    position: position,
  };
}
