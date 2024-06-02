import {WAVE} from 'src/constants';
import {useAudioContext} from 'src/draggables/audio/audio-context';
import {useDraggableAudio} from 'src/draggables/audio/draggable-audio';
import {useWavesurfer} from 'src/draggables/audio/wavesurfer';
import {useWavesurferCursor} from 'src/draggables/audio/wavesurfer-cursor';
import {useWavesurferSpectrogram} from 'src/draggables/audio/wavesurfer-spectrogram';
import {watch} from 'vue';
import WaveSurfer from 'wavesurfer.js';
import type {WaveSurferParams} from 'wavesurfer.js/types/params';

export function useWavesurferMounter() {
  const {ws} = useWavesurfer();
  const {context} = useAudioContext();
  const {waveform} = useDraggableAudio();

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
}
