import {bandRef} from '../../hooks/useBands';
import {audioContextRef} from './useAudioContext';
import {audioIsPlayingRef, useAudioTransport} from './useAudioTransport';
import {waveSurferRef} from './useWaveSurfer';

export function useWaveSurferLoader() {
  const {seek, stop} = useAudioTransport();
  const handleAudioEnd = () => {
    audioIsPlayingRef.value = false;
  };

  const prepareAudio = () => {
    if (
      waveSurferRef.value === null ||
      bandRef.value === null ||
      audioContextRef.value === null
    ) {
      return;
    }

    const lowShelf = audioContextRef.value.createBiquadFilter();
    lowShelf.type = 'lowshelf';
    lowShelf.gain.value = -60;
    lowShelf.frequency.value = bandRef.value.low;

    const highShelf = audioContextRef.value.createBiquadFilter();
    highShelf.type = 'highshelf';
    highShelf.gain.value = -60;
    highShelf.frequency.value = bandRef.value.high;

    waveSurferRef.value.backend.setFilters([lowShelf, highShelf]);
  };
  const loadBlob = (blob: Blob) => {
    if (waveSurferRef.value === null) {
      return;
    }

    stop();
    waveSurferRef.value.loadBlob(blob);
    waveSurferRef.value.on('seek', seek);
    waveSurferRef.value.on('finish', handleAudioEnd);
    waveSurferRef.value.on('ready', prepareAudio);
  };

  return {
    loadBlob: loadBlob,
  };
}
