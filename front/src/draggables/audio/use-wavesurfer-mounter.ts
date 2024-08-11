import {useSettings} from 'src/composables/use-settings';
import {GAIN, WAVE} from 'src/constants';
import {useAudioAnalyser} from 'src/draggables/audio/use-audio-analyser';
import {useAudioFourier} from 'src/draggables/audio/use-audio-component';
import {useAudioContext} from 'src/draggables/audio/use-audio-context';
import {useAudioFile} from 'src/draggables/audio/use-audio-file';
import {useAudioGain} from 'src/draggables/audio/use-audio-gain';
import {useDraggableAudio} from 'src/draggables/audio/use-draggable-audio';
import {useSpectrogramColormap} from 'src/draggables/audio/use-spectrogram-colormap';
import {useWavesurfer} from 'src/draggables/audio/use-wavesurfer';
import {useWavesurferCursor} from 'src/draggables/audio/use-wavesurfer-cursor';
import {useWavesurferSettings} from 'src/draggables/audio/use-wavesurfer-settings';
import {useWavesurferSpectrogram} from 'src/draggables/audio/use-wavesurfer-spectrogram';
import {watch} from 'vue';
import WaveSurfer from 'wavesurfer.js';
import type {WaveSurferParams} from 'wavesurfer.js/types/params';

export function useWavesurferMounter() {
  const {ws} = useWavesurfer();
  const {context, create: createContext} = useAudioContext();
  const {create: createGain, apply: applyGain} = useAudioGain();
  const {create: createAnalyser} = useAudioAnalyser();
  const {waveform} = useDraggableAudio();
  const {settings} = useSettings();
  const {colormap} = useSpectrogramColormap();
  const {bitDepth} = useAudioFile();
  const {size} = useAudioFourier();
  const {isDecibelsDisplay, isLegendOverflow} = useWavesurferSettings();

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
      barHeight: WAVE.default,
      normalize: false,
      height: 48,
    };

    ws.value = WaveSurfer.create(params);
  };

  watch([context, waveform], mount);

  watch(settings, () => {
    createContext();
    createGain();
    createAnalyser();
    applyGain(GAIN.default);
  });

  watch(ws, registerCursor);

  watch(
    [size, colormap, isDecibelsDisplay, isLegendOverflow, bitDepth],
    registerSpectrogram,
  );
}
