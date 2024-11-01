import {AudioBufferError} from 'src/common/Errors';
import {useAudioQuery} from 'src/composables/use-audio-query';
import {type BlockDetails} from 'src/composables/use-storage-aggregated-interval-details';
import {TIMEOUT} from 'src/constants';
import {useAudioContext} from 'src/draggables/audio/use-audio-context';
import {useWavesurferLoader} from 'src/draggables/audio/use-wavesurfer-loader';
import {getBitDepthFromWav} from 'src/utils/audio';
import {ref} from 'vue';
import {encodeWavFileFromAudioBuffer} from 'wav-file-encoder';

const block = ref<BlockDetails | null>(null);
const duration = ref<number>(0); // seconds
const bitDepth = ref<number | null>(null);
const isLoading = ref<boolean>(false);

export function useAudioFile() {
  const {loadSlice} = useWavesurferLoader();
  const {context} = useAudioContext();
  const {queryFile} = useAudioQuery();

  const select = (newBlock: BlockDetails | null) => {
    if (isLoading.value) {
      return;
    }

    if (newBlock === null) {
      block.value = null;
      return;
    }

    if (block.value === newBlock) {
      return;
    }

    block.value = newBlock;
  };

  const loadFile = async () => {
    if (isLoading.value || block.value === null || context.value === null) {
      return;
    }

    isLoading.value = true;
    const arrayBuffer = await queryFile(block.value);
    bitDepth.value = getBitDepthFromWav(arrayBuffer);

    if (arrayBuffer.byteLength === 0) {
      throw new AudioBufferError('empty audio');
    }

    const audioBuffer = await context.value.decodeAudioData(arrayBuffer);
    duration.value = audioBuffer.duration;
    const wav = encodeWavFileFromAudioBuffer(audioBuffer, 0);
    const blob = new Blob([wav]);
    loadSlice(blob);

    // INFO: dummy timeout for waiting waveform and spectrogram renders
    setTimeout(() => {
      isLoading.value = false;
    }, TIMEOUT / 2);
  };

  return {
    block: block,
    duration: duration,
    bitDepth: bitDepth,
    select: select,
    isLoading: isLoading,
    loadFile: loadFile,
  };
}
