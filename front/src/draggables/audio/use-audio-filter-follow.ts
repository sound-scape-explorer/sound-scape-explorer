import {ref} from 'vue';

const isFollowing = ref<boolean>(false);

// following the audio playback rate
export function useAudioFilterFollow() {
  const toggle = () => (isFollowing.value = !isFollowing.value);

  return {
    isFollowing,
    toggle,
  };
}
