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
import {NButton, NGi, NGrid, NIcon, NSlider, NTag, NTooltip} from 'naive-ui';
import {
  fftSizeRef,
  useAudioComponent,
} from 'src/components/Audio/useAudioComponent';
import {useAudioContext} from 'src/components/Audio/useAudioContext';
import {useAudioDownload} from 'src/components/Audio/useAudioDownload';
import {
  audioRateHumanReadableRef,
  audioRateRef,
  useAudioRate,
} from 'src/components/Audio/useAudioRate';
import {
  audioIsPlayingRef,
  useAudioTransport,
} from 'src/components/Audio/useAudioTransport';
import {useWaveSurfer} from 'src/components/Audio/useWaveSurfer';
import {PLAYBACK_RATE} from 'src/constants';
import {aggregatedSitesRef} from 'src/hooks/useAggregatedSites';
import {settingsRef} from 'src/hooks/useStorageSettings';
import {onUnmounted} from 'vue';

import AppDraggable from '../AppDraggable/AppDraggable.vue';
import {useDetails} from '../Details/useDetails';
import {clickedRef} from '../Scatter/useScatterClick';
import {audioBlockRef} from './useAudioFile';

const {intervalDateRef} = useDetails();

const {
  containerRef,
  waveformContainerRef,
  spectrogramContainerRef,
  increaseFftSize,
  decreaseFftSize,
} = useAudioComponent();

useAudioContext();

const {increaseVolume, decreaseVolume} = useWaveSurfer({
  waveformContainerRef: waveformContainerRef,
  spectrogramContainerRef: spectrogramContainerRef,
});

const {togglePlayPause, stop} = useAudioTransport();

useAudioRate({
  togglePlayPause: togglePlayPause,
});

const {downloadAudio} = useAudioDownload();

function close() {
  if (containerRef.value === null) {
    console.log('b');
    return;
  }

  console.log('b');
  containerRef.value.classList.remove('open');
  containerRef.value.classList.add('close');
}

onUnmounted(close);
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
              @click="togglePlayPause"
            >
              <n-icon>
                <pause-outline v-if="audioIsPlayingRef.value" />
                <play-outline v-if="!audioIsPlayingRef.value" />
              </n-icon>
            </n-button>
          </template>
          <span>{{ audioIsPlayingRef.value ? 'Pause' : 'Play' }}</span>
        </n-tooltip>

        <n-tooltip
          placement="left"
          trigger="hover"
        >
          <template #trigger>
            <n-button
              size="tiny"
              @click="stop"
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
              @click="increaseVolume"
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
              @click="decreaseVolume"
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
              @click="increaseFftSize"
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
              @click="decreaseFftSize"
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
              @click="downloadAudio"
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

          {{ audioBlockRef.value?.file }}
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

          {{ fftSizeRef.value }}
        </n-gi>
        <n-gi>
          <n-tag
            :bordered="false"
            size="small"
          >
            Speed %
          </n-tag>

          {{ audioRateHumanReadableRef.value.percentage }}
        </n-gi>
        <n-gi>
          <n-tag
            :bordered="false"
            size="small"
          >
            Semitones
          </n-tag>

          {{ audioRateHumanReadableRef.value.semitones }}
        </n-gi>
        <n-gi v-if="settingsRef.value !== null">
          <n-tag
            :bordered="false"
            size="small"
          >
            Hertz
          </n-tag>

          {{ audioRateHumanReadableRef.value.hertz }}
        </n-gi>
      </n-grid>

      <div>
        <n-slider
          v-model:value="audioRateRef.value"
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
