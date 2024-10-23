import {type TimelineElement} from 'src/components/timeline/body/use-body-elements';
import {ref} from 'vue';

const hovered = ref<TimelineElement | null>(null);

export function useBodyHover() {
  return {
    hovered: hovered,
  };
}
