<script lang="ts" setup>
import {NGi, NGrid, NSlider, NTag} from 'naive-ui';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import {useDate} from 'src/composables/use-date';
import {useStorageAggregatedSites} from 'src/composables/use-storage-aggregated-sites';
import {useStorageSettings} from 'src/composables/use-storage-settings';
import {PLAYBACK_RATE} from 'src/constants';
import DraggableAudioSidebar from 'src/draggables/audio/draggable-audio-sidebar.vue';
import {useAudioFourier} from 'src/draggables/audio/use-audio-component';
import {useAudioFile} from 'src/draggables/audio/use-audio-file';
import {useAudioFileWatcher} from 'src/draggables/audio/use-audio-file-watcher';
import {useAudioLock} from 'src/draggables/audio/use-audio-lock';
import {useAudioOpen} from 'src/draggables/audio/use-audio-open';
import {useAudioRate} from 'src/draggables/audio/use-audio-rate';
import {useAudioRateWatcher} from 'src/draggables/audio/use-audio-rate-watcher';
import {useDraggableAudio} from 'src/draggables/audio/use-draggable-audio';
import {useWavesurferMounter} from 'src/draggables/audio/use-wavesurfer-mounter';
import {useDetails} from 'src/draggables/details/use-details';

const {waveform, spectrogram} = useDraggableAudio();
const {size} = useAudioFourier();
const {settings} = useStorageSettings();
const {aggregatedSites} = useStorageAggregatedSites();
const {date} = useDetails();
const {convertDateToIsoDate} = useDate();
const {currentIntervalIndex} = useAudioOpen();
const {rate, readable} = useAudioRate();
const {lock, unlock} = useAudioLock();
const {block, duration} = useAudioFile();

useWavesurferMounter();
useAudioFileWatcher();
useAudioRateWatcher();
</script>

<template>
  <AppDraggable
    draggable-key="audio"
    suspense="scatterClick"
  >
    <div class="player">
      <DraggableAudioSidebar />

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

          {{ block?.file }}
        </NGi>
      </NGrid>

      <NGrid
        v-if="aggregatedSites !== null && currentIntervalIndex !== null"
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

          {{ aggregatedSites[currentIntervalIndex].site }}
        </NGi>
        <NGi>
          <NTag
            :bordered="false"
            size="small"
          >
            Interval Date
          </NTag>

          {{ date && convertDateToIsoDate(date) }}
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

          {{ currentIntervalIndex }}
        </NGi>
        <NGi>
          <NTag
            :bordered="false"
            size="small"
          >
            Audio duration
          </NTag>

          {{ duration.toFixed(2) }} seconds
        </NGi>
        <NGi>
          <NTag
            :bordered="false"
            size="small"
          >
            FFT Size
          </NTag>

          {{ size }}
        </NGi>

        <NGi>
          <NTag
            :bordered="false"
            size="small"
          >
            Speed %
          </NTag>

          {{ readable.percentage }}
        </NGi>
        <NGi>
          <NTag
            :bordered="false"
            size="small"
          >
            Semitones
          </NTag>

          {{ readable.semitones }}
        </NGi>
        <NGi v-if="settings !== null">
          <NTag
            :bordered="false"
            size="small"
          >
            Hertz
          </NTag>

          {{ readable.hertz }}
        </NGi>
      </NGrid>

      <div>
        <NSlider
          v-model:value="rate"
          :max="PLAYBACK_RATE.max"
          :min="PLAYBACK_RATE.min"
          :step="PLAYBACK_RATE.step"
          @mousedown="lock"
          @mouseup="unlock"
        />
      </div>

      <div
        ref="waveform"
        class="mt"
      />

      <div
        ref="spectrogram"
        class="spectrogram mt"
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

.spectrogram {
  pointer-events: none;
}

.mt {
  margin-top: 10px;
}
</style>
