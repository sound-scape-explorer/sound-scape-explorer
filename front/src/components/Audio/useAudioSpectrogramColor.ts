import {reactive} from 'vue';

import {SPECTROGRAM_COLOR_MAPS} from '../../constants';

interface SpectrogramColorRef {
  value: string;
}

export const spectrogramColorRef = reactive<SpectrogramColorRef>({
  value: SPECTROGRAM_COLOR_MAPS[0],
});
