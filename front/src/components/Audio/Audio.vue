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
import {NButton, NGi, NGrid, NIcon, NTag, NTooltip, NSlider} from 'naive-ui';
import {computed, onUnmounted, ref, watch} from 'vue';
import {encodeWavFileFromAudioBuffer} from 'wav-file-encoder';
import WaveSurfer from 'wavesurfer.js';
import Cursor from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.js';
import Spectrogram from 'wavesurfer.js/dist/plugin/wavesurfer.spectrogram.js';
import type {WaveSurferParams} from 'wavesurfer.js/types/params';
import {FFT_SIZE, WAVE} from '../../constants';
import {triggerWavDownload} from '../../utils/trigger-wav-download';
import AppDraggable from '../AppDraggable/AppDraggable.vue';
import {appDraggablesStore} from '../AppDraggable/appDraggablesStore';
import {integrationRef} from 'src/hooks/useIntegration';
import {bandsRef} from 'src/hooks/useStorageBands';
import {useDetails} from '../Details/useDetails';
import {clickedRef} from '../Scatter/useScatterClick';
import {bandRef} from 'src/hooks/useBand';
import {PLAYBACK_RATE} from 'src/constants';
import speedToSemitones from 'speed-to-semitones';
import speedToPercentage from 'speed-to-percentage';
import {spectrogramColorRef} from './useAudioSpectrogramColor';
import {audioHostRef} from 'src/hooks/useAudioHost';
import {settingsRef} from 'src/hooks/useStorageSettings';

const {groupIndexRef, filenameRef} = useDetails();

/**
 * State
 */

const containerRef = ref<HTMLDivElement | null>(null);
const waveformRef = ref<HTMLDivElement | null>(null);
const spectrogramRef = ref<HTMLDivElement | null>(null);
const isPlayingRef = ref<boolean>(false);
const fftSizeRef = ref<number>(FFT_SIZE.default);

const audioContextRef = computed<AudioContext | null>(() => {
  if (settingsRef.value === null) {
    return null;
  }

  return new AudioContext({sampleRate: settingsRef.value.expected_sample_rate});
});

const wsRef = computed(() => {
  if (
    audioContextRef.value === null ||
    frequenciesRef.value === null ||
    waveformRef.value === null ||
    spectrogramRef.value === null
  ) {
    return null;
  }

  const params: WaveSurferParams = {
    audioContext: audioContextRef.value,
    container: waveformRef.value,
    scrollParent: false,
    barHeight: WAVE.default,
    normalize: false,
    height: 48,
    plugins: [
      Spectrogram.create({
        container: spectrogramRef.value,
        labels: true,
        colorMap: colorsRef.value,
        height: 192,
        fftSamples: FFT_SIZE.default,
        frequencyMin: frequenciesRef.value.min,
        frequencyMax: frequenciesRef.value.max,
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

const colorsRef = computed(() => {
  // TODO: Assess utility of this
  if (wsRef.value !== null) {
    console.log('destroy?');
    // ws.destroy();
  }

  return colormap({
    colormap: spectrogramColorRef.value,
    nshades: 256,
    format: 'float',
  });
});

const srcRef = computed(() => {
  if (audioHostRef.value === null || filenameRef.value === null) {
    return null;
  }

  return `${audioHostRef.value}${filenameRef.value}`;
});

const frequenciesRef = computed(() => {
  if (bandsRef.value === null || bandRef.value === null) {
    return null;
  }

  const min = bandsRef.value[bandRef.value][0];
  const max = bandsRef.value[bandRef.value][1];

  return {
    min: min,
    max: max,
  };
});

/**
 * Handlers
 */

function close() {
  if (containerRef.value === null) {
    return;
  }

  containerRef.value.classList.remove('open');
  containerRef.value.classList.add('close');
}

async function load() {
  if (
    clickedRef.value === null ||
    bandRef.value === null ||
    integrationRef.value === null ||
    groupIndexRef.value === null ||
    srcRef.value === null ||
    wsRef.value === null ||
    audioContextRef.value === null
  ) {
    return;
  }

  try {
    const response = await fetch(srcRef.value);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContextRef.value.decodeAudioData(
      arrayBuffer,
    );

    const seconds = integrationRef.value;

    const start = groupIndexRef.value * seconds * 1000;
    const end = start + seconds * 1000;

    audioBufferSlice(audioBuffer, start, end, handleAudioSlice);
  } catch {
    appDraggablesStore.audio = false;
  }
}

function handleAudioSlice(error: TypeError, slicedAudioBuffer: AudioBuffer) {
  if (error) {
    console.error(error);
    return;
  }

  if (wsRef.value === null) {
    return;
  }

  const wav = encodeWavFileFromAudioBuffer(slicedAudioBuffer, 0);

  const blob = new Blob([wav]);

  wsRef.value.loadBlob(blob);
  wsRef.value.on('seek', handleAudioSeek);
  wsRef.value.on('finish', handleAudioEnd);
  wsRef.value.on('ready', handleAudioReady);
}

function handleAudioEnd() {
  isPlayingRef.value = false;
}

function handleAudioReady() {
  if (
    bandsRef.value === null ||
    wsRef.value === null ||
    bandRef.value === null ||
    audioContextRef.value === null
  ) {
    return;
  }

  // const ac = wsRef.value.backend.getAudioContext();
  const ac = audioContextRef.value;
  const frequencies = bandsRef.value[bandRef.value];

  const lowShelf = ac.createBiquadFilter();
  lowShelf.type = 'lowshelf';
  lowShelf.gain.value = -60;
  lowShelf.frequency.value = frequencies[0];

  const highShelf = ac.createBiquadFilter();
  highShelf.type = 'highshelf';
  highShelf.gain.value = -60;
  highShelf.frequency.value = frequencies[1];

  wsRef.value.backend.setFilters([lowShelf, highShelf]);

  wsRef.value.play();
  isPlayingRef.value = true;
}

async function handleDownload() {
  if (wsRef.value === null || audioContextRef.value === null) {
    return;
  }

  // @ts-expect-error: 2339
  // noinspection TypeScriptUnresolvedReference
  const buffer = wsRef.value.backend.buffer as AudioBuffer | null;

  if (
    buffer === null ||
    filenameRef.value === null ||
    groupIndexRef.value === null
  ) {
    return;
  }

  const wav = encodeWavFileFromAudioBuffer(buffer, 0);
  const blob = new Blob([wav], {type: 'audio/wav'});
  const name = `${filenameRef.value} - ${groupIndexRef.value} - NO FILTER.wav`;

  triggerWavDownload(blob, name);
}

function handleVolumeUp() {
  if (wsRef.value === null) {
    return;
  }

  if (wsRef.value.params.barHeight + WAVE.step > WAVE.max) {
    wsRef.value.params.barHeight = WAVE.max;
  } else {
    wsRef.value.params.barHeight += WAVE.step;

    const volume = wsRef.value.getVolume();
    wsRef.value.setVolume(volume + WAVE.step);
  }

  wsRef.value.drawBuffer();
}

function handleAudioSeek() {
  if (wsRef.value === null) {
    return;
  }

  if (wsRef.value.isPlaying()) {
    return;
  }

  wsRef.value.play();
  isPlayingRef.value = true;
}

function handleVolumeDown() {
  if (wsRef.value === null) {
    return;
  }

  if (wsRef.value.params.barHeight - WAVE.step < WAVE.min) {
    wsRef.value.params.barHeight = WAVE.min;
  } else {
    wsRef.value.params.barHeight -= WAVE.step;

    const volume = wsRef.value.getVolume();
    wsRef.value.setVolume(volume - WAVE.step);
  }

  wsRef.value.drawBuffer();
}

function handlePlayPause() {
  if (wsRef.value === null) {
    return;
  }

  wsRef.value.playPause();
  isPlayingRef.value = wsRef.value.isPlaying();
}

function handleStop() {
  if (wsRef.value === null) {
    return;
  }

  wsRef.value.seekTo(0);
  wsRef.value.pause();
  isPlayingRef.value = false;
}

watch(fftSizeRef, () => {
  if (wsRef.value === null) {
    return;
  }

  // @ts-expect-error: 2540
  // noinspection JSConstantReassignment
  wsRef.value.spectrogram.fftSamples = fftSizeRef.value;
  wsRef.value.drawBuffer();
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

const playbackRateRef = ref<number>(PLAYBACK_RATE.default);

watch(playbackRateRef, () => {
  if (wsRef.value === null) {
    return;
  }
  wsRef.value.pause();
  wsRef.value.setPlaybackRate(playbackRateRef.value);
  wsRef.value.play();
});

/**
 * Lifecycles
 */

onUnmounted(close);
watch(clickedRef, load);
</script>

<template>
  <AppDraggable
    :hide-separator="true"
    draggable-key="audio"
  >
    <div class="player">
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
        :cols="3"
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
        <n-gi>
          <n-tag
            :bordered="false"
            size="small"
          >
            speed %
          </n-tag>

          {{ speedToPercentage(playbackRateRef, 2) }}
        </n-gi>
        <n-gi>
          <n-tag
            :bordered="false"
            size="small"
          >
            semitones
          </n-tag>

          {{ speedToSemitones(playbackRateRef, 2) }}
        </n-gi>
      </n-grid>

      <div>
        <n-slider
          v-model:value="playbackRateRef"
          :min="PLAYBACK_RATE.min"
          :max="PLAYBACK_RATE.max"
          :step="PLAYBACK_RATE.step"
        />
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
