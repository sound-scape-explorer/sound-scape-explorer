import {useBandSelection} from 'src/composables/use-band-selection';
import {useAudioContext} from 'src/draggables/audio/use-audio-context';
import {useAudioTransport} from 'src/draggables/audio/use-audio-transport';
import {useWavesurfer} from 'src/draggables/audio/use-wavesurfer';

export function useWavesurferLoader() {
  const {band} = useBandSelection();
  const {seek, stop} = useAudioTransport();
  const {context} = useAudioContext();
  const {isPlaying} = useAudioTransport();
  const {ws} = useWavesurfer();

  const handleAudioEnd = () => {
    isPlaying.value = false;
  };

  const prepareFilters = () => {
    if (ws.value === null || band.value === null || context.value === null) {
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

    ws.value.backend.setFilters([lowShelf, highShelf]);
  };

  const loadBlob = (blob: Blob) => {
    if (ws.value === null) {
      return;
    }

    stop();
    ws.value.loadBlob(blob);
    ws.value.on('seek', seek);
    ws.value.on('finish', handleAudioEnd);
    ws.value.on('ready', prepareFilters);
  };

  return {
    loadBlob: loadBlob,
  };
}
