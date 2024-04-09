import {reactive, watch} from 'vue';
import {encodeWavFileFromAudioBuffer} from 'wav-file-encoder';

import type {BlockDetails} from '../../hooks/useAggregatedIntervalDetails';
import {audioHostRef} from '../../hooks/useAudioHost';
import {integrationRef} from '../../hooks/useIntegrations';
import {getBitDepthFromWav} from '../../utils/get-bit-depth-from-wav';
import {appDraggablesStore} from '../AppDraggable/appDraggablesStore';
import {useNotification} from '../AppNotification/useNotification';
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

export function useAudioFile() {
  const {notify} = useNotification();
  const {loadBlob} = useWaveSurferLoader();
  const {verifyAudioLoading} = useAudioLoading();

  const openAudioModal = () => {
    if (appDraggablesStore.audio === true) {
      return;
    }

    appDraggablesStore.audio = true;
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
        audioHostRef.value === null
      ) {
        return;
      }

      audioIsLoadingRef.value = true;

      const start = audioBlockRef.value.fileStart;
      const end = start + integrationRef.value.seconds * 1000;

      let audioHost = audioHostRef.value;
      if (!audioHost.endsWith('/')) {
        audioHost = `${audioHost}/`;
      }

      const url = new URL(`${audioHost}get`);
      url.searchParams.append('file', audioBlockRef.value.file);
      url.searchParams.append('start', start.toString());
      url.searchParams.append('end', end.toString());

      const response = await fetch(url);

      if (response.status !== 200) {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error(`Failed to fetch audio at ${url}`);
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

      const wav = encodeWavFileFromAudioBuffer(audioBuffer, 0);
      const blob = new Blob([wav]);
      loadBlob(blob);
    } catch (error) {
      notify('error', 'Failed to load audio', `${error}`);

      appDraggablesStore.audio = false;
      audioIsLoadingRef.value = false;
    }
  };

  watch(audioBlockRef, loadAudioFile);

  return {
    selectAudioBlock: selectAudioBlock,
  };
}
