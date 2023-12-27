<script lang="ts" setup>
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
import {NButton, NGi, NGrid, NIcon, NSlider, NTag, NTooltip} from 'naive-ui';
import speedToPercentage from 'speed-to-percentage';
import speedToSemitones from 'speed-to-semitones';
import {useAudioComponent} from 'src/components/Audio/useAudioComponent';
import {useAudioContext} from 'src/components/Audio/useAudioContext';
import {useWaveSurfer} from 'src/components/Audio/useWaveSurfer';
import {FFT_SIZE, PLAYBACK_RATE, WAVE} from 'src/constants';
import {aggregatedSitesRef} from 'src/hooks/useAggregatedSites';
import {audioHostRef} from 'src/hooks/useAudioHost';
import {bandRef} from 'src/hooks/useBands';
import {integrationRef} from 'src/hooks/useIntegrations';
import {settingsRef} from 'src/hooks/useStorageSettings';
import {triggerWavDownload} from 'src/utils/trigger-wav-download';
import {onUnmounted, ref, watch} from 'vue';
import {encodeWavFileFromAudioBuffer} from 'wav-file-encoder';

import AppDraggable from '../AppDraggable/AppDraggable.vue';
import {appDraggablesStore} from '../AppDraggable/appDraggablesStore';
import {useNotification} from '../AppNotification/useNotification';
import {useDetails} from '../Details/useDetails';
import {clickedRef} from '../Scatter/useScatterClick';
import {currentAudioFileRef} from './useAudio';

/**
 * State
 */

const {notify} = useNotification();
const isPlayingRef = ref<boolean>(false);
const fftSizeRef = ref<number>(FFT_SIZE.default);
const {intervalDateRef} = useDetails();

const {audioContextRef} = useAudioContext();
const {containerRef, waveformContainerRef, spectrogramContainerRef} =
  useAudioComponent();
const {waveSurferRef: wsRef} = useWaveSurfer({
  audioContextRef: audioContextRef,
  waveformContainerRef: waveformContainerRef,
  spectrogramContainerRef: spectrogramContainerRef,
});

function close() {
  if (containerRef.value === null) {
    return;
  }

  containerRef.value.classList.remove('open');
  containerRef.value.classList.add('close');
}

async function load() {
  try {
    if (
      integrationRef.value === null ||
      currentAudioFileRef.value === null ||
      wsRef.value === null ||
      audioContextRef.value === null
    ) {
      return;
    }

    const src = `${audioHostRef.value}${currentAudioFileRef.value.file}`;

    const response = await fetch(src);

    if (!response.ok) {
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

    const start = currentAudioFileRef.value.fileStart;
    const end = start + integrationRef.value.seconds * 1000;

    audioBufferSlice(audioBuffer, start, end, handleAudioSlice);
  } catch (error) {
    appDraggablesStore.audio = false;
    notify('error', 'Failed to load audio', `${error}`);
    console.error(error);
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
    wsRef.value === null ||
    bandRef.value === null ||
    audioContextRef.value === null
  ) {
    return;
  }

  // const ac = wsRef.value.backend.getAudioContext();
  const ac = audioContextRef.value;

  const lowShelf = ac.createBiquadFilter();
  lowShelf.type = 'lowshelf';
  lowShelf.gain.value = -60;
  lowShelf.frequency.value = bandRef.value.low;

  const highShelf = ac.createBiquadFilter();
  highShelf.type = 'highshelf';
  highShelf.gain.value = -60;
  highShelf.frequency.value = bandRef.value.high;

  wsRef.value.backend.setFilters([lowShelf, highShelf]);
  playPause();
}

async function handleDownload() {
  if (wsRef.value === null || audioContextRef.value === null) {
    return;
  }

  // @ts-expect-error: 2339
  // noinspection TypeScriptUnresolvedReference
  const buffer = wsRef.value.backend.buffer as AudioBuffer | null;

  if (buffer === null || currentAudioFileRef.value === null) {
    return;
  }

  const wav = encodeWavFileFromAudioBuffer(buffer, 0);
  const blob = new Blob([wav], {type: 'audio/wav'});
  const name = `${currentAudioFileRef.value.file} - ${currentAudioFileRef.value.start} - NO FILTER.wav`;

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

  playPause();
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

const playPause = () => {
  if (wsRef.value === null) {
    return;
  }

  wsRef.value.playPause();
  isPlayingRef.value = wsRef.value.isPlaying();
};

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
  playPause();
});

/**
 * Lifecycles
 */

onUnmounted(close);
watch(currentAudioFileRef, load);
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
              @click="playPause"
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
        :cols="1"
        class="grid"
        x-gap="12"
      >
        <n-gi>
          <n-tag
            :bordered="false"
            size="small"
          >
            File
          </n-tag>

          {{ currentAudioFileRef.value?.file }}
        </n-gi>
      </n-grid>

      <n-grid
        v-if="aggregatedSitesRef.value !== null && clickedRef.value !== null"
        :cols="1"
        class="grid"
        x-gap="12"
      >
        <n-gi>
          <n-tag
            :bordered="false"
            size="small"
          >
            Site
          </n-tag>

          {{ aggregatedSitesRef.value[clickedRef.value].site }}
        </n-gi>
      </n-grid>

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
            Interval Index
          </n-tag>

          {{ clickedRef.value }}
        </n-gi>
        <n-gi>
          <n-tag
            :bordered="false"
            size="small"
          >
            Interval Date
          </n-tag>

          {{ intervalDateRef }}
        </n-gi>
      </n-grid>

      <n-grid
        :cols="4"
        class="grid"
        x-gap="12"
      >
        <n-gi>
          <n-tag
            :bordered="false"
            size="small"
          >
            FFT Size
          </n-tag>

          {{ fftSizeRef }}
        </n-gi>
        <n-gi>
          <n-tag
            :bordered="false"
            size="small"
          >
            Speed %
          </n-tag>

          {{ speedToPercentage(playbackRateRef, 2) }}
        </n-gi>
        <n-gi>
          <n-tag
            :bordered="false"
            size="small"
          >
            Semitones
          </n-tag>

          {{ speedToSemitones(playbackRateRef, 2) }}
        </n-gi>
        <n-gi v-if="settingsRef.value !== null">
          <n-tag
            :bordered="false"
            size="small"
          >
            Hertz
          </n-tag>

          {{
            (
              settingsRef.value['expected_sample_rate'] * playbackRateRef
            ).toFixed()
          }}
        </n-gi>
      </n-grid>

      <div>
        <n-slider
          v-model:value="playbackRateRef"
          :max="PLAYBACK_RATE.max"
          :min="PLAYBACK_RATE.min"
          :step="PLAYBACK_RATE.step"
        />
      </div>

      <div ref="waveformContainerRef" />

      <div
        ref="spectrogramContainerRef"
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
