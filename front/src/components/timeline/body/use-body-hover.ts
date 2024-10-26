import {type TimelineElement} from 'src/components/timeline/use-timeline-elements';
import {ref} from 'vue';

const hovered = ref<TimelineElement | null>(null);

export function useBodyHover() {
  return {
    hovered: hovered,
  };
}
