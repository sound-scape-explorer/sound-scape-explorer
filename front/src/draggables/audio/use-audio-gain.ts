import {AudioContextError} from 'src/common/Errors';
import {GAIN} from 'src/constants';
import {useAudioContext} from 'src/draggables/audio/use-audio-context';
import {ref} from 'vue';

const node = ref<GainNode | null>(null);
const gain = ref<number>(GAIN.default);

export function useAudioGain() {
  const {context} = useAudioContext();

  const create = () => {
    if (context.value === null) {
      throw new AudioContextError('context is not ready');
    }

    node.value = context.value.createGain();
  };

  const apply = (newValue: number) => {
    if (node.value === null) {
      return;
    }

    gain.value = newValue;
    node.value.gain.value = gain.value;
  };

  return {
    node: node,
    gain: gain,
    create: create,
    apply: apply,
  };
}
