import {ref} from 'vue';

const waveform = ref<HTMLDivElement | null>(null);
const spectrogram = ref<HTMLDivElement | null>(null);

export function useDraggableAudio() {
  return {
    waveform: waveform,
    spectrogram: spectrogram,
  };
}
