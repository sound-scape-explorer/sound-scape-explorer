import {WAVE} from 'src/constants';
import {useWavesurfer} from 'src/draggables/audio/wavesurfer';

export function useWavesurferHandlers() {
  const {ws} = useWavesurfer();

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

    if (ws.value.params.barHeight + WAVE.step > WAVE.max) {
      ws.value.params.barHeight = WAVE.max;
    } else {
      ws.value.params.barHeight += WAVE.step;

      const volume = ws.value.getVolume();
      ws.value.setVolume(volume + WAVE.step);
    }

    renderWaveform();
  };

  const decreaseVolume = () => {
    if (ws.value === null) {
      return;
    }

    if (ws.value.params.barHeight - WAVE.step < WAVE.min) {
      ws.value.params.barHeight = WAVE.min;
    } else {
      ws.value.params.barHeight -= WAVE.step;

      const volume = ws.value.getVolume();
      ws.value.setVolume(volume - WAVE.step);
    }

    ws.value.drawBuffer();
    renderWaveform();
  };

  return {
    increaseVolume: increaseVolume,
    decreaseVolume: decreaseVolume,
  };
}
