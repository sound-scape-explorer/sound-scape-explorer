import {useStorageSettings} from 'src/composables/use-storage-settings';
import {WAVE} from 'src/constants';
import {useAudioContext} from 'src/draggables/audio/use-audio-context';
import {useDraggableAudio} from 'src/draggables/audio/use-draggable-audio';
import {useWavesurfer} from 'src/draggables/audio/use-wavesurfer';
import {useWavesurferCursor} from 'src/draggables/audio/use-wavesurfer-cursor';
import {useWavesurferSpectrogram} from 'src/draggables/audio/use-wavesurfer-spectrogram';
import {watch} from 'vue';
import WaveSurfer from 'wavesurfer.js';
import type {WaveSurferParams} from 'wavesurfer.js/types/params';

export function useWavesurferMounter() {
  const {ws} = useWavesurfer();
  const {context, create} = useAudioContext();
  const {waveform} = useDraggableAudio();
  const {settings} = useStorageSettings();

  useWavesurferCursor();
  useWavesurferSpectrogram();

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
}
