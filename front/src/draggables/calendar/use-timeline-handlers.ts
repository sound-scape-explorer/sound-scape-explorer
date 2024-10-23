import {useIntervalSelector} from 'src/draggables/audio/use-interval-selector';
import {useTimelineContext} from 'src/draggables/calendar/use-timeline-context';
import {useTimelineElements} from 'src/draggables/calendar/use-timeline-elements';
import {useTimelineUtils} from 'src/draggables/calendar/use-timeline-utils';
import {ref} from 'vue';

interface Position {
  x: number;
  y: number;
}

const isHovering = ref<boolean>(false);
const position = ref<Position>({x: 0, y: 0});

export function useTimelineHandlers() {
  const {hovered} = useTimelineContext();
  const {elements} = useTimelineElements();
  const {isPointInElement, getMouseCoordinates} = useTimelineUtils();
  const {selectInterval} = useIntervalSelector();

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
