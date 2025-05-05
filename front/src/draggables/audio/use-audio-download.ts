import {useAudioFile} from 'src/draggables/audio/use-audio-file';
import {useWavesurfer} from 'src/draggables/audio/use-wavesurfer';
import {triggerWavDownload} from 'src/utils/audio';
import {encodeWavFileFromAudioBuffer} from 'wav-file-encoder';

export function useAudioDownload() {
  const {ws} = useWavesurfer();
  const {window} = useAudioFile();

  const downloadAudio = async () => {
    if (ws.value === null) {
      return;
    }

    // @ts-expect-error: 2339
    // noinspection TypeScriptUnresolvedReference
    const buffer = ws.value.backend.buffer as AudioBuffer | null;

    if (buffer === null || window.value === null) {
      return;
    }

    const wav = encodeWavFileFromAudioBuffer(buffer, 0);
    const blob = new Blob([wav], {type: 'audio/wav'});
    const name = `file index ${window.value.file.Index} - relative start ${window.value.relative.start} - NO FILTER.wav`;

    triggerWavDownload(blob, name);
  };

  return {
    downloadAudio,
  };
}
