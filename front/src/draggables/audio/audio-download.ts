import {audioContextRef} from 'src/draggables/audio/audio-context';
import {audioBlockRef} from 'src/draggables/audio/audio-file';
import {waveSurferRef} from 'src/draggables/audio/wavesurfer';
import {triggerWavDownload} from 'src/utils/trigger-wav-download';
import {encodeWavFileFromAudioBuffer} from 'wav-file-encoder';

export function useAudioDownload() {
  const downloadAudio = async () => {
    if (waveSurferRef.value === null || audioContextRef.value === null) {
      return;
    }

    // @ts-expect-error: 2339
    // noinspection TypeScriptUnresolvedReference
    const buffer = waveSurferRef.value.backend.buffer as AudioBuffer | null;

    if (buffer === null || audioBlockRef.value === null) {
      return;
    }

    const wav = encodeWavFileFromAudioBuffer(buffer, 0);
    const blob = new Blob([wav], {type: 'audio/wav'});
    const name = `${audioBlockRef.value.file} - ${audioBlockRef.value.start} - NO FILTER.wav`;

    triggerWavDownload(blob, name);
  };

  return {
    downloadAudio: downloadAudio,
  };
}
