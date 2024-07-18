import {useSettings} from 'src/composables/use-settings';
import {WAVE} from 'src/constants';
import {useAudioFourier} from 'src/draggables/audio/use-audio-component';
import {useAudioContext} from 'src/draggables/audio/use-audio-context';
import {useAudioFile} from 'src/draggables/audio/use-audio-file';
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
  const {context, create} = useAudioContext();
  const {waveform} = useDraggableAudio();
  const {settings} = useSettings();
  const {colormap} = useSpectrogramColormap();
  const {bitDepth} = useAudioFile();
  const {size} = useAudioFourier();
  const {isDecibelsDisplay, isLegendOverflow} = useWavesurferSettings();

  const {register: registerCursor} = useWavesurferCursor();
  const {register: registerSpectrogram} = useWavesurferSpectrogram();

  const mount = () => {
    if (ws.value !== null) {
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
  watch(settings, create);

  watch(ws, registerCursor);

  watch(
    [size, colormap, isDecibelsDisplay, isLegendOverflow, bitDepth],
    registerSpectrogram,
  );
}
