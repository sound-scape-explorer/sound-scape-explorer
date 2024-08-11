import {useAudioFile} from 'src/draggables/audio/use-audio-file';
import {computed, ref} from 'vue';

const waveform = ref<HTMLDivElement | null>(null);
const spectrogram = ref<HTMLDivElement | null>(null);

export function useDraggableAudio() {
  const {isLoading} = useAudioFile();

  const loadingClassNames = computed<string>(() => {
    let string = 'loading';

    if (!isLoading.value) {
      string += ' loading-hidden';
    }

    return string;
  });

  return {
    waveform: waveform,
    spectrogram: spectrogram,
    loadingClassNames: loadingClassNames,
  };
}
