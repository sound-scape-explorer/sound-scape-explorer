import {reactive} from 'vue';

import {waveSurferRef} from './useWaveSurfer';

interface AudioIsPlayingRef {
  value: boolean;
}

export const audioIsPlayingRef = reactive<AudioIsPlayingRef>({
  value: false,
});

export function useAudioTransport() {
  const togglePlayPause = () => {
    if (waveSurferRef.value === null) {
      return;
    }

    waveSurferRef.value.playPause();
    audioIsPlayingRef.value = waveSurferRef.value.isPlaying();
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
    audioIsPlayingRef.value = false;
  };

  return {
    togglePlayPause: togglePlayPause,
    seek: seek,
    stop: stop,
  };
}
