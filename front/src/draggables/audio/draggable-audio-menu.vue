<script lang="ts" setup="">
import {NGi, NGrid, NSlider, NTag} from 'naive-ui';
import {useDate} from 'src/composables/use-date';
import {useIntervalSelector} from 'src/composables/use-interval-selector';
import {useSettings} from 'src/composables/use-settings';
import {useStorageAggregatedSites} from 'src/composables/use-storage-aggregated-sites';
import {PLAYBACK_RATE} from 'src/constants';
import {useAudioFourier} from 'src/draggables/audio/use-audio-component';
import {useAudioFile} from 'src/draggables/audio/use-audio-file';
import {useAudioGain} from 'src/draggables/audio/use-audio-gain';
import {useAudioLock} from 'src/draggables/audio/use-audio-lock';
import {useAudioRate} from 'src/draggables/audio/use-audio-rate';
import {useDetails} from 'src/draggables/details/use-details';

const {size} = useAudioFourier();
const {settings} = useSettings();
const {aggregatedSites} = useStorageAggregatedSites();
const {date, dateEnd} = useDetails();
const {convertDateToIsoDate} = useDate();
const {currentIntervalIndex} = useIntervalSelector();
const {rate, readable} = useAudioRate();
const {lock, unlock} = useAudioLock();
const {block, duration} = useAudioFile();
const {gain} = useAudioGain();
</script>

<template>
  <NGrid
    :cols="1"
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
  </NGrid>

  <NGrid
    v-if="aggregatedSites !== null && currentIntervalIndex !== null"
    :cols="3"
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
        Start
      </NTag>

      {{ date && convertDateToIsoDate(date) }}
    </NGi>
    <NGi>
      <NTag
        :bordered="false"
        size="small"
      >
        End
      </NTag>

      {{ dateEnd && convertDateToIsoDate(dateEnd) }}
    </NGi>
  </NGrid>

  <NGrid
    :cols="3"
    x-gap="12"
  >
    <NGi>
      <NTag
        :bordered="false"
        size="small"
      >
        Gain
      </NTag>

      {{ gain }}
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
</template>
