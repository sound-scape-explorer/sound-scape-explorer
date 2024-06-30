import type {ColorFlavor} from 'src/constants';
import type {ColorType} from 'src/draggables/colors/use-color-type';
import {ref} from 'vue';

const type = ref<ColorType>('cycleDay');
const flavor = ref<ColorFlavor>('Dark2');

export function useColorSelection() {
  return {
    type: type,
    flavor: flavor,
  };
}
