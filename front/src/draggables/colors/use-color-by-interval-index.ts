import {useColorUser} from 'src/composables/use-color-user';
import {mapRange} from 'src/utils/map-range';

export function useColorByIntervalIndex() {
  const {scale} = useColorUser();

  const getColor = (index: number, count: number): string => {
    const rangedIndex = mapRange(index, 0, count, 0, 1);
    return scale.value(rangedIndex).css();
  };

  return {
    getColor: getColor,
  };
}
