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
import AppDraggable from 'src/app/app-draggable.vue';
import {useDate} from 'src/composables/date';
import {useStorageAggregatedSites} from 'src/composables/storage-aggregated-sites';
import {useStorageSettings} from 'src/composables/storage-settings';
import {PLAYBACK_RATE} from 'src/constants';
import {useAudioFourier} from 'src/draggables/audio/audio-component';
import {useAudioDownload} from 'src/draggables/audio/audio-download';
import {audioBlockRef, audioDurationRef} from 'src/draggables/audio/audio-file';
import {useAudioRate} from 'src/draggables/audio/audio-rate';
import {useAudioTransport} from 'src/draggables/audio/audio-transport';
import {useDraggableAudio} from 'src/draggables/audio/draggable-audio';
import AudioButton from 'src/draggables/audio/draggable-audio-button.vue';
import {useWavesurfer} from 'src/draggables/audio/wavesurfer';
import {useDetails} from 'src/draggables/details/details';
import {useScatterClick} from 'src/scatter/scatter-click';

const {waveform, spectrogram} = useDraggableAudio();
const {increase, decrease, size} = useAudioFourier();
const {settings} = useStorageSettings();
const {aggregatedSites} = useStorageAggregatedSites();
const {intervalDateRef} = useDetails();
const {convertDateToIsoDate} = useDate();
const {clickedIndex, hasClicked} = useScatterClick();
const {increaseVolume, decreaseVolume} = useWavesurfer();
const {isPlaying, togglePlayPause, stop} = useAudioTransport();
const {rate, readable} = useAudioRate();
const {downloadAudio} = useAudioDownload();
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

            {{ audioBlockRef.value?.file }}
          </NGi>
        </NGrid>

        <NGrid
          v-if="aggregatedSites !== null && clickedIndex !== null"
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

            {{ aggregatedSites[clickedIndex].site }}
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

            {{ clickedIndex }}
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
