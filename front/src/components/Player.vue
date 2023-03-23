<script lang="ts" setup="">
import {AddOutline, CloseOutline, RemoveOutline} from '@vicons/ionicons5';
import audioBufferSlice from 'audiobuffer-slice';
import colormap from 'colormap';
import dayjs from 'dayjs';
import {NButton, NIcon} from 'naive-ui';
import {computed, onUnmounted, ref, watch} from 'vue';
import WavEncoder from 'wav-encoder';
import WaveSurfer from 'wavesurfer.js';
import Cursor from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.js';
import Spectrogram from 'wavesurfer.js/dist/plugin/wavesurfer.spectrogram.js';
import {useStorage} from '../composables/useStorage';
import {SPECTROGRAM, WAVEFORM} from '../constants';
import {playerStore} from '../store/player.store';
import {selectionStore} from '../store/selection.store';

const {
  getSettings,
  getBands,
} = await useStorage();
const settings = await getSettings();
const bands = await getBands();

const containerRef = ref<HTMLDivElement>();

const frequencies = computed(() => {
  if (!selectionStore.band) {
    return;
  }
  const min = bands[selectionStore.band][0];
  const max = bands[selectionStore.band][1];

  return {
    min,
    max,
  };
});

function close() {
  containerRef.value?.classList.remove('open');
  containerRef.value?.classList.add('close');
  playerStore.src = null;
  playerStore.timestamp = null;
  ws.value.empty();
}

function open() {
  containerRef.value?.classList.remove('close');
  containerRef.value?.classList.add('open');
}

const src = computed(() => {
  if (playerStore.src === null) {
    return null;
  }

  return `${settings.audio_host}${playerStore.src}`;
});

watch(playerStore, async () => {
  if (playerStore.src === null) {
    close();
    return;
  }

  open();
});

const wsRef = ref<HTMLDivElement>();
const sRef = ref<HTMLDivElement>();

const colors = colormap({
  colormap: playerStore.colorMap,
  nshades: 256,
  format: 'float',
});

const ws = computed(() => {
  if (!frequencies.value) {
    return;
  }

  if (ws.value) {
    ws.value.destroy();
  }

  return WaveSurfer.create({
    container: wsRef.value,
    scrollParent: false,
    barHeight: WAVEFORM.default,
    normalize: false,
    height: 48,
    volume: 1,
    plugins: [
      Spectrogram.create({
        container: sRef.value,
        labels: true,
        colorMap: colors,
        height: 192,
        fftSamples: SPECTROGRAM.fftSize,
        frequencyMin: frequencies.value.min,
        frequencyMax: frequencies.value.max,
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
  });
});

const audioContext = new AudioContext();

async function load() {
  if (!src.value || !selectionStore.band || !selectionStore.integration || !playerStore.timestamp) {
    return;
  }

  const response = await fetch(src.value);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

  const {getGroupIndexAndSeconds} = await useStorage();

  const [groupIndex, seconds] = await getGroupIndexAndSeconds(
    selectionStore.band,
    selectionStore.integration,
    playerStore.timestamp,
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

      ws.value.loadBlob(blob);

      ws.value.on('seek', () => {
        if (ws.value.isPlaying()) {
          return;
        }

        ws.value.play();
      });

      ws.value.on('ready', () => {
        if (!selectionStore.band) {
          return;
        }

        const frequencies = bands[selectionStore.band];

        const lowShelf = ws.value.backend.ac.createBiquadFilter();
        lowShelf.type = 'lowshelf';
        lowShelf.gain.value = -60;
        lowShelf.frequency.value = frequencies[0];

        const highShelf = ws.value.backend.ac.createBiquadFilter();
        highShelf.type = 'highshelf';
        highShelf.gain.value = -60;
        highShelf.frequency.value = frequencies[1];

        ws.value.backend.setFilters([lowShelf, highShelf]);

        ws.value.play();
      });
    });
  });
}

watch(src, load);

function handleWaveIncrease() {
  if (ws.value.params.barHeight + WAVEFORM.step > WAVEFORM.max) {
    ws.value.params.barHeight = WAVEFORM.max;
  } else {
    ws.value.params.barHeight += WAVEFORM.step;
  }

  ws.value.drawBuffer();
}

function handleWaveDecrease() {
  if (ws.value.params.barHeight - WAVEFORM.step < WAVEFORM.min) {
    ws.value.params.barHeight = WAVEFORM.min;
  } else {
    ws.value.params.barHeight -= WAVEFORM.step;
  }

  ws.value.drawBuffer();
}

onUnmounted(close);
</script>

<template>
  <div ref="containerRef" class="container close">
    <div class="details">
      <span class="src">{{ playerStore.src }}</span>
      <span v-if="selectionStore.band">
        {{ frequencies?.min }} - {{ frequencies?.max }} Hz
      </span>
      <span>{{ dayjs(playerStore.timestamp) }}</span>
      <span>{{ selectionStore.integration }}</span>
    </div>

    <div class="close-button">
      <n-button size="tiny" @click="close">
        <n-icon>
          <close-outline />
        </n-icon>
      </n-button>
    </div>

    <div ref="wsRef" class="wave" />

    <div class="volume-button">
      <n-button size="tiny" @click="handleWaveIncrease">
        <n-icon>
          <add-outline />
        </n-icon>
      </n-button>
      <n-button size="tiny" @click="handleWaveDecrease">
        <n-icon>
          <remove-outline />
        </n-icon>
      </n-button>
    </div>

    <div ref="sRef" class="spectro" />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto 1fr;

  position: fixed;
  bottom: 1rem;

  max-height: 19rem;
  width: 40rem;

  z-index: 90;

  padding: 0.6rem 0.9rem;
  overflow-y: auto;

  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.1);

  transition: width 120ms ease-in-out,
  border 120ms ease-in-out,
  background-color 120ms ease-in-out;

  backdrop-filter: blur(5px);
}

.details {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr 1fr;
}

.src {
  overflow: hidden;
}

.close-button {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 2rem;
}

.volume-button {
  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;
}

$time: 800ms;

.open {
  animation: slideIn $time;
}

.close {
  animation: slideOut $time;
}

.open, .close {
  visibility: visible;
}

.open:not(:active), .close:not(:active) {
  animation-fill-mode: forwards;
}

.wave {
  overflow: hidden;
}

@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }

  100% {
    opacity: 1;
    transform: translateY(0%);
  }
}

@keyframes slideOut {
  0% {
    opacity: 1;
    transform: translateY(0%);
  }

  100% {
    opacity: 0;
    transform: translateY(100%);
  }
}
</style>
