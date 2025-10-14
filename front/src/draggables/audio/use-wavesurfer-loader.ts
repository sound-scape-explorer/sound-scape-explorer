import {useViewSelection} from 'src/composables/use-view-selection';
import {useAudioAnalyser} from 'src/draggables/audio/use-audio-analyser';
import {useAudioContext} from 'src/draggables/audio/use-audio-context';
import {
  FilterType,
  useAudioFilters,
} from 'src/draggables/audio/use-audio-filters';
import {useAudioGain} from 'src/draggables/audio/use-audio-gain';
import {useAudioTransport} from 'src/draggables/audio/use-audio-transport';
import {useWavesurfer} from 'src/draggables/audio/use-wavesurfer';

export function useWavesurferLoader() {
  const {band} = useViewSelection();
  const {seek, pause} = useAudioTransport();
  const {context} = useAudioContext();
  const {ws} = useWavesurfer();
  const {node: gainNode} = useAudioGain();
  const {analyser} = useAudioAnalyser();
  const {hpfChain, lpfChain, hpfReadable, lpfReadable, createFilter} =
    useAudioFilters();

  const connect = () => {
    if (
      ws.value === null ||
      band.value === null ||
      context.value === null ||
      gainNode.value === null ||
      analyser.value === null
    ) {
      return;
    }

    const highFrequency = lpfReadable.value ?? band.value.high;
    lpfChain.value = createFilter(
      FilterType.enum.lpf,
      highFrequency,
      context.value,
      gainNode.value,
    );

    const lowFrequency = hpfReadable.value ?? band.value.low;
    hpfChain.value = createFilter(
      FilterType.enum.hpf,
      lowFrequency,
      context.value,
      lpfChain.value[0],
    );

    gainNode.value.connect(analyser.value);

    ws.value.backend.setFilters([...hpfChain.value, ...lpfChain.value]);
    analyser.value.connect(context.value.destination);
  };

  const load = (blob: Blob) => {
    if (ws.value === null) {
      return;
    }

    pause();
    ws.value.loadBlob(blob);
    ws.value.once('ready', connect);
    ws.value.on('seek', seek);
    ws.value.on('finish', pause);
  };

  return {
    load,
    connect,
  };
}
