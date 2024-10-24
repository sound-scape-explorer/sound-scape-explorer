import {useBodyElements} from 'src/components/timeline/body/use-body-elements';
import {useBodyHover} from 'src/components/timeline/body/use-body-hover';
import {useBodyUtils} from 'src/components/timeline/body/use-body-utils';
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
  const {isPointInElement, getMouseCoordinates} = useBodyUtils();
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
