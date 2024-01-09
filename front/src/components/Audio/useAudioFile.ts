import {reactive, watch} from 'vue';
import {encodeWavFileFromAudioBuffer} from 'wav-file-encoder';

import type {BlockDetails} from '../../hooks/useAggregatedIntervalDetails';
import {audioHostRef} from '../../hooks/useAudioHost';
import {integrationRef} from '../../hooks/useIntegrations';
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
        audioContextRef.value === null
      ) {
        return;
      }

      audioIsLoadingRef.value = true;

      const start = audioBlockRef.value.fileStart;
      const end = start + integrationRef.value.seconds * 1000;
      const endpoint = `${audioHostRef.value}get?file=${audioBlockRef.value.file}&start=${start}&end=${end}`;

      const response = await fetch(endpoint);

      if (response.status !== 200) {
        notify(
          'error',
          'Failed to fetch audio',
          `${response.status}: ${response.statusText}`,
        );
        console.error(
          'Failed to fetch audio:',
          response.status,
          response.statusText,
        );
        return;
      }

      const arrayBuffer = await response.arrayBuffer();

      if (arrayBuffer.byteLength === 0) {
        notify('error', 'Empty audio data', '');
        console.error('Empty audio data');
        return;
      }

      const audioBuffer = await audioContextRef.value.decodeAudioData(
        arrayBuffer,
      );

      audioIsLoadingRef.value = false;

      const wav = encodeWavFileFromAudioBuffer(audioBuffer, 0);
      const blob = new Blob([wav]);
      loadBlob(blob);
    } catch (error) {
      appDraggablesStore.audio = false;
      audioIsLoadingRef.value = false;

      notify('error', 'Failed to load audio', `${error}`);
      console.error(error);
    }
  };

  watch(audioBlockRef, loadAudioFile);

  return {
    selectAudioBlock: selectAudioBlock,
  };
}
