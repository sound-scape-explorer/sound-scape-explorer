<script lang="ts" setup="">
import {
  AddOutline,
  ArrowDownOutline,
  PauseOutline,
  PlayOutline,
  RemoveOutline,
  StopOutline,
  VolumeHighOutline,
  VolumeLowOutline,
} from '@vicons/ionicons5';
import audioBufferSlice from 'audiobuffer-slice';
import colormap from 'colormap';
import {NButton, NGi, NGrid, NIcon, NTag, NTooltip} from 'naive-ui';
import {computed, onUnmounted, ref, watch} from 'vue';
import {encodeWavFileFromAudioBuffer} from 'wav-file-encoder';
import WaveSurfer from 'wavesurfer.js';
import Cursor from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.js';
import Spectrogram from 'wavesurfer.js/dist/plugin/wavesurfer.spectrogram.js';
import type {WaveSurferParams} from 'wavesurfer.js/types/params';
import {FFT_SIZE, WAVE} from '../../constants';
import {storage} from '../../storage/storage';
import {useStorage} from '../../storage/useStorage';
import {triggerBrowserDownload} from '../../utils/trigger-browser-download';
import AppDraggable from '../AppDraggable/AppDraggable.vue';
import {appDraggablesStore} from '../AppDraggable/appDraggablesStore';
import AppSuspense from '../AppSuspense/AppSuspense.vue';
import {
  fileNameStore,
  fileTimestampStore,
  groupIndexStore,
} from '../Details/detailsStore';
import {scatterSelectedStore} from '../Scatter/scatterStore';
import {selectionStore} from '../Selection/selectionStore';
import {audioStore} from './audioStore';

const {readGroupIndexFromTimestamp} = await useStorage();

/**
 * State
 */

const containerRef = ref<HTMLDivElement>();
const waveformRef = ref<HTMLDivElement>();
const spectrogramRef = ref<HTMLDivElement>();
const isPlayingRef = ref<boolean>(false);
const fftSizeRef = ref<number>(FFT_SIZE.default);

const audioContextRef = computed<OfflineAudioContext | null>(() => {
  const ws = wsRef.value;

  if (ws === null || storage.settings === null) {
    return;
  }

  return ws.backend.getAudioContext();
});

const colorsRef = computed(() => {
  const ws = wsRef.value;

  if (ws !== null) {
    // ws.destroy();
  }

  return colormap({
    colormap: audioStore.colorMap,
    nshades: 256,
    format: 'float',
  });
});

const srcRef = computed(() => {
  if (storage.settings === null || fileNameStore.path === null) {
    return null;
  }

  return `${storage.settings.audio_host}${fileNameStore.path}`;
});

const frequenciesRef = computed(() => {
  if (storage.bands === null || selectionStore.band === null) {
    return;
  }

  const min = storage.bands[selectionStore.band][0];
  const max = storage.bands[selectionStore.band][1];

  return {
    min: min,
    max: max,
  };
});

const wsRef = computed(() => {
  const frequencies = frequenciesRef.value;
  const waveform = waveformRef.value;
  const spectrogram = spectrogramRef.value;

  if (
    typeof waveform === 'undefined' ||
    typeof spectrogram === 'undefined' ||
    typeof frequencies === 'undefined'
  ) {
    return null;
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
        fftSamples: FFT_SIZE.default,
        frequencyMin: frequencies.min,
        frequencyMax: frequencies.max,
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
  const srcValue = srcRef.value;
  const ws = wsRef.value;
  const audioContext = audioContextRef.value;

  if (
    srcValue === null ||
    ws === null ||
    audioContext === null ||
    selectionStore.band === null ||
    selectionStore.integration === null ||
    fileTimestampStore.value === null
  ) {
    return;
  }

  appDraggablesStore.details = true;
  try {
    const response = await fetch(srcValue);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    const [groupIndex, seconds] = await readGroupIndexFromTimestamp(
      fileTimestampStore.value,
    );

    const start = groupIndex * seconds * 1000;
    const end = start + seconds * 1000;

    audioBufferSlice(audioBuffer, start, end, handleAudioSlice);

    appDraggablesStore.audio = true;
  } catch {
    appDraggablesStore.audio = false;
  }
}

function handleAudioSlice(error: TypeError, slicedAudioBuffer: AudioBuffer) {
  if (error) {
    console.error(error);
    return;
  }

  const ws = wsRef.value;

  if (ws === null) {
    return;
  }

  const wav = encodeWavFileFromAudioBuffer(slicedAudioBuffer, 0);

  const blob = new Blob([wav]);

  ws.loadBlob(blob);
  ws.on('seek', handleAudioSeek);
  ws.on('finish', handleAudioEnd);
  ws.on('ready', handleAudioReady);
}

function handleAudioEnd() {
  isPlayingRef.value = false;
}

function handleAudioReady() {
  const ws = wsRef.value;
  const audioContext = audioContextRef.value;

  if (
    selectionStore.band === null ||
    ws === null ||
    storage.bands === null ||
    audioContext === null
  ) {
    return;
  }

  const ac = ws.backend.getAudioContext();
  const frequencies = storage.bands[selectionStore.band];

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

async function handleDownload() {
  const ws = wsRef.value;
  const audioContext = audioContextRef.value;

  if (ws === null || audioContext === null) {
    return;
  }

  // noinspection TypeScriptUnresolvedReference
  const buffer = ws.backend.buffer as AudioBuffer | null;
  const fileName = fileNameStore.path;
  const groupIndex = groupIndexStore.value;

  if (
    buffer === null ||
    fileName === null ||
    groupIndex === null ||
    storage.settings === null
  ) {
    return;
  }

  const wav = encodeWavFileFromAudioBuffer(buffer, 0);
  const blob = new Blob([wav], {type: 'audio/wav'});
  const name = `${fileName} - ${groupIndex} - NO FILTER.wav`;
  triggerBrowserDownload(blob, name);
}

function handleVolumeUp() {
  const ws = wsRef.value;

  if (ws === null) {
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
  const ws = wsRef.value;

  if (ws === null) {
    return;
  }

  if (ws.isPlaying()) {
    return;
  }

  ws.play();
  isPlayingRef.value = true;
}

function handleVolumeDown() {
  const ws = wsRef.value;

  if (ws === null) {
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
  const ws = wsRef.value;

  if (ws === null) {
    return;
  }

  ws.playPause();
  isPlayingRef.value = ws.isPlaying();
}

function handleStop() {
  const ws = wsRef.value;

  if (ws === null) {
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

watch(fftSizeRef, () => {
  const ws = wsRef.value;

  if (ws === null) {
    return;
  }

  // noinspection JSConstantReassignment
  ws.spectrogram.fftSamples = fftSizeRef.value;
  ws.drawBuffer();
});

function handleSpectrogramIncrease() {
  if (fftSizeRef.value * 2 > FFT_SIZE.max) {
    return;
  }

  fftSizeRef.value *= 2;
}

function handleSpectrogramDecrease() {
  if (fftSizeRef.value / 2 < FFT_SIZE.min) {
    return;
  }

  fftSizeRef.value /= 2;
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
      v-if="scatterSelectedStore.index !== null"
      class="player"
    >
      <div class="volume buttons">
        <n-tooltip
          placement="left"
          trigger="hover"
        >
          <template #trigger>
            <n-button
              size="tiny"
              @click="handlePlayPause"
            >
              <n-icon>
                <pause-outline v-if="isPlayingRef" />
                <play-outline v-if="!isPlayingRef" />
              </n-icon>
            </n-button>
          </template>
          <span>{{ isPlayingRef ? 'Pause' : 'Play' }}</span>
        </n-tooltip>

        <n-tooltip
          placement="left"
          trigger="hover"
        >
          <template #trigger>
            <n-button
              size="tiny"
              @click="handleStop"
            >
              <n-icon>
                <stop-outline />
              </n-icon>
            </n-button>
          </template>
          <span>Stop</span>
        </n-tooltip>

        <n-tooltip
          placement="left"
          trigger="hover"
        >
          <template #trigger>
            <n-button
              size="tiny"
              @click="handleVolumeUp"
            >
              <n-icon>
                <volume-high-outline />
              </n-icon>
            </n-button>
          </template>
          <span>Volume Up</span>
        </n-tooltip>

        <n-tooltip
          placement="left"
          trigger="hover"
        >
          <template #trigger>
            <n-button
              size="tiny"
              @click="handleVolumeDown"
            >
              <n-icon>
                <volume-low-outline />
              </n-icon>
            </n-button>
          </template>
          <span>Volume Down</span>
        </n-tooltip>

        <n-tooltip
          placement="left"
          trigger="hover"
        >
          <template #trigger>
            <n-button
              size="tiny"
              @click="handleSpectrogramIncrease"
            >
              <n-icon>
                <add-outline />
              </n-icon>
            </n-button>
          </template>
          <span>FFT Size Up</span>
        </n-tooltip>

        <n-tooltip
          placement="left"
          trigger="hover"
        >
          <template #trigger>
            <n-button
              size="tiny"
              @click="handleSpectrogramDecrease"
            >
              <n-icon>
                <remove-outline />
              </n-icon>
            </n-button>
          </template>
          <span>FFT Size Down</span>
        </n-tooltip>

        <n-tooltip
          placement="left"
          trigger="hover"
        >
          <template #trigger>
            <n-button
              size="tiny"
              @click="handleDownload"
            >
              <n-icon>
                <arrow-down-outline />
              </n-icon>
            </n-button>
          </template>
          <span>Download</span>
        </n-tooltip>
      </div>

      <n-grid
        :cols="2"
        class="grid"
        x-gap="12"
      >
        <n-gi>
          <n-tag
            :bordered="false"
            size="small"
          >
            fftSize
          </n-tag>

          {{ fftSizeRef }}
        </n-gi>
      </n-grid>

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
