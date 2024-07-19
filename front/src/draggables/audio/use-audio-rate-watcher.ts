import {useAudioRate} from 'src/draggables/audio/use-audio-rate';
import {watch} from 'vue';

export function useAudioRateWatcher() {
  const {rate, update, updateReadable} = useAudioRate();
  watch(rate, update);
  watch(rate, updateReadable);
}
