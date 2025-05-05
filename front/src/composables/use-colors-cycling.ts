import chroma, {type Scale} from 'chroma-js';
import {computed} from 'vue';

const scale = computed<Scale>(() =>
  chroma
    .scale(['blue', 'cyan', 'green', 'yellow', 'orange', 'red', 'blue'])
    .mode('hsl'),
);

export function useColorsCycling() {
  return {
    scale,
  };
}
