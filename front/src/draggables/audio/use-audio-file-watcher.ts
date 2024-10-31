import {AudioFileError} from 'src/common/Errors';
import {useDraggables} from 'src/composables/use-draggables';
import {useAudioFile} from 'src/draggables/audio/use-audio-file';
import {watch} from 'vue';

export function useAudioFileWatcher() {
  const {block, loadFile, isLoading} = useAudioFile();
  const {close} = useDraggables();

  const wrapLoader = async () => {
    try {
      await loadFile();
    } catch (err) {
      close('audio');
      isLoading.value = false;

      if (err instanceof Error) {
        throw new AudioFileError(err.message);
      }
    }
  };

  watch(block, wrapLoader);
}
