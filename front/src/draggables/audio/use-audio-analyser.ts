import {TIMEOUT} from 'src/constants';
import {useAudioContext} from 'src/draggables/audio/use-audio-context';
import {useAudioTransport} from 'src/draggables/audio/use-audio-transport';
import {ref} from 'vue';

const analyser = ref<AnalyserNode | null>(null);
const floats = ref<Float32Array<ArrayBuffer> | null>(null);
const isClipping = ref<boolean>(false);
const timer = ref<number | null>(null);
const size = 1024; // arbitrary
const rms = ref<number>(0);

export function useAudioAnalyser() {
  const {context} = useAudioContext();
  const {isPlaying} = useAudioTransport();

  const create = () => {
    if (context.value === null) {
      return;
    }

    analyser.value = context.value.createAnalyser();
    analyser.value.fftSize = size;
    floats.value = new Float32Array(size);
  };

  const update = () => {
    if (
      analyser.value === null ||
      floats.value === null ||
      isPlaying.value === false
    ) {
      return;
    }

    analyser.value.getFloatTimeDomainData(floats.value);

    let squares = 0;

    for (let i = 0; i < size; i += 1) {
      const f = floats.value[i];

      if (f >= 1.0 || f <= -1.0) {
        isClipping.value = true;
      }

      squares += f * f;
    }

    const mean = squares / size;
    rms.value = Math.sqrt(mean) * 4; // TODO: why artificially adding gain to RMS?

    requestAnimationFrame(update);
  };

  const fade = () => {
    if (timer.value !== null) {
      clearTimeout(timer.value);
    }

    timer.value = setTimeout(() => {
      isClipping.value = false;
      timer.value = null;
    }, TIMEOUT * 2);
  };

  return {
    create,
    analyser,
    update,
    isClipping,
    fade,
    rms,
  };
}
