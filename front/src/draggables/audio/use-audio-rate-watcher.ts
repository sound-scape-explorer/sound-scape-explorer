import {useAudioSamplingRate} from 'src/draggables/audio/use-audio-sampling-rate';
import {onMounted, watch} from 'vue';

export function useAudioRateWatcher() {
  const {rate, update, updateReadable} = useAudioSamplingRate();
  onMounted(updateReadable);
  watch(rate, update);
  watch(rate, updateReadable);
}
