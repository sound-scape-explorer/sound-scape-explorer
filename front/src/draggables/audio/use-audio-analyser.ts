import {TIMEOUT} from 'src/constants';
import {useAudioContext} from 'src/draggables/audio/use-audio-context';
import {ref} from 'vue';

const analyser = ref<AnalyserNode | null>(null);
const data = ref<Uint8Array | null>(null);
const floats = ref<Float32Array | null>(null);
const isClipping = ref<boolean>(false);
const timer = ref<number | null>(null);
const size = 2048; // arbitrary
const rms = ref<number>(0);

export function useAudioAnalyser() {
  const {context} = useAudioContext();

  const create = () => {
    if (context.value === null) {
      return;
    }

    analyser.value = context.value.createAnalyser();
    analyser.value.fftSize = size;
    data.value = new Uint8Array(size);
    floats.value = new Float32Array(size);
  };

  const update = () => {
    if (
      analyser.value === null ||
      data.value === null ||
      floats.value === null
    ) {
      return;
    }

    analyser.value.getByteTimeDomainData(data.value);
    analyser.value.getFloatTimeDomainData(floats.value);

    let squares = 0;

    for (let i = 0; i < size; i += 1) {
      const v = floats.value[i];
      squares += v * v;

      if (data.value[i] >= 255 || data.value[i] <= 0) {
        isClipping.value = true;
        break;
      }
    }

    const mean = squares / data.value.length;
    rms.value = Math.sqrt(mean) * 10;

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
    create: create,
    analyser: analyser,
    detect: update,
    isClipping: isClipping,
    fade: fade,
    rms: rms,
  };
}
