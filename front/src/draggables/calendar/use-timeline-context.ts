import {useElementSize} from '@vueuse/core';
import {type TimelineElement} from 'src/draggables/calendar/use-timeline-elements';
import {ref} from 'vue';

const container = ref<HTMLDivElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
const context = ref<CanvasRenderingContext2D | null>(null);
const hovered = ref<TimelineElement | null>(null);

export function useTimelineContext() {
  const {width: containerWidth} = useElementSize(container);

  const mountContext = () => {
    if (canvas.value === null) {
      return;
    }

    context.value = canvas.value.getContext('2d');
  };

  return {
    container: container,
    canvas: canvas,
    containerWidth: containerWidth,
    context: context,
    mountContext: mountContext,
    hovered: hovered,
  };
}
