import {useAppErrors} from 'src/composables/use-app-errors';
import {useDraggables} from 'src/composables/use-draggables';
import {useAudioFile} from 'src/draggables/audio/use-audio-file';
import {watch} from 'vue';

export function useAudioFileWatcher() {
  const {block, loadFile, isLoading} = useAudioFile();
  const {close} = useDraggables();
  const {emitAudioError} = useAppErrors();

  const wrapLoader = async () => {
    try {
      await loadFile();
    } catch (err) {
      await emitAudioError(err);
      close('audio');
      isLoading.value = false;
    }
  };

  watch(block, wrapLoader);
}
