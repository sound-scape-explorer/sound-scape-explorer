import {useSelectBand} from 'src/composables/select-band';

import {audioContextRef} from './useAudioContext';
import {audioIsPlayingRef, useAudioTransport} from './useAudioTransport';
import {waveSurferRef} from './useWaveSurfer';

export function useWaveSurferLoader() {
  const {band} = useSelectBand();
  const {seek, stop} = useAudioTransport();
  const handleAudioEnd = () => {
    audioIsPlayingRef.value = false;
  };

  const prepareAudio = () => {
    if (
      waveSurferRef.value === null ||
      band.value === null ||
      audioContextRef.value === null
    ) {
      return;
    }

    const lowShelf = audioContextRef.value.createBiquadFilter();
    lowShelf.type = 'lowshelf';
    lowShelf.gain.value = -60;
    lowShelf.frequency.value = band.value.low;

    const highShelf = audioContextRef.value.createBiquadFilter();
    highShelf.type = 'highshelf';
    highShelf.gain.value = -60;
    highShelf.frequency.value = band.value.high;

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
