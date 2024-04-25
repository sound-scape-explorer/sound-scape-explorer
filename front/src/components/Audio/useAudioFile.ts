import {useAppNotification} from 'src/components/app/AppNotification/useAppNotification';
import {useDraggables} from 'src/composables/draggables';
import type {BlockDetails} from 'src/composables/storage-aggregated-interval-details';
import {useStorageAudioHost} from 'src/composables/storage-audio-host';
import {integrationRef} from 'src/hooks/useIntegrations';
import {getBitDepthFromWav} from 'src/utils/get-bit-depth-from-wav';
import {reactive, watch} from 'vue';
import {encodeWavFileFromAudioBuffer} from 'wav-file-encoder';

import {audioContextRef} from './useAudioContext';
import {audioIsLoadingRef, useAudioLoading} from './useAudioLoading';
import {useWaveSurferLoader} from './useWaveSurferLoader';

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
  const {loadBlob} = useWaveSurferLoader();
  const {verifyAudioLoading} = useAudioLoading();
  const {audioHost} = useStorageAudioHost();
  const {store} = useDraggables();

  const openAudioModal = () => {
    if (store.audio === true) {
      return;
    }

    store.audio = true;
  };

  const selectAudioBlock = (block: BlockDetails | null) => {
    if (!verifyAudioLoading()) {
      return;
    }

    if (block === null) {
      audioBlockRef.value = null;
      return;
    }

    openAudioModal();

    if (audioBlockRef.value === block) {
      return;
    }

    audioBlockRef.value = block;
  };

  const loadAudioFile = async () => {
    try {
      if (
        integrationRef.value === null ||
        audioBlockRef.value === null ||
        audioContextRef.value === null ||
        audioHost.value === null
      ) {
        return;
      }

      audioIsLoadingRef.value = true;

      const start = audioBlockRef.value.fileStart;
      const end = start + integrationRef.value.seconds * 1000;

      let formattedHost = audioHost.value;
      if (!formattedHost.endsWith('/')) {
        formattedHost = `${formattedHost}/`;
      }

      const url = new URL(`${formattedHost}get`);
      url.searchParams.append('file', audioBlockRef.value.file);
      url.searchParams.append('start', start.toString());
      url.searchParams.append('end', end.toString());

      const response = await fetch(url.toString());

      if (response.status !== 200) {
        const text = await response.text();
        // noinspection ExceptionCaughtLocallyJS
        throw new Error(`${response.status}: ${text}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      audioFileBitDepthRef.value = getBitDepthFromWav(arrayBuffer);

      if (arrayBuffer.byteLength === 0) {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error('Empty audio data');
      }

      const audioBuffer = await audioContextRef.value.decodeAudioData(
        arrayBuffer,
      );

      audioIsLoadingRef.value = false;
      audioDurationRef.value = audioBuffer.duration;

      const wav = encodeWavFileFromAudioBuffer(audioBuffer, 0);
      const blob = new Blob([wav]);
      loadBlob(blob);
    } catch (error) {
      notify('error', 'Failed to load audio', `${error}`);

      store.audio = false;
      audioIsLoadingRef.value = false;
    }
  };

  watch(audioBlockRef, loadAudioFile);

  return {
    selectAudioBlock: selectAudioBlock,
  };
}
