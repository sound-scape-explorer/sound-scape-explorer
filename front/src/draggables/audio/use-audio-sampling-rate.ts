import speedToPercentage from 'speed-to-percentage';
import speedToSemitones from 'speed-to-semitones';
import {useConfig} from 'src/composables/use-config';
import {PLAYBACK_RATE} from 'src/constants';
import {useAudioTransport} from 'src/draggables/audio/use-audio-transport';
import {useWavesurfer} from 'src/draggables/audio/use-wavesurfer';
import {ref} from 'vue';

interface Readable {
  hertz: string;
  percentage: string;
  semitones: string;
}

const getHertz = (sampleRate: number) => {
  return (sampleRate * rate.value).toFixed();
};

const rate = ref<number>(PLAYBACK_RATE.default); // playback speed
const readable = ref<Readable>({
  hertz: getHertz(44100),
  percentage: speedToPercentage(PLAYBACK_RATE.default, 2),
  semitones: speedToSemitones(PLAYBACK_RATE.default, 2),
});

// audio speed
export function useAudioSamplingRate() {
  const {config} = useConfig();
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

  const updateReadable = () => {
    if (config.value === null) {
      return;
    }

    const sampleRate = config.value.settings.expectedSampleRate;
    const hertz = (sampleRate * rate.value).toFixed();
    const percentage = speedToPercentage(rate.value, 2);
    const semitones = speedToSemitones(rate.value, 2);

    readable.value = {
      hertz,
      percentage,
      semitones,
    };
  };

  const reset = () => {
    rate.value = PLAYBACK_RATE.default;
  };

  return {
    rate,
    readable,
    update,
    updateReadable,
    reset,
  };
}
