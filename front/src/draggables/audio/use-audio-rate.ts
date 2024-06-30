import speedToPercentage from 'speed-to-percentage';
import speedToSemitones from 'speed-to-semitones';
import {useStorageSettings} from 'src/composables/use-storage-settings';
import {PLAYBACK_RATE} from 'src/constants';
import {useAudioTransport} from 'src/draggables/audio/use-audio-transport';
import {useWavesurfer} from 'src/draggables/audio/use-wavesurfer';
import {ref, watch, watchEffect} from 'vue';

interface Readable {
  hertz: string;
  percentage: string;
  semitones: string;
}

const rate = ref<number>(PLAYBACK_RATE.default);
const readable = ref<Readable>({
  hertz: '',
  percentage: '',
  semitones: '',
});

// audio speed
export function useAudioRate() {
  const {settings} = useStorageSettings();
  const {togglePlayPause} = useAudioTransport();
  const {ws} = useWavesurfer();

  const update = () => {
    if (ws.value === null) {
      return;
    }

    ws.value.pause();
    ws.value.setPlaybackRate(rate.value);
    togglePlayPause();
  };

  watch(rate, update);

  const updateReadable = () => {
    if (settings.value === null) {
      return;
    }

    const sampleRate = settings.value['expected_sample_rate'];
    const hertz = (sampleRate * rate.value).toFixed();
    const percentage = speedToPercentage(rate.value, 2);
    const semitones = speedToSemitones(rate.value, 2);

    readable.value = {
      hertz: hertz,
      percentage: percentage,
      semitones: semitones,
    };
  };

  watchEffect(updateReadable);

  return {
    rate: rate,
    readable: readable,
  };
}
