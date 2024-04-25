import {FFT_SIZE} from 'src/constants';
import {reactive, ref} from 'vue';

interface FftSizeRef {
  value: number;
}

export const fftSizeRef = reactive<FftSizeRef>({
  value: FFT_SIZE.default,
});

export function useAudioComponent() {
  const containerRef = ref<HTMLDivElement | null>(null);
  const waveformContainerRef = ref<HTMLDivElement | null>(null);
  const spectrogramContainerRef = ref<HTMLDivElement | null>(null);

  const increaseFftSize = () => {
    if (fftSizeRef.value * 2 > FFT_SIZE.max) {
      return;
    }

    fftSizeRef.value *= 2;
  };

  const decreaseFftSize = () => {
    if (fftSizeRef.value / 2 < FFT_SIZE.min) {
      return;
    }

    fftSizeRef.value /= 2;
  };

  return {
    containerRef: containerRef,
    waveformContainerRef: waveformContainerRef,
    spectrogramContainerRef: spectrogramContainerRef,
    increaseFftSize: increaseFftSize,
    decreaseFftSize: decreaseFftSize,
  };
}
