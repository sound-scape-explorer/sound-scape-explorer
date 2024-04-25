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
import {NGi, NGrid, NSlider, NTag} from 'naive-ui';
import AppDraggable from 'src/app/app-draggable.vue';
import {useDate} from 'src/composables/date';
import {useStorageAggregatedSites} from 'src/composables/storage-aggregated-sites';
import {useStorageSettings} from 'src/composables/storage-settings';
import {PLAYBACK_RATE} from 'src/constants';
import {
  fftSizeRef,
  useAudioComponent,
} from 'src/draggables/audio/audio-component';
import {useAudioContext} from 'src/draggables/audio/audio-context';
import {useAudioDownload} from 'src/draggables/audio/audio-download';
import {audioBlockRef, audioDurationRef} from 'src/draggables/audio/audio-file';
import {
  audioRateHumanReadableRef,
  audioRateRef,
  useAudioRate,
} from 'src/draggables/audio/audio-rate';
import {
  audioIsPlayingRef,
  useAudioTransport,
} from 'src/draggables/audio/audio-transport';
import AudioButton from 'src/draggables/audio/draggable-audio-button.vue';
import {useWavesurfer} from 'src/draggables/audio/wavesurfer';
import {useDetails} from 'src/draggables/details/details';
import {clickedRef} from 'src/scatter/scatter-click';

const {settings} = useStorageSettings();
const {aggregatedSites} = useStorageAggregatedSites();
const {intervalDateRef} = useDetails();
const {convertDateToIsoDate} = useDate();

const {
  waveformContainerRef,
  spectrogramContainerRef,
  increaseFftSize,
  decreaseFftSize,
} = useAudioComponent();

useAudioContext();

const {increaseVolume, decreaseVolume} = useWavesurfer({
  waveformContainerRef: waveformContainerRef,
  spectrogramContainerRef: spectrogramContainerRef,
});

const {togglePlayPause, stop} = useAudioTransport();

useAudioRate({
  togglePlayPause: togglePlayPause,
});

const {downloadAudio} = useAudioDownload();
</script>

<template>
  <AppDraggable
    :hide-separator="true"
    draggable-key="audio"
  >
    <div class="player">
      <div class="volume buttons">
        <AudioButton
          :alt="audioIsPlayingRef.value ? 'Pause' : 'Play'"
          :callback="togglePlayPause"
        >
          <pause-outline v-if="audioIsPlayingRef.value" />
          <play-outline v-if="!audioIsPlayingRef.value" />
        </AudioButton>

        <AudioButton
          :callback="stop"
          alt="Stop"
        >
          <stop-outline />
        </AudioButton>

        <AudioButton
          :callback="increaseVolume"
          alt="Volume Up"
        >
          <volume-high-outline />
        </AudioButton>

        <AudioButton
          :callback="decreaseVolume"
          alt="Volume Down"
        >
          <volume-low-outline />
        </AudioButton>

        <AudioButton
          :callback="increaseFftSize"
          alt="FFT Size Up"
        >
          <add-outline />
        </AudioButton>

        <AudioButton
          :callback="decreaseFftSize"
          alt="FFT Size Down"
        >
          <remove-outline />
        </AudioButton>

        <AudioButton
          :callback="downloadAudio"
          alt="Download"
        >
          <arrow-down-outline />
        </AudioButton>
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
        v-if="aggregatedSites !== null && clickedRef.value !== null"
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

          {{ aggregatedSites[clickedRef.value].site }}
        </n-gi>
        <n-gi>
          <n-tag
            :bordered="false"
            size="small"
          >
            Interval Date
          </n-tag>

          {{ intervalDateRef && convertDateToIsoDate(intervalDateRef) }}
        </n-gi>
      </n-grid>

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
            Interval Index
          </n-tag>

          {{ clickedRef.value }}
        </n-gi>
        <n-gi>
          <n-tag
            :bordered="false"
            size="small"
          >
            Audio duration
          </n-tag>

          {{ audioDurationRef.value.toFixed(2) }} seconds
        </n-gi>
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
        <n-gi v-if="settings !== null">
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
