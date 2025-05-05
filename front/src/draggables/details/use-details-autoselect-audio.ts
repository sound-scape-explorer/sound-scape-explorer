import {useAudioFile} from 'src/draggables/audio/use-audio-file';
import {useDetails} from 'src/draggables/details/use-details';

export function useDetailsAutoselectAudio() {
  const {windows} = useDetails();
  const {select} = useAudioFile();

  const autoselect = () => {
    if (windows.value === null) {
      return;
    }

    if (windows.value.length !== 1) {
      return;
    }

    const window = windows.value[0];
    select(window);
  };

  return {
    autoselect,
  };
}
