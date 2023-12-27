import colormap from 'colormap';
import type {Ref} from 'vue';
import {computed, reactive, watch, watchEffect} from 'vue';
import WaveSurfer from 'wavesurfer.js';
import Cursor from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.js';
import Spectrogram from 'wavesurfer.js/dist/plugin/wavesurfer.spectrogram.js';
import type {WaveSurferParams} from 'wavesurfer.js/types/params';

import {FFT_SIZE, WAVE} from '../../constants';
import {bandRef} from '../../hooks/useBands';
import {fftSizeRef} from './useAudioComponent';
import {audioContextRef} from './useAudioContext';
import {spectrogramColorRef} from './useAudioSpectrogramColor';

interface WaveSurferRef {
  value: WaveSurfer | null;
}

export const waveSurferRef = reactive<WaveSurferRef>({
  value: null,
});

interface UseWaveSurferProps {
  waveformContainerRef: Ref<HTMLDivElement | null>;
  spectrogramContainerRef: Ref<HTMLDivElement | null>;
}

export function useWaveSurfer({
  waveformContainerRef,
  spectrogramContainerRef,
}: UseWaveSurferProps) {
  const colorsRef = computed(() => {
    return colormap({
      colormap: spectrogramColorRef.value,
      nshades: 256,
      format: 'float',
    });
  });

  const createWaveSurfer = () => {
    if (
      audioContextRef.value === null ||
      bandRef.value === null ||
      waveformContainerRef.value === null ||
      spectrogramContainerRef.value === null
    ) {
      return;
    }

    // Prevent multiple WaveSurfer instances
    if (waveSurferRef.value !== null) {
      return;
    }

    const params: WaveSurferParams = {
      audioContext: audioContextRef.value,
      container: waveformContainerRef.value,
      scrollParent: false,
      barHeight: WAVE.default,
      normalize: false,
      height: 48,
      plugins: [
        Spectrogram.create({
          container: spectrogramContainerRef.value,
          labels: true,
          colorMap: colorsRef.value,
          height: 192,
          fftSamples: FFT_SIZE.default,
          frequencyMin: bandRef.value.low,
          frequencyMax: bandRef.value.high,
        }),
        Cursor.create({
          showTime: true,
          opacity: 1,
          customShowTimeStyle: {
            'background-color': '#000',
            'color': '#fff',
            'padding': '2px',
            'font-size': '10px',
          },
        }),
      ],
    };

    waveSurferRef.value = WaveSurfer.create(params);
  };

  watchEffect(createWaveSurfer);

  const updateSpectrogramDefinition = () => {
    if (waveSurferRef.value === null) {
      return;
    }

    // @ts-expect-error: 2540
    // noinspection JSConstantReassignment
    waveSurferRef.value.spectrogram.fftSamples = fftSizeRef.value;
    waveSurferRef.value.drawBuffer();
  };

  watch(fftSizeRef, updateSpectrogramDefinition);

  const renderWaveform = () => {
    if (waveSurferRef.value === null) {
      return;
    }

    waveSurferRef.value.drawBuffer();
  };

  const increaseVolume = () => {
    if (waveSurferRef.value === null) {
      return;
    }

    if (waveSurferRef.value.params.barHeight + WAVE.step > WAVE.max) {
      waveSurferRef.value.params.barHeight = WAVE.max;
    } else {
      waveSurferRef.value.params.barHeight += WAVE.step;

      const volume = waveSurferRef.value.getVolume();
      waveSurferRef.value.setVolume(volume + WAVE.step);
    }

    renderWaveform();
  };

  const decreaseVolume = () => {
    if (waveSurferRef.value === null) {
      return;
    }

    if (waveSurferRef.value.params.barHeight - WAVE.step < WAVE.min) {
      waveSurferRef.value.params.barHeight = WAVE.min;
    } else {
      waveSurferRef.value.params.barHeight -= WAVE.step;

      const volume = waveSurferRef.value.getVolume();
      waveSurferRef.value.setVolume(volume - WAVE.step);
    }

    waveSurferRef.value.drawBuffer();
  };

  return {
    increaseVolume: increaseVolume,
    decreaseVolume: decreaseVolume,
  };
}
