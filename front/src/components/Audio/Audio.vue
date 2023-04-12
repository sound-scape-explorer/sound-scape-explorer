<script lang="ts" setup="">
import {PauseOutline, PlayOutline, StopOutline, VolumeHighOutline, VolumeLowOutline} from '@vicons/ionicons5';
import audioBufferSlice from 'audiobuffer-slice';
import colormap from 'colormap';
import {NButton, NIcon} from 'naive-ui';
import {computed, onUnmounted, ref, unref, watch} from 'vue';
import WavEncoder from 'wav-encoder';
import WaveSurfer from 'wavesurfer.js';
import Cursor from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.js';
import Spectrogram from 'wavesurfer.js/dist/plugin/wavesurfer.spectrogram.js';
import type {WaveSurferParams} from 'wavesurfer.js/types/params';
import {SPECTROGRAM, WAVE} from '../../constants';
import {useStorage} from '../../hooks/useStorage';
import AppDraggable from '../AppDraggable/AppDraggable.vue';
import {appDraggablesStore} from '../AppDraggable/appDraggablesStore';
import AppSuspense from '../AppSuspense/AppSuspense.vue';
import {fileNameStore, fileTimestampStore} from '../Details/detailsStore';
import {scatterSelectedStore} from '../Scatter/scatterStore';
import {selectionStore} from '../Selection/selectionStore';
import {audioStore} from './audioStore';

const {
  getSettings,
  getBands,
} = await useStorage();

/**
 * State
 */

const settings = await getSettings();
const bands = await getBands();
const audioContext = new AudioContext();
const containerRef = ref<HTMLDivElement>();
const waveformContainerRef = ref<HTMLDivElement>();
const spectrogramContainerRef = ref<HTMLDivElement>();
const isPlaying = ref<boolean>(false);

const colors = computed(() => {
  const wsValue = unref(ws);

  if (wsValue) {
    wsValue.destroy();
  }

  return colormap({
    colormap: audioStore.colorMap,
    nshades: 256,
    format: 'float',
  });
});

const src = computed(() => {
  if (fileNameStore.path === null) {
    return;
  }

  return `${settings.audio_host}${fileNameStore.path}`;
});

const frequencies = computed(() => {
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

const ws = computed(() => {
  const f = unref(frequencies);

  if (!f) {
    return;
  }

  const {min, max} = f;
  const waveform = unref(waveformContainerRef);
  const spectrogram = unref(spectrogramContainerRef);

  if (!waveform || !spectrogram || !min || !max) {
    return;
  }

  // empty();

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
        colorMap: colors.value,
        height: 192,
        fftSamples: SPECTROGRAM.fftSize,
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
  empty();
}

function open() {
  containerRef.value?.classList.remove('close');
  containerRef.value?.classList.add('open');
}

function empty() {
  // ws.value && ws.value.empty();
}

async function load() {
  const srcValue = unref(src);
  const wsValue = unref(ws);

  if (
    !srcValue
    || !wsValue
    || !selectionStore.band
    || !selectionStore.integration
    || !fileTimestampStore.value
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

  audioBufferSlice(audioBuffer, start, end, (error: TypeError, slicedAudioBuffer: AudioBuffer) => {
    if (error) {
      console.error(error);
      return;
    }

    // create a new WAV file with the sliced buffer
    const wavData = {
      sampleRate: slicedAudioBuffer.sampleRate,
      channelData: [slicedAudioBuffer.getChannelData(0)], // use 2 channels for stereo sound
    };

    WavEncoder.encode(wavData).then((wav) => {
      const blob = new Blob([wav]);

      wsValue.loadBlob(blob);

      wsValue.on('seek', () => {
        if (wsValue.isPlaying()) {
          return;
        }

        wsValue.play();
        isPlaying.value = true;
      });

      wsValue.on('finish', () => {
        isPlaying.value = false;
      });

      wsValue.on('ready', () => {
        if (!selectionStore.band) {
          return;
        }

        const frequencies = bands[selectionStore.band];
        const ac = wsValue.backend.getAudioContext();

        // TODO: Replace with bandpass?

        const lowShelf = ac.createBiquadFilter();
        lowShelf.type = 'lowshelf';
        lowShelf.gain.value = -60;
        lowShelf.frequency.value = frequencies[0];

        const highShelf = ac.createBiquadFilter();
        highShelf.type = 'highshelf';
        highShelf.gain.value = -60;
        highShelf.frequency.value = frequencies[1];

        wsValue.backend.setFilters([lowShelf, highShelf]);

        wsValue.play();
        isPlaying.value = true;
      });
    });
  });
}

function handleVolumeUp() {
  const wsValue = unref(ws);

  if (!wsValue) {
    return;
  }

  if (wsValue.params.barHeight + WAVE.step > WAVE.max) {
    wsValue.params.barHeight = WAVE.max;
  } else {
    wsValue.params.barHeight += WAVE.step;

    const volume = wsValue.getVolume();
    wsValue.setVolume(volume + WAVE.step);
  }

  wsValue.drawBuffer();
}

function handleVolumeDown() {
  const wsValue = unref(ws);

  if (!wsValue) {
    return;
  }

  if (wsValue.params.barHeight - WAVE.step < WAVE.min) {
    wsValue.params.barHeight = WAVE.min;
  } else {
    wsValue.params.barHeight -= WAVE.step;

    const volume = wsValue.getVolume();
    wsValue.setVolume(volume - WAVE.step);
  }

  wsValue.drawBuffer();
}

function handlePlayPause() {
  const wsValue = unref(ws);

  if (!wsValue) {
    return;
  }

  wsValue.playPause();
  isPlaying.value = wsValue.isPlaying();
}

function handleStop() {
  const wsValue = unref(ws);

  if (!wsValue) {
    return;
  }

  wsValue.seekTo(0);
  wsValue.pause();
  isPlaying.value = false;
}

/**
 * Lifecycles
 */

onUnmounted(close);
watch(fileNameStore, load);
watch(audioStore, async () => {
  if (scatterSelectedStore.index === null) {
    close();
    return;
  }

  open();
});
</script>

<template>
  <AppDraggable :hide-separator="true" draggable-key="audio">
    <AppSuspense />

    <div v-if="scatterSelectedStore.index" class="player">
      <div class="volume buttons">
        <n-button size="tiny" @click="handleVolumeUp">
          <n-icon>
            <volume-high-outline />
          </n-icon>
        </n-button>
        <n-button size="tiny" @click="handleVolumeDown">
          <n-icon>
            <volume-low-outline />
          </n-icon>
        </n-button>

        <n-button size="tiny" @click="handlePlayPause">
          <n-icon>
            <pause-outline v-if="isPlaying" />
            <play-outline v-if="!isPlaying" />
          </n-icon>
        </n-button>
        <n-button size="tiny" @click="handleStop">
          <n-icon>
            <stop-outline />
          </n-icon>
        </n-button>
      </div>

      <div ref="waveformContainerRef" />
      <div ref="spectrogramContainerRef" class="spectrogram" />
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

  height: 0;

  margin-left: -2rem;
}

.spectrogram {
  pointer-events: none;
}
</style>
