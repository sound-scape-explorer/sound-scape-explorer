import {useAudioAnalyser} from 'src/draggables/audio/use-audio-analyser';
import {useAudioTransport} from 'src/draggables/audio/use-audio-transport';
import {watch} from 'vue';

export function useAudioLifecycles() {
  const {isPlaying} = useAudioTransport();
  const {update, isClipping, fade} = useAudioAnalyser();

  watch(isPlaying, () => {
    if (isPlaying.value === false) {
      return;
    }

    update();
  });

  watch(isClipping, fade);
}
