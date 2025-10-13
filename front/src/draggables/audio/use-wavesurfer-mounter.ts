import {useClientSettings} from 'src/composables/use-client-settings';
import {WAVEFORM_HEIGHT} from 'src/constants';
import {useAudioAnalyser} from 'src/draggables/audio/use-audio-analyser';
import {useAudioFourier} from 'src/draggables/audio/use-audio-component';
import {useAudioContext} from 'src/draggables/audio/use-audio-context';
import {useAudioFile} from 'src/draggables/audio/use-audio-file';
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
  const {context, create: createContext} = useAudioContext();
  const {create: createGain, apply: applyGain} = useAudioGain();
  const {create: createAnalyser} = useAudioAnalyser();
  const {waveform} = useDraggableAudio();
  const {bitDepth} = useAudioFile();
  const {size} = useAudioFourier();
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
      barHeight: WAVEFORM_HEIGHT,
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

  // todo: too much?
  watch(
    [size, colormap, isDecibelsDisplay, isLegendOverflow, bitDepth],
    registerSpectrogram,
  );
}
