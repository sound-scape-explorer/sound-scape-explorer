import {watchThrottled} from '@vueuse/core';
import {useClientSettings} from 'src/composables/use-client-settings';
import {WAVEFORM_HEIGHT} from 'src/constants';
import {useAudioAnalyser} from 'src/draggables/audio/use-audio-analyser';
import {useAudioContext} from 'src/draggables/audio/use-audio-context';
import {useAudioFft} from 'src/draggables/audio/use-audio-fft';
import {useAudioFile} from 'src/draggables/audio/use-audio-file';
import {useAudioFilters} from 'src/draggables/audio/use-audio-filters';
import {useAudioGain} from 'src/draggables/audio/use-audio-gain';
import {useDraggableAudio} from 'src/draggables/audio/use-draggable-audio';
import {useWavesurfer} from 'src/draggables/audio/use-wavesurfer';
import {useWavesurferCursor} from 'src/draggables/audio/use-wavesurfer-cursor';
import {useWavesurferSpectrogram} from 'src/draggables/audio/use-wavesurfer-spectrogram';
import {onMounted, watch} from 'vue';
import WaveSurfer from 'wavesurfer.js';
import {type WaveSurferParams} from 'wavesurfer.js/types/params';

export function useWavesurferMounter() {
  const {ws} = useWavesurfer();
  const {hpfReadable, lpfReadable} = useAudioFilters();
  const {gain} = useAudioGain();
  const {context, create: createContext} = useAudioContext();
  const {create: createGain, apply: applyGain} = useAudioGain();
  const {create: createAnalyser} = useAudioAnalyser();
  const {waveform} = useDraggableAudio();
  const {bitDepth} = useAudioFile();
  const {size} = useAudioFft();
  const {
    spectrogramColorMap: colormap,
    decibelsDisplay: isDecibelsDisplay,
    legendOverflow: isLegendOverflow,
  } = useClientSettings();

  const {register: registerCursor} = useWavesurferCursor();
  const {register: registerSpectrogram} = useWavesurferSpectrogram();

  const mount = () => {
    const isLoaded = ws.value !== null;

    if (isLoaded) {
      return;
    }

    if (context.value === null || waveform.value === null) {
      return;
    }

    const params: WaveSurferParams = {
      audioContext: context.value,
      container: waveform.value,
      scrollParent: false,
      barHeight: gain.value * WAVEFORM_HEIGHT,
      normalize: false,
      height: 48,
    };

    ws.value = WaveSurfer.create(params);
  };

  // todo: too much?
  watch([context, waveform], mount);

  onMounted(() => {
    createContext();
    createGain();
    createAnalyser();
    applyGain();
  });

  // todo: too much?
  watch(ws, registerCursor);

  watchThrottled(
    [
      size,
      colormap,
      isDecibelsDisplay,
      isLegendOverflow,
      bitDepth,
      hpfReadable,
      lpfReadable,
    ],
    () => {
      requestAnimationFrame(registerSpectrogram);
    },
    {throttle: 500},
  );
}
