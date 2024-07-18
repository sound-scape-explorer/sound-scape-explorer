import {useAudioFile} from 'src/draggables/audio/use-audio-file';
import {watch} from 'vue';

export function useAudioFileWatcher() {
  const {block, load} = useAudioFile();

  watch(block, load);
}
