import {useAudioRate} from 'src/draggables/audio/use-audio-rate';
import {onMounted, watch} from 'vue';

export function useAudioRateWatcher() {
  const {rate, update, updateReadable} = useAudioRate();
  onMounted(updateReadable);
  watch(rate, update);
  watch(rate, updateReadable);
}
