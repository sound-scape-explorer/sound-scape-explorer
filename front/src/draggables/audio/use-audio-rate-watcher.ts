import {useAudioPlaybackRate} from 'src/draggables/audio/use-audio-playback-rate';
import {onMounted, watch} from 'vue';

export function useAudioRateWatcher() {
  const {rate, update, updateReadable} = useAudioPlaybackRate();
  onMounted(updateReadable);
  watch(rate, update);
  watch(rate, updateReadable);
}
