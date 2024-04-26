import {FFT_SIZE} from 'src/constants';
import {ref} from 'vue';

const containerRef = ref<HTMLDivElement | null>(null);
const waveformContainerRef = ref<HTMLDivElement | null>(null);
const spectrogramContainerRef = ref<HTMLDivElement | null>(null);
const fftSize = ref<number>(FFT_SIZE.default);

export function useAudioComponent() {
  const increaseFftSize = () => {
    if (fftSize.value * 2 > FFT_SIZE.max) {
      return;
    }

    fftSize.value *= 2;
  };

  const decreaseFftSize = () => {
    if (fftSize.value / 2 < FFT_SIZE.min) {
      return;
    }

    fftSize.value /= 2;
  };

  return {
    containerRef: containerRef,
    waveformContainerRef: waveformContainerRef,
    spectrogramContainerRef: spectrogramContainerRef,
    fftSize: fftSize,
    increaseFftSize: increaseFftSize,
    decreaseFftSize: decreaseFftSize,
  };
}
