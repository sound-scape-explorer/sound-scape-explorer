import {useAudioFile} from 'src/draggables/audio/use-audio-file';
import {ref} from 'vue';

const waveform = ref<HTMLDivElement | null>(null);
const spectrogram = ref<HTMLDivElement | null>(null);

export function useDraggableAudio() {
  const {isLoading} = useAudioFile();

  return {
    waveform: waveform,
    spectrogram: spectrogram,
    isLoading: isLoading,
  };
}
