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
          <PauseOutline v-if="audioIsPlayingRef.value" />
          <PlayOutline v-if="!audioIsPlayingRef.value" />
        </AudioButton>

        <AudioButton
          :callback="stop"
          alt="Stop"
        >
          <StopOutline />
        </AudioButton>

        <AudioButton
          :callback="increaseVolume"
          alt="Volume Up"
        >
          <VolumeHighOutline />
        </AudioButton>

        <AudioButton
          :callback="decreaseVolume"
          alt="Volume Down"
        >
          <VolumeLowOutline />
        </AudioButton>

        <AudioButton
          :callback="increaseFftSize"
          alt="FFT Size Up"
        >
          <AddOutline />
        </AudioButton>

        <AudioButton
          :callback="decreaseFftSize"
          alt="FFT Size Down"
        >
          <RemoveOutline />
        </AudioButton>

        <AudioButton
          :callback="downloadAudio"
          alt="Download"
        >
          <ArrowDownOutline />
        </AudioButton>
      </div>

      <NGrid
        :cols="1"
        class="grid"
        x-gap="12"
      >
        <NGi>
          <NTag
            :bordered="false"
            size="small"
          >
            File
          </NTag>

          {{ audioBlockRef.value?.file }}
        </NGi>
      </NGrid>

      <NGrid
        v-if="aggregatedSites !== null && clickedRef.value !== null"
        :cols="1"
        class="grid"
        x-gap="12"
      >
        <NGi>
          <NTag
            :bordered="false"
            size="small"
          >
            Site
          </NTag>

          {{ aggregatedSites[clickedRef.value].site }}
        </NGi>
        <NGi>
          <NTag
            :bordered="false"
            size="small"
          >
            Interval Date
          </NTag>

          {{ intervalDateRef && convertDateToIsoDate(intervalDateRef) }}
        </NGi>
      </NGrid>

      <NGrid
        :cols="3"
        class="grid"
        x-gap="12"
      >
        <NGi>
          <NTag
            :bordered="false"
            size="small"
          >
            Interval Index
          </NTag>

          {{ clickedRef.value }}
        </NGi>
        <NGi>
          <NTag
            :bordered="false"
            size="small"
          >
            Audio duration
          </NTag>

          {{ audioDurationRef.value.toFixed(2) }} seconds
        </NGi>
        <NGi>
          <NTag
            :bordered="false"
            size="small"
          >
            FFT Size
          </NTag>

          {{ fftSizeRef.value }}
        </NGi>

        <NGi>
          <NTag
            :bordered="false"
            size="small"
          >
            Speed %
          </NTag>

          {{ audioRateHumanReadableRef.value.percentage }}
        </NGi>
        <NGi>
          <NTag
            :bordered="false"
            size="small"
          >
            Semitones
          </NTag>

          {{ audioRateHumanReadableRef.value.semitones }}
        </NGi>
        <NGi v-if="settings !== null">
          <NTag
            :bordered="false"
            size="small"
          >
            Hertz
          </NTag>

          {{ audioRateHumanReadableRef.value.hertz }}
        </NGi>
      </NGrid>

      <div>
        <NSlider
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
