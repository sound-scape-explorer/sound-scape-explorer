import colormap from 'colormap';
import SpectrogramPlugin, {type RGBA} from 'src/common/spectrogram';
import type {Ref} from 'vue';
import {computed, reactive, watch, watchEffect} from 'vue';
import WaveSurfer from 'wavesurfer.js';
import CursorPlugin from 'wavesurfer.js/src/plugin/cursor';
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

interface WaveSurferShowDecibelsRef {
  value: boolean;
}

export const waveSurferShowDecibelsRef = reactive<WaveSurferShowDecibelsRef>({
  value: true,
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
    const colors = colormap({
      colormap: spectrogramColorRef.value,
      nshades: 256,
      format: 'float',
    });

    return colors as RGBA[] & {length: 256};
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
    };

    waveSurferRef.value = WaveSurfer.create(params);
    registerCursor();
    registerSpectrogram();
  };

  watchEffect(createWaveSurfer);

  const registerCursor = () => {
    if (waveSurferRef.value === null) {
      return;
    }

    const cursor = CursorPlugin.create({
      showTime: true,
      opacity: 'solid',
      customShowTimeStyle: {
        'background-color': '#000',
        'color': '#fff',
        'padding': '2px',
        'font-size': '10px',
      },
    });

    waveSurferRef.value.registerPlugins([cursor]);
  };

  const registerSpectrogram = () => {
    if (
      spectrogramContainerRef.value === null ||
      waveSurferRef.value === null ||
      bandRef.value === null
    ) {
      return;
    }

    if (typeof waveSurferRef.value.spectrogram !== 'undefined') {
      waveSurferRef.value.destroyPlugin('spectrogram');
    }

    const spectrogram = SpectrogramPlugin.create({
      container: spectrogramContainerRef.value,
      labels: true,
      colorMap: colorsRef.value,
      height: 192,
      fftSamples: FFT_SIZE.default,
      frequencyMin: bandRef.value.low,
      frequencyMax: bandRef.value.high,
      decibels: waveSurferShowDecibelsRef.value,
    });

    waveSurferRef.value.registerPlugins([spectrogram]);
  };

  watch([spectrogramColorRef, waveSurferShowDecibelsRef], registerSpectrogram);

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
