import {useViewSelection} from 'src/composables/use-view-selection';
import {useAudioAnalyser} from 'src/draggables/audio/use-audio-analyser';
import {useAudioContext} from 'src/draggables/audio/use-audio-context';
import {useAudioFilters} from 'src/draggables/audio/use-audio-filters';
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
  const {hpf, lpf, hpfReadable, lpfReadable} = useAudioFilters();

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

    hpf.value = context.value.createBiquadFilter();
    hpf.value.type = 'highpass';
    hpf.value.Q.value = 1;
    hpf.value.frequency.value = hpfReadable.value ?? band.value.low;

    lpf.value = context.value.createBiquadFilter();
    lpf.value.type = 'lowpass';
    lpf.value.Q.value = 1;
    lpf.value.frequency.value = lpfReadable.value ?? band.value.high;

    // connect
    hpf.value.connect(lpf.value);
    lpf.value.connect(gainNode.value);
    gainNode.value.connect(analyser.value);

    ws.value.backend.setFilters([hpf.value, lpf.value]);
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
