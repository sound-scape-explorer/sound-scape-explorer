import colormap from 'colormap';
import type {ComputedRef, Ref} from 'vue';
import {computed} from 'vue';
import WaveSurfer from 'wavesurfer.js';
import Cursor from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.js';
import Spectrogram from 'wavesurfer.js/dist/plugin/wavesurfer.spectrogram.js';
import type {WaveSurferParams} from 'wavesurfer.js/types/params';

import {FFT_SIZE, WAVE} from '../../constants';
import {bandRef} from '../../hooks/useBands';
import {spectrogramColorRef} from './useAudioSpectrogramColor';

interface UseWaveSurferProps {
  audioContextRef: Ref<AudioContext | null>;
  waveformContainerRef: Ref<HTMLDivElement | null>;
  spectrogramContainerRef: Ref<HTMLDivElement | null>;
}

export function useWaveSurfer({
  audioContextRef,
  waveformContainerRef,
  spectrogramContainerRef,
}: UseWaveSurferProps) {
  const colorsRef = computed(() => {
    if (waveSurferRef.value !== null) {
      console.log('destroy?');
      // ws.destroy();
    }

    return colormap({
      colormap: spectrogramColorRef.value,
      nshades: 256,
      format: 'float',
    });
  });

  const waveSurferRef: ComputedRef<WaveSurfer | null> = computed(() => {
    if (
      audioContextRef.value === null ||
      bandRef.value === null ||
      waveformContainerRef.value === null ||
      spectrogramContainerRef.value === null
    ) {
      console.log(waveformContainerRef.value, spectrogramContainerRef.value);
      return null;
    }

    if (typeof waveSurferRef.value !== 'undefined') {
      // Prevent multiple WaveSurfer instances
      return waveSurferRef.value as WaveSurfer;
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

    return WaveSurfer.create(params);
  });

  return {
    waveSurferRef: waveSurferRef,
  };
}
