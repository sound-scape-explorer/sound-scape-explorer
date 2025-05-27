import {useViewSelection} from 'src/composables/use-view-selection';
import {useAudioAnalyser} from 'src/draggables/audio/use-audio-analyser';
import {useAudioContext} from 'src/draggables/audio/use-audio-context';
import {useAudioGain} from 'src/draggables/audio/use-audio-gain';
import {useAudioTransport} from 'src/draggables/audio/use-audio-transport';
import {useWavesurfer} from 'src/draggables/audio/use-wavesurfer';

export function useWavesurferLoader() {
  const {band} = useViewSelection();
  const {seek, stop} = useAudioTransport();
  const {context} = useAudioContext();
  const {isPlaying} = useAudioTransport();
  const {ws} = useWavesurfer();
  const {node: gainNode} = useAudioGain();
  const {analyser} = useAudioAnalyser();

  const handleAudioEnd = () => {
    isPlaying.value = false;
  };

  const prepare = () => {
    if (
      ws.value === null ||
      band.value === null ||
      context.value === null ||
      gainNode.value === null ||
      analyser.value === null
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

    // connect
    lowShelf.connect(highShelf);
    highShelf.connect(gainNode.value);
    gainNode.value.connect(analyser.value);

    ws.value.backend.setFilters([lowShelf, highShelf]);
    analyser.value.connect(context.value.destination);
  };

  const loadSlice = (blob: Blob) => {
    if (ws.value === null) {
      return;
    }

    stop();
    ws.value.loadBlob(blob);
    ws.value.once('seek', seek);
    ws.value.once('finish', handleAudioEnd);
    ws.value.once('ready', prepare);
  };

  return {
    loadSlice,
  };
}
