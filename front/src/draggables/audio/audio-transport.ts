import {useWavesurfer} from 'src/draggables/audio/wavesurfer';
import {ref} from 'vue';

const isPlaying = ref<boolean>(false);

export function useAudioTransport() {
  const {ws} = useWavesurfer();

  const togglePlayPause = () => {
    if (ws.value === null) {
      return;
    }

    ws.value.playPause();
    isPlaying.value = ws.value.isPlaying();
  };

  const seek = () => {
    if (ws.value === null) {
      return;
    }

    if (ws.value.isPlaying()) {
      return;
    }

    togglePlayPause();
  };

  const stop = () => {
    if (ws.value === null) {
      return;
    }

    ws.value.seekTo(0);
    ws.value.pause();
    isPlaying.value = false;
  };

  return {
    isPlaying: isPlaying,
    togglePlayPause: togglePlayPause,
    seek: seek,
    stop: stop,
  };
}
