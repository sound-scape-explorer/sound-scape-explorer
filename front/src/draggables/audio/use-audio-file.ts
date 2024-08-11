import {useAppNotification} from 'src/app/notification/use-app-notification';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useDraggables} from 'src/composables/use-draggables';
import {useIntegrationSelection} from 'src/composables/use-integration-selection';
import type {BlockDetails} from 'src/composables/use-storage-aggregated-interval-details';
import {useStorageAudioHost} from 'src/composables/use-storage-audio-host';
import {useAudioContext} from 'src/draggables/audio/use-audio-context';
import {useWavesurferLoader} from 'src/draggables/audio/use-wavesurfer-loader';
import {getBitDepthFromWav} from 'src/utils/get-bit-depth-from-wav';
import {ref} from 'vue';
import {encodeWavFileFromAudioBuffer} from 'wav-file-encoder';

const block = ref<BlockDetails | null>(null);
const duration = ref<number>(0); // seconds
const bitDepth = ref<number | null>(null);
const isLoading = ref<boolean>(false);

export function useAudioFile() {
  const {notify} = useAppNotification();
  const {loadBlob} = useWavesurferLoader();
  const {audioHost} = useStorageAudioHost();
  const {open, close} = useDraggables();
  const {integration} = useIntegrationSelection();
  const {context} = useAudioContext();
  const {isAudioAutoOpen} = useClientSettings();

  const select = (newBlock: BlockDetails | null) => {
    if (isLoading.value) {
      return;
    }

    if (newBlock === null) {
      block.value = null;
      return;
    }

    if (isAudioAutoOpen.value) {
      open('audio');
    }

    if (block.value === newBlock) {
      return;
    }

    block.value = newBlock;
  };

  // todo: rename to preload? or loadFile
  const load = async () => {
    if (isLoading.value) {
      return;
    }

    try {
      if (
        integration.value === null ||
        block.value === null ||
        context.value === null ||
        audioHost.value === null
      ) {
        return;
      }

      isLoading.value = true;

      const start = block.value.fileStart;
      const end = start + integration.value.seconds * 1000;

      let formattedHost = audioHost.value;
      if (!formattedHost.endsWith('/')) {
        formattedHost = `${formattedHost}/`;
      }

      const url = new URL(`${formattedHost}get`);
      url.searchParams.append('file', block.value.file);
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
      bitDepth.value = getBitDepthFromWav(arrayBuffer);

      if (arrayBuffer.byteLength === 0) {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error('empty audio data');
      }

      const audioBuffer = await context.value.decodeAudioData(arrayBuffer);

      isLoading.value = false;
      duration.value = audioBuffer.duration;

      const wav = encodeWavFileFromAudioBuffer(audioBuffer, 0);
      const blob = new Blob([wav]);
      loadBlob(blob);
    } catch (error) {
      notify('error', 'audio-file', `${error}`);

      close('audio');
      isLoading.value = false;
    }
  };

  return {
    block: block,
    duration: duration,
    bitDepth: bitDepth,
    select: select,
    isLoading: isLoading,
    load: load,
  };
}
