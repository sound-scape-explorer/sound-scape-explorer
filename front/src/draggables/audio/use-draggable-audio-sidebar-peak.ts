import {useAudioAnalyser} from 'src/draggables/audio/use-audio-analyser';
import {computed} from 'vue';

export function useDraggableAudioSidebarPeak() {
  const {isClipping} = useAudioAnalyser();

  const classNames = computed<string>(() => {
    let string = 'peak';

    if (isClipping.value) {
      string += ' peaking';
    }

    return string;
  });

  return {
    classNames: classNames,
  };
}
