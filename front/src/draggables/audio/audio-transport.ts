import {waveSurferRef} from 'src/draggables/audio/wavesurfer';
import {ref} from 'vue';

const isPlaying = ref<boolean>(false);

export function useAudioTransport() {
  const togglePlayPause = () => {
    if (waveSurferRef.value === null) {
      return;
    }

    waveSurferRef.value.playPause();
    isPlaying.value = waveSurferRef.value.isPlaying();
  };

  const seek = () => {
    if (waveSurferRef.value === null) {
      return;
    }

    if (waveSurferRef.value.isPlaying()) {
      return;
    }

    togglePlayPause();
  };

  const stop = () => {
    if (waveSurferRef.value === null) {
      return;
    }

    waveSurferRef.value.seekTo(0);
    waveSurferRef.value.pause();
    isPlaying.value = false;
  };

  return {
    isPlaying: isPlaying,
    togglePlayPause: togglePlayPause,
    seek: seek,
    stop: stop,
  };
}
