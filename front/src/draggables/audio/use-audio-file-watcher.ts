import {useAudioFile} from 'src/draggables/audio/use-audio-file';
import {watch} from 'vue';

export function useAudioFileWatcher() {
  const {block, loadFile} = useAudioFile();

  watch(block, loadFile);
}
