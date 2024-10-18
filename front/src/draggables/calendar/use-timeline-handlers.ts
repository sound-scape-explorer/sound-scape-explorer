import {useTimelineContext} from 'src/draggables/calendar/use-timeline-context';
import {useTimelineElements} from 'src/draggables/calendar/use-timeline-elements';
import {useTimelineUtils} from 'src/draggables/calendar/use-timeline-utils';
import {ref} from 'vue';

const isHovering = ref<boolean>(false);

export function useTimelineHandlers() {
  const {hovered} = useTimelineContext();
  const {elements} = useTimelineElements();
  const {isPointInElement} = useTimelineUtils();

  const handleMouseMove = (e: MouseEvent) => {
    const target = e.target as HTMLCanvasElement;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const result = elements.find((element) => isPointInElement(x, y, element));

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
    if (hovered.value) {
      console.log(hovered.value);
    }
  };

  return {
    handleMouseMove: handleMouseMove,
    handleMouseLeave: handleMouseLeave,
    isHovering: isHovering,
    handleClick: handleClick,
  };
}
