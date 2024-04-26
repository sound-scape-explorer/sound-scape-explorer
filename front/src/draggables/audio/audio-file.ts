import {useAppNotification} from 'src/app/notification/app-notification';
import {useDraggables} from 'src/composables/draggables';
import {useIntegrationSelection} from 'src/composables/integration-selection';
import type {BlockDetails} from 'src/composables/storage-aggregated-interval-details';
import {useStorageAudioHost} from 'src/composables/storage-audio-host';
import {useAudioContext} from 'src/draggables/audio/audio-context';
import {
  audioIsLoadingRef,
  useAudioLoading,
} from 'src/draggables/audio/audio-loading';
import {useWavesurferLoader} from 'src/draggables/audio/wavesurfer-loader';
import {getBitDepthFromWav} from 'src/utils/get-bit-depth-from-wav';
import {reactive, watch} from 'vue';
import {encodeWavFileFromAudioBuffer} from 'wav-file-encoder';

interface AudioBlockRef {
  value: BlockDetails | null;
}

export const audioBlockRef = reactive<AudioBlockRef>({
  value: null,
});

interface AudioFileBitDepthRef {
  value: number | null;
}

export const audioFileBitDepthRef = reactive<AudioFileBitDepthRef>({
  value: null,
});

interface AudioDurationRef {
  value: number; // seconds
}

export const audioDurationRef = reactive<AudioDurationRef>({
  value: 0,
});

export function useAudioFile() {
  const {notify} = useAppNotification();
  const {loadBlob} = useWavesurferLoader();
  const {verifyAudioLoading} = useAudioLoading();
  const {audioHost} = useStorageAudioHost();
  const {openAudio, closeAudio} = useDraggables();
  const {integration} = useIntegrationSelection();
  const {context} = useAudioContext();

  const selectAudioBlock = (block: BlockDetails | null) => {
    if (!verifyAudioLoading()) {
      return;
    }

    if (block === null) {
      audioBlockRef.value = null;
      return;
    }

    openAudio();

    if (audioBlockRef.value === block) {
      return;
    }

    audioBlockRef.value = block;
  };

  const loadAudioFile = async () => {
    try {
      if (
        integration.value === null ||
        audioBlockRef.value === null ||
        context.value === null ||
        audioHost.value === null
      ) {
        return;
      }

      audioIsLoadingRef.value = true;

      const start = audioBlockRef.value.fileStart;
      const end = start + integration.value.seconds * 1000;

      let formattedHost = audioHost.value;
      if (!formattedHost.endsWith('/')) {
        formattedHost = `${formattedHost}/`;
      }

      const url = new URL(`${formattedHost}get`);
      url.searchParams.append('file', audioBlockRef.value.file);
      url.searchParams.append('start', start.toString());
      url.searchParams.append('end', end.toString());

      let response: Response | null = null;
      try {
        response = await fetch(url.toString());
      } catch {
        //
      }

      if (response === null) {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error(`could not fetch ${url}`);
      }

      if (response.status !== 200) {
        const text = await response.text();
        // noinspection ExceptionCaughtLocallyJS
        throw new Error(`${response.status}: ${text}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      audioFileBitDepthRef.value = getBitDepthFromWav(arrayBuffer);

      if (arrayBuffer.byteLength === 0) {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error('empty audio data');
      }

      const audioBuffer = await context.value.decodeAudioData(arrayBuffer);

      audioIsLoadingRef.value = false;
      audioDurationRef.value = audioBuffer.duration;

      const wav = encodeWavFileFromAudioBuffer(audioBuffer, 0);
      const blob = new Blob([wav]);
      loadBlob(blob);
    } catch (error) {
      notify('error', 'audio-file', `${error}`);

      closeAudio();
      audioIsLoadingRef.value = false;
    }
  };

  watch(audioBlockRef, loadAudioFile);

  return {
    selectAudioBlock: selectAudioBlock,
  };
}
