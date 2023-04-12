<script lang="ts" setup="">
import {
  AddOutline,
  PauseOutline,
  PlayOutline,
  RemoveOutline,
  StopOutline,
  VolumeHighOutline,
  VolumeLowOutline,
} from '@vicons/ionicons5';
import audioBufferSlice from 'audiobuffer-slice';
import colormap from 'colormap';
import {NButton, NIcon} from 'naive-ui';
import {computed, onUnmounted, ref, unref, watch} from 'vue';
import WavEncoder from 'wav-encoder';
import WaveSurfer from 'wavesurfer.js';
import Cursor from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.js';
import Spectrogram from 'wavesurfer.js/dist/plugin/wavesurfer.spectrogram.js';
import type {WaveSurferParams} from 'wavesurfer.js/types/params';
import {FFT_SIZE, WAVE} from '../../constants';
import {useStorage} from '../../hooks/useStorage';
import AppDraggable from '../AppDraggable/AppDraggable.vue';
import {appDraggablesStore} from '../AppDraggable/appDraggablesStore';
import AppSuspense from '../AppSuspense/AppSuspense.vue';
import {fileNameStore, fileTimestampStore} from '../Details/detailsStore';
import {scatterSelectedStore} from '../Scatter/scatterStore';
import {selectionStore} from '../Selection/selectionStore';
import {audioStore} from './audioStore';

const {getSettings, getBands} = await useStorage();

/**
 * State
 */

const settings = await getSettings();
const bands = await getBands();
const audioContext = new AudioContext();
const containerRef = ref<HTMLDivElement>();
const waveformRef = ref<HTMLDivElement>();
const spectrogramRef = ref<HTMLDivElement>();
const isPlayingRef = ref<boolean>(false);
const fftSizeRef = ref<number>(FFT_SIZE.default);

const colorsRef = computed(() => {
  const ws = unref(wsRef);

  if (ws) {
    ws.destroy();
  }

  return colormap({
    colormap: audioStore.colorMap,
    nshades: 256,
    format: 'float',
  });
});

const srcRef = computed(() => {
  if (fileNameStore.path === null) {
    return;
  }

  return `${settings.audio_host}${fileNameStore.path}`;
});

const frequenciesRef = computed(() => {
  if (!selectionStore.band) {
    return;
  }

  const min = bands[selectionStore.band][0];
  const max = bands[selectionStore.band][1];

  return {
    min: min,
    max: max,
  };
});

const wsRef = computed(() => {
  const frequencies = unref(frequenciesRef);

  if (!frequencies) {
    return;
  }

  const {min, max} = frequencies;
  const waveform = unref(waveformRef);
  const spectrogram = unref(spectrogramRef);
  const fftSize = unref(fftSizeRef);

  if (!waveform || !spectrogram || !min || !max || !fftSize) {
    return;
  }

  const params: WaveSurferParams = {
    container: waveform,
    scrollParent: false,
    barHeight: WAVE.default,
    normalize: false,
    height: 48,
    // volume: 1,
    plugins: [
      Spectrogram.create({
        container: spectrogram,
        labels: true,
        colorMap: colorsRef.value,
        height: 192,
        fftSamples: fftSize,
        frequencyMin: min,
        frequencyMax: max,
      }),
      Cursor.create({
        showTime: true,
        opacity: 1,
        customShowTimeStyle: {
          'background-color': '#000',
          'color': '#fff',
          'padding': '2px',
          'font-size': '10px',
        },
      }),
    ],
  };

  return WaveSurfer.create(params);
});

/**
 * Handlers
 */

function close() {
  containerRef.value?.classList.remove('open');
  containerRef.value?.classList.add('close');
}

function open() {
  containerRef.value?.classList.remove('close');
  containerRef.value?.classList.add('open');
}

async function load() {
  const srcValue = unref(srcRef);
  const ws = unref(wsRef);

  if (
    !srcValue ||
    !ws ||
    !selectionStore.band ||
    !selectionStore.integration ||
    !fileTimestampStore.value
  ) {
    return;
  }

  appDraggablesStore.details = true;
  appDraggablesStore.audio = true;

  const response = await fetch(srcValue);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

  const {getGroupIndexAndSeconds} = await useStorage();

  const [groupIndex, seconds] = await getGroupIndexAndSeconds(
    selectionStore.band,
    selectionStore.integration,
    fileTimestampStore.value,
  );

  const start = groupIndex * seconds * 1000;
  const end = start + seconds * 1000;

  audioBufferSlice(audioBuffer, start, end, handleAudioSlice);
}

function handleAudioSlice(error: TypeError, slicedAudioBuffer: AudioBuffer) {
  if (error) {
    console.error(error);
    return;
  }

  const ws = unref(wsRef);

  if (!ws) {
    return;
  }

  // create a new WAV file with the sliced buffer
  const wavData = {
    sampleRate: slicedAudioBuffer.sampleRate,
    channelData: [slicedAudioBuffer.getChannelData(0)], // use 2 channels for stereo sound
  };

  WavEncoder.encode(wavData).then((wav) => {
    const blob = new Blob([wav]);

    ws.loadBlob(blob);
    ws.on('seek', handleAudioSeek);
    ws.on('finish', handleAudioEnd);
    ws.on('ready', handleAudioReady);
  });
}

function handleAudioEnd() {
  isPlayingRef.value = false;
}

function handleAudioReady() {
  const ws = unref(wsRef);

  if (!selectionStore.band || !ws) {
    return;
  }

  const frequencies = bands[selectionStore.band];
  const ac = ws.backend.getAudioContext();

  const lowShelf = ac.createBiquadFilter();
  lowShelf.type = 'lowshelf';
  lowShelf.gain.value = -60;
  lowShelf.frequency.value = frequencies[0];

  const highShelf = ac.createBiquadFilter();
  highShelf.type = 'highshelf';
  highShelf.gain.value = -60;
  highShelf.frequency.value = frequencies[1];

  ws.backend.setFilters([lowShelf, highShelf]);

  ws.play();
  isPlayingRef.value = true;
}

function handleVolumeUp() {
  const ws = unref(wsRef);

  if (!ws) {
    return;
  }

  if (ws.params.barHeight + WAVE.step > WAVE.max) {
    ws.params.barHeight = WAVE.max;
  } else {
    ws.params.barHeight += WAVE.step;

    const volume = ws.getVolume();
    ws.setVolume(volume + WAVE.step);
  }

  ws.drawBuffer();
}

function handleAudioSeek() {
  const ws = unref(wsRef);

  if (!ws) {
    return;
  }

  if (ws.isPlaying()) {
    return;
  }

  ws.play();
  isPlayingRef.value = true;
}

function handleVolumeDown() {
  const ws = unref(wsRef);

  if (!ws) {
    return;
  }

  if (ws.params.barHeight - WAVE.step < WAVE.min) {
    ws.params.barHeight = WAVE.min;
  } else {
    ws.params.barHeight -= WAVE.step;

    const volume = ws.getVolume();
    ws.setVolume(volume - WAVE.step);
  }

  ws.drawBuffer();
}

function handlePlayPause() {
  const ws = unref(wsRef);

  if (!ws) {
    return;
  }

  ws.playPause();
  isPlayingRef.value = ws.isPlaying();
}

function handleStop() {
  const ws = unref(wsRef);

  if (!ws) {
    return;
  }

  ws.seekTo(0);
  ws.pause();
  isPlayingRef.value = false;
}

async function handleAudioStoreChange() {
  if (scatterSelectedStore.index === null) {
    close();
    return;
  }

  open();
}

function handleSpectrogramIncrease() {
  const ws = unref(wsRef);

  if (!ws) {
    return;
  }

  if (ws.spectrogram.fftSamples === FFT_SIZE.max) {
    return;
  }

  if (ws.spectrogram.fftSamples > FFT_SIZE.max) {
    // noinspection JSConstantReassignment
    ws.spectrogram.fftSamples = FFT_SIZE.max;
  }

  // noinspection JSConstantReassignment
  ws.spectrogram.fftSamples *= 2;
  ws.drawBuffer();
}

function handleSpectrogramDecrease() {
  const ws = unref(wsRef);

  if (!ws) {
    return;
  }

  if (ws.spectrogram.fftSamples === FFT_SIZE.min) {
    return;
  }

  if (ws.spectrogram.fftSamples < FFT_SIZE.min) {
    // noinspection JSConstantReassignment
    ws.spectrogram.fftSamples = FFT_SIZE.min;
  }

  // noinspection JSConstantReassignment
  ws.spectrogram.fftSamples *= 0.5;
  ws.drawBuffer();
}

/**
 * Lifecycles
 */

onUnmounted(close);
watch(fileNameStore, load);
watch(audioStore, handleAudioStoreChange);
</script>

<template>
  <AppDraggable
    :hide-separator="true"
    draggable-key="audio"
  >
    <AppSuspense />

    <div
      v-if="scatterSelectedStore.index"
      class="player"
    >
      <div class="volume buttons">
        <n-button
          size="tiny"
          @click="handleVolumeUp"
        >
          <n-icon>
            <volume-high-outline />
          </n-icon>
        </n-button>
        <n-button
          size="tiny"
          @click="handleVolumeDown"
        >
          <n-icon>
            <volume-low-outline />
          </n-icon>
        </n-button>

        <n-button
          size="tiny"
          @click="handlePlayPause"
        >
          <n-icon>
            <pause-outline v-if="isPlayingRef" />
            <play-outline v-if="!isPlayingRef" />
          </n-icon>
        </n-button>
        <n-button
          size="tiny"
          @click="handleStop"
        >
          <n-icon>
            <stop-outline />
          </n-icon>
        </n-button>
        <n-button
          size="tiny"
          @click="handleSpectrogramIncrease"
        >
          <n-icon>
            <add-outline />
          </n-icon>
        </n-button>
        <n-button
          size="tiny"
          @click="handleSpectrogramDecrease"
        >
          <n-icon>
            <remove-outline />
          </n-icon>
        </n-button>
      </div>

      <div ref="waveformRef" />

      <div
        ref="spectrogramRef"
        class="spectrogram"
      />
    </div>
  </AppDraggable>
</template>

<style lang="scss" scoped>
.player {
  display: flex;
  flex-direction: column;

  width: 40rem;
}

.buttons {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;

  gap: 2px;

  height: 0;

  margin-left: -2rem;
}

.spectrogram {
  pointer-events: none;
}
</style>
