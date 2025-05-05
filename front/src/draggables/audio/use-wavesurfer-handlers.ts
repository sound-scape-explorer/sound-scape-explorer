import {GAIN, WAVE} from 'src/constants';
import {useAudioGain} from 'src/draggables/audio/use-audio-gain';
import {useWavesurfer} from 'src/draggables/audio/use-wavesurfer';
import {computed} from 'vue';

export function useWavesurferHandlers() {
  const {ws} = useWavesurfer();
  const {gain, apply} = useAudioGain();

  const increaseValue = computed(() => gain.value + GAIN.step);
  const decreaseValue = computed(() => gain.value - GAIN.step);
  const canIncrease = computed(() => increaseValue.value <= GAIN.max);
  const canDecrease = computed(() => decreaseValue.value >= GAIN.min);

  const renderWaveform = () => {
    if (ws.value === null) {
      return;
    }

    ws.value.drawBuffer();
  };

  const increase = () => {
    if (ws.value === null || !canIncrease.value) {
      return;
    }

    apply(increaseValue.value);
    ws.value.params.barHeight += WAVE.step;
    renderWaveform();
  };

  const decrease = () => {
    if (ws.value === null || !canDecrease.value) {
      return;
    }

    apply(decreaseValue.value);
    ws.value.params.barHeight -= WAVE.step;
    renderWaveform();
  };

  return {
    increase,
    decrease,
    canIncrease,
    canDecrease,
  };
}
