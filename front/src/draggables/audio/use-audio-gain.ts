import {AudioContextError} from 'src/common/Errors';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useAudioContext} from 'src/draggables/audio/use-audio-context';
import {ref} from 'vue';

const node = ref<GainNode | null>(null);

export function useAudioGain() {
  const {context} = useAudioContext();
  const {audioGain} = useClientSettings();

  const create = () => {
    if (context.value === null) {
      throw new AudioContextError('context is not ready');
    }

    node.value = context.value.createGain();
  };

  // propagate to context
  const apply = () => {
    if (node.value === null) {
      return;
    }

    node.value.gain.value = audioGain.value;
  };

  return {
    node,
    gain: audioGain,
    create,
    apply,
  };
}
