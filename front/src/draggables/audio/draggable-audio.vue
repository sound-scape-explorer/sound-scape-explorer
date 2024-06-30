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
import AppCondition from 'src/app/app-condition.vue';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import {useDate} from 'src/composables/use-date';
import {useStorageAggregatedSites} from 'src/composables/use-storage-aggregated-sites';
import {useStorageSettings} from 'src/composables/use-storage-settings';
import {PLAYBACK_RATE} from 'src/constants';
import AudioButton from 'src/draggables/audio/draggable-audio-button.vue';
import {useAudioFourier} from 'src/draggables/audio/use-audio-component';
import {useAudioDownload} from 'src/draggables/audio/use-audio-download';
import {useAudioFile} from 'src/draggables/audio/use-audio-file';
import {useAudioLock} from 'src/draggables/audio/use-audio-lock';
import {useAudioOpen} from 'src/draggables/audio/use-audio-open';
import {useAudioRate} from 'src/draggables/audio/use-audio-rate';
import {useAudioTransport} from 'src/draggables/audio/use-audio-transport';
import {useDraggableAudio} from 'src/draggables/audio/use-draggable-audio';
import {useWavesurferHandlers} from 'src/draggables/audio/use-wavesurfer-handlers';
import {useWavesurferMounter} from 'src/draggables/audio/use-wavesurfer-mounter';
import {useDetails} from 'src/draggables/details/use-details';

const {waveform, spectrogram} = useDraggableAudio();
const {increase, decrease, size} = useAudioFourier();
const {settings} = useStorageSettings();
const {aggregatedSites} = useStorageAggregatedSites();
const {date} = useDetails();
const {convertDateToIsoDate} = useDate();
const {currentIntervalIndex, hasClicked} = useAudioOpen();
const {increaseVolume, decreaseVolume} = useWavesurferHandlers();
const {isPlaying, togglePlayPause, stop} = useAudioTransport();
const {rate, readable} = useAudioRate();
const {downloadAudio} = useAudioDownload();
const {lock, unlock} = useAudioLock();
const {block, duration} = useAudioFile();

useWavesurferMounter();
</script>

<template>
  <AppDraggable
    :hide-separator="true"
    draggable-key="audio"
  >
    <AppCondition
      :wait-if="!hasClicked"
      wait-message="please click a point"
    >
      <div class="player">
        <div class="volume buttons">
          <AudioButton
            :alt="isPlaying ? 'Pause' : 'Play'"
            :callback="togglePlayPause"
          >
            <PauseOutline v-if="isPlaying" />
            <PlayOutline v-if="!isPlaying" />
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
            :callback="increase"
            alt="FFT Size Up"
          >
            <AddOutline />
          </AudioButton>

          <AudioButton
            :callback="decrease"
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

        <div ref="waveform" />

        <div
          ref="spectrogram"
          class="spectrogram"
        />
      </div>
    </AppCondition>
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
