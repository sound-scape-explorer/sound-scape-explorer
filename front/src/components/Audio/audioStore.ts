import {reactive} from 'vue';
import {SPECTROGRAM_COLOR_MAPS} from '../../constants';

interface AudioStore {
  index: number | null;
  timestamp: number | null;
  file: string | null;
  colorMap: string;
}

export const audioStore = reactive<AudioStore>({
  index: null,
  timestamp: null,
  file: null,
  colorMap: SPECTROGRAM_COLOR_MAPS[0],
});
