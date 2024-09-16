import {GAIN, WAVE} from 'src/constants';
import {useAudioGain} from 'src/draggables/audio/use-audio-gain';
import {useWavesurfer} from 'src/draggables/audio/use-wavesurfer';

export function useWavesurferHandlers() {
  const {ws} = useWavesurfer();
  const {gain, apply} = useAudioGain();

  const renderWaveform = () => {
    if (ws.value === null) {
      return;
    }

    ws.value.drawBuffer();
  };

  const increaseVolume = () => {
    if (ws.value === null) {
      return;
    }

    const nextValue = gain.value + GAIN.step;

    if (nextValue >= GAIN.max) {
      return;
    }

    apply(nextValue);

    ws.value.params.barHeight += WAVE.step;
    renderWaveform();
  };

  const decreaseVolume = () => {
    if (ws.value === null) {
      return;
    }

    const nextValue = gain.value - GAIN.step;

    if (nextValue <= GAIN.min) {
      return;
    }

    apply(nextValue);
    ws.value.params.barHeight -= WAVE.step;
    renderWaveform();
  };

  return {
    increaseVolume: increaseVolume,
    decreaseVolume: decreaseVolume,
  };
}
