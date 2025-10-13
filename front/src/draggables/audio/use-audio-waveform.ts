import {WAVEFORM_HEIGHT} from 'src/constants';
import {useAudioGain} from 'src/draggables/audio/use-audio-gain';
import {useWavesurfer} from 'src/draggables/audio/use-wavesurfer';

export function useAudioWaveform() {
  const {ws} = useWavesurfer();
  const {gain} = useAudioGain();

  const render = () => {
    if (ws.value === null) {
      return;
    }

    ws.value.params.barHeight = gain.value * WAVEFORM_HEIGHT;
    ws.value.drawBuffer();
  };

  return {
    render,
  };
}
