import {useReductions} from 'src/composables/use-reductions';
import {ref} from 'vue';

interface Boundaries {
  x: [number, number];
  y: [number, number];
  z: [number, number];
}

const boundaries = ref<Boundaries>({
  x: [-Infinity, Infinity],
  y: [-Infinity, Infinity],
  z: [-Infinity, Infinity],
});

const precision = 1;
const offset = 1;

export function useSelectionBoundaries() {
  const {reductions} = useReductions();

  const detectBoundaries = () => {
    if (reductions.value === null) {
      return;
    }

    const xs = reductions.value.map((r) => r[0]);
    const ys = reductions.value.map((r) => r[1]);
    const zs = reductions.value.map((r) => r[2]);

    const xMin = Number(Math.min(...xs).toFixed(precision)) - offset;
    const xMax = Number(Math.max(...xs).toFixed(precision)) + offset;

    const yMin = Number(Math.min(...ys).toFixed(precision)) - offset;
    const yMax = Number(Math.max(...ys).toFixed(precision)) + offset;

    const zMin = Number(Math.min(...zs).toFixed(precision)) - offset;
    const zMax = Number(Math.max(...zs).toFixed(precision)) + offset;

    boundaries.value = {
      x: [xMin, xMax],
      y: [yMin, yMax],
      z: [zMin, zMax],
    };
  };

  return {
    boundaries,
    detectBoundaries,
    offset,
  };
}
