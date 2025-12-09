import {useWavesurfer} from 'src/draggables/audio/use-wavesurfer';
import {ref} from 'vue';

const isPlaying = ref<boolean>(false);

export function useAudioTransport() {
  const {ws} = useWavesurfer();

  const toggle = () => {
    if (ws.value === null) {
      return;
    }

    if (isPlaying.value) {
      pause();
      return;
    }

    play();
  };

  const play = () => {
    if (ws.value === null) {
      return;
    }

    ws.value.play();
    isPlaying.value = true;
  };

  const pause = () => {
    if (ws.value === null) {
      return;
    }

    ws.value.pause();
    isPlaying.value = false;
  };

  const seek = () => {
    if (ws.value === null) {
      return;
    }

    play();
  };

  const stop = () => {
    if (ws.value === null) {
      return;
    }

    ws.value.seekTo(0);
    pause();
  };

  return {
    isPlaying,
    play,
    pause,
    stop,
    toggle,
    seek,
  };
}
