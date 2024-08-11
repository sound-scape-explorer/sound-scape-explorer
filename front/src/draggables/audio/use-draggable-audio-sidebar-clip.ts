import {useAudioAnalyser} from 'src/draggables/audio/use-audio-analyser';
import {computed} from 'vue';

export function useDraggableAudioSidebarClip() {
  const {isClipping} = useAudioAnalyser();

  const classNames = computed<string>(() => {
    let string = 'clip';

    if (isClipping.value) {
      string += ' clipping';
    }

    return string;
  });

  return {
    classNames: classNames,
  };
}
