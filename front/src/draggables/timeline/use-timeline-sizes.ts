import {convertToNaiveSelectOptions} from 'src/utils/convert-to-naive-select-options';
import {ref} from 'vue';

type Size = 'small' | 'medium' | 'large';

const sizes: Size[] = ['small', 'medium', 'large'];
const size = ref<Size>('large');
const options = convertToNaiveSelectOptions(sizes);

export function useTimelineSizes() {
  return {
    size: size,
    options: options,
  };
}
