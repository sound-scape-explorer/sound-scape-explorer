import {useAppNotification} from 'src/app/notification/app-notification';
import {useDraggables} from 'src/composables/draggables';
import {useIntegrationSelection} from 'src/composables/integration-selection';
import type {BlockDetails} from 'src/composables/storage-aggregated-interval-details';
import {useStorageAudioHost} from 'src/composables/storage-audio-host';
import {useAudioContext} from 'src/draggables/audio/audio-context';
import {useWavesurferLoader} from 'src/draggables/audio/wavesurfer-loader';
import {getBitDepthFromWav} from 'src/utils/get-bit-depth-from-wav';
import {ref, watch} from 'vue';
import {encodeWavFileFromAudioBuffer} from 'wav-file-encoder';

const block = ref<BlockDetails | null>(null);
const duration = ref<number>(0); // seconds
const bitDepth = ref<number | null>(null);
const isLoading = ref<boolean>(false);

export function useAudioFile() {
  const {notify} = useAppNotification();
  const {loadBlob} = useWavesurferLoader();
  const {audioHost} = useStorageAudioHost();
  const {openAudio, closeAudio} = useDraggables();
  const {integration} = useIntegrationSelection();
  const {context} = useAudioContext();

  const select = (newBlock: BlockDetails | null) => {
    if (isLoading.value) {
      return;
    }

    if (newBlock === null) {
      block.value = null;
      return;
    }

    openAudio();

    if (block.value === newBlock) {
      return;
    }

    block.value = newBlock;
  };

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

      closeAudio();
      isLoading.value = false;
    }
  };

  watch(block, load);

  return {
    block: block,
    duration: duration,
    bitDepth: bitDepth,
    select: select,
    isLoading: isLoading,
  };
}
