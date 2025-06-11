import {type Interval} from 'src/composables/use-intervals';
import {useAudioFile} from 'src/draggables/audio/use-audio-file';

export function useIntervalAudioAutoload() {
  const {select} = useAudioFile();

  const autoload = (interval: Interval) => {
    if (interval.windows.length !== 1) {
      return;
    }

    const window = interval.windows[0];
    select(window);
  };

  return {
    autoload,
  };
}
