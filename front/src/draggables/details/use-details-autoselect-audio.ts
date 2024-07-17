import {useAudioFile} from 'src/draggables/audio/use-audio-file';
import {useDetails} from 'src/draggables/details/use-details';

export function useDetailsAutoselectAudio() {
  const {blocks} = useDetails();
  const {select} = useAudioFile();

  const autoselect = () => {
    if (blocks.value === null) {
      return;
    }

    if (blocks.value.length !== 1) {
      return;
    }

    const blockDetails = blocks.value[0];
    select(blockDetails);
  };

  return {
    autoselect: autoselect,
  };
}
