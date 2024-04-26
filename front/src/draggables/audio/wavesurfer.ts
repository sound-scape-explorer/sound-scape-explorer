import colormap from 'colormap';
import SpectrogramPlugin, {type RGBA} from 'src/common/spectrogram';
import {useBandSelection} from 'src/composables/band-selection';
import {WAVE} from 'src/constants';
import {useAudioFourier} from 'src/draggables/audio/audio-component';
import {audioContextRef} from 'src/draggables/audio/audio-context';
import {audioFileBitDepthRef} from 'src/draggables/audio/audio-file';
import {useDraggableAudio} from 'src/draggables/audio/draggable-audio';
import {spectrogramColorRef} from 'src/draggables/audio/spectrogram-color';
import {computed, reactive, watch, watchEffect} from 'vue';
import WaveSurfer from 'wavesurfer.js';
import CursorPlugin from 'wavesurfer.js/src/plugin/cursor';
import type {WaveSurferParams} from 'wavesurfer.js/types/params';

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

interface WaveSurferOverflowLegendsRef {
  value: boolean;
}

export const waveSurferOverflowLegendsRef =
  reactive<WaveSurferOverflowLegendsRef>({
    value: false,
  });

export function useWavesurfer() {
  const {waveform, spectrogram} = useDraggableAudio();
  const {band} = useBandSelection();
  const {size} = useAudioFourier();

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
      band.value === null ||
      waveform.value === null ||
      spectrogram.value === null
    ) {
      return;
    }

    // Prevent multiple WaveSurfer instances
    if (waveSurferRef.value !== null) {
      return;
    }

    const params: WaveSurferParams = {
      audioContext: audioContextRef.value,
      container: waveform.value,
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
      spectrogram.value === null ||
      waveSurferRef.value === null ||
      band.value === null ||
      audioFileBitDepthRef.value === null
    ) {
      return;
    }

    if (typeof waveSurferRef.value.spectrogram !== 'undefined') {
      waveSurferRef.value.destroyPlugin('spectrogram');
    }

    const spectro = SpectrogramPlugin.create({
      container: spectrogram.value,
      labels: true,
      colorMap: colorsRef.value,
      height: 192,
      fftSamples: size.value,
      frequencyMin: band.value.low,
      frequencyMax: band.value.high,
      decibels: waveSurferShowDecibelsRef.value,
      overflowLegends: waveSurferOverflowLegendsRef.value,
      bitDepth: audioFileBitDepthRef.value,
    });

    waveSurferRef.value.registerPlugins([spectro]);
  };

  watch(
    [
      spectrogramColorRef,
      waveSurferShowDecibelsRef,
      waveSurferOverflowLegendsRef,
      audioFileBitDepthRef,
    ],
    registerSpectrogram,
  );

  const updateSpectrogramDefinition = () => {
    if (waveSurferRef.value === null) {
      return;
    }

    // @ts-expect-error overwrite variable
    waveSurferRef.value.spectrogram.fftSamples = size.value;
    waveSurferRef.value.drawBuffer();
  };

  watch(size, updateSpectrogramDefinition);

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
