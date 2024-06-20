import {useAudioFile} from 'src/draggables/audio/audio-file';
import {useWavesurfer} from 'src/draggables/audio/wavesurfer';
import {triggerWavDownload} from 'src/utils/trigger-wav-download';
import {encodeWavFileFromAudioBuffer} from 'wav-file-encoder';

export function useAudioDownload() {
  const {ws} = useWavesurfer();
  const {block} = useAudioFile();

  const downloadAudio = async () => {
    if (ws.value === null) {
      return;
    }

    // @ts-expect-error: 2339
    // noinspection TypeScriptUnresolvedReference
    const buffer = ws.value.backend.buffer as AudioBuffer | null;

    if (buffer === null || block.value === null) {
      return;
    }

    const wav = encodeWavFileFromAudioBuffer(buffer, 0);
    const blob = new Blob([wav], {type: 'audio/wav'});
    const name = `${block.value.file} - ${block.value.start} - NO FILTER.wav`;

    triggerWavDownload(blob, name);
  };

  return {
    downloadAudio: downloadAudio,
  };
}
