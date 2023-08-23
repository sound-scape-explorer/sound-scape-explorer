import type {Color, Scale} from 'chroma-js';
import {reactive} from 'vue';

interface TrajectoriesColorScaleRef {
  value: Scale<Color> | null;
}
const trajectoriesColorScaleRef = reactive<TrajectoriesColorScaleRef>({
  value: null,
});

export function useTrajectoriesColoring() {}
