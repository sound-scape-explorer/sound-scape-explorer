import {useBandSelection} from 'src/composables/band-selection';
import {useAudioContext} from 'src/draggables/audio/audio-context';
import {useAudioTransport} from 'src/draggables/audio/audio-transport';
import {waveSurferRef} from 'src/draggables/audio/wavesurfer';

export function useWavesurferLoader() {
  const {band} = useBandSelection();
  const {seek, stop} = useAudioTransport();
  const {context} = useAudioContext();
  const {isPlaying} = useAudioTransport();

  const handleAudioEnd = () => {
    isPlaying.value = false;
  };

  const prepareAudio = () => {
    if (
      waveSurferRef.value === null ||
      band.value === null ||
      context.value === null
    ) {
      return;
    }

    const lowShelf = context.value.createBiquadFilter();
    lowShelf.type = 'lowshelf';
    lowShelf.gain.value = -60;
    lowShelf.frequency.value = band.value.low;

    const highShelf = context.value.createBiquadFilter();
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
