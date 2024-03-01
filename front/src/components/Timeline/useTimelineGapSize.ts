import {reactive} from 'vue';

import {convertToNaiveSelectOptions} from '../../utils/convert-to-naive-select-options';

type GapSize = 'small' | 'medium' | 'large';
const gapSizes: GapSize[] = ['small', 'medium', 'large'];

interface GapSizeOption {
  label: string;
  value: string;
}

interface GapSizeOptions {
  value: GapSizeOption[];
}

export const gapSizesRef = reactive<GapSizeOptions>({
  value: convertToNaiveSelectOptions(gapSizes),
});

interface GapSizeRef {
  value: GapSize;
}

export const selectedGapSizeRef = reactive<GapSizeRef>({
  value: 'large',
});
