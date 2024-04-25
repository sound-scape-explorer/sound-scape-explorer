import {SPECTROGRAM_COLOR_MAPS} from 'src/constants';
import {reactive} from 'vue';

interface SpectrogramColorRef {
  value: string;
}

export const spectrogramColorRef = reactive<SpectrogramColorRef>({
  value: SPECTROGRAM_COLOR_MAPS[0],
});
