import {useReductions} from 'src/composables/use-reductions';
import {ref} from 'vue';

const xRange = ref([-1, 1]);
const yRange = ref([-1, 1]);
const zRange = ref([-1, 1]);

const xBounds = ref([-1, 1]);
const yBounds = ref([-1, 1]);
const zBounds = ref([-1, 1]);

const tiltAngleX = ref(0);
const tiltAngleY = ref(0);
const tiltAngleZ = ref(0);

const precision = 1;
const offset = 1;
const stepRange = 0.1;
const stepAngle = 5;

export function useSelectionProps() {
  const {reductions} = useReductions();

  const setBounds = () => {
    if (reductions.value === null) {
      return;
    }

    const xs = reductions.value.map((r) => r[0]);
    const ys = reductions.value.map((r) => r[1]);
    const zs = reductions.value.map((r) => r[2]);

    xBounds.value = [
      Number(Math.min(...xs).toFixed(precision)) - offset,
      Number(Math.max(...xs).toFixed(precision)) + offset,
    ];
    yBounds.value = [
      Number(Math.min(...ys).toFixed(precision)) - offset,
      Number(Math.max(...ys).toFixed(precision)) + offset,
    ];
    zBounds.value = [
      Number(Math.min(...zs).toFixed(precision)) - offset,
      Number(Math.max(...zs).toFixed(precision)) + offset,
    ];

    resetRanges();
  };

  const resetRanges = () => {
    const xCenter = (xBounds.value[1] + xBounds.value[0]) / 2;
    const yCenter = (yBounds.value[1] + yBounds.value[0]) / 2;
    const zCenter = (zBounds.value[1] + zBounds.value[0]) / 2;

    xRange.value = [xCenter - offset, xCenter + offset];
    yRange.value = [yCenter - offset, yCenter + offset];
    zRange.value = [zCenter - offset, zCenter + offset];
  };

  const expandRanges = () => {
    xRange.value = [xBounds.value[0], xBounds.value[1]];
    yRange.value = [yBounds.value[0], yBounds.value[1]];
    zRange.value = [zBounds.value[0], zBounds.value[1]];
  };

  return {
    xRange,
    yRange,
    zRange,
    xBounds,
    yBounds,
    zBounds,
    tiltAngleX,
    tiltAngleY,
    tiltAngleZ,
    stepRange,
    stepAngle,
    setBounds,
    resetRanges,
    expandRanges,
  };
}
