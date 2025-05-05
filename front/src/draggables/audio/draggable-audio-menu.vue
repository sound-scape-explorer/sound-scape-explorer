<script lang="ts" setup>
import {NGi, NGrid, NSlider, NTag} from 'naive-ui';
import {useConfig} from 'src/composables/use-config';
import {useDate} from 'src/composables/use-date';
import {useIntervalSelector} from 'src/composables/use-interval-selector';
import {useIntervals} from 'src/composables/use-intervals';
import {PLAYBACK_RATE, STRING_DELIMITER} from 'src/constants';
import {useAudioFourier} from 'src/draggables/audio/use-audio-component';
import {useAudioFile} from 'src/draggables/audio/use-audio-file';
import {useAudioGain} from 'src/draggables/audio/use-audio-gain';
import {useAudioLock} from 'src/draggables/audio/use-audio-lock';
import {useAudioRate} from 'src/draggables/audio/use-audio-rate';
import {useDetails} from 'src/draggables/details/use-details';

const {size} = useAudioFourier();
const {config} = useConfig();
const {intervals} = useIntervals();
const {date, dateEnd} = useDetails();
const {convertDateToIsoDate} = useDate();
const {currentIntervalIndex} = useIntervalSelector();
const {rate, readable} = useAudioRate();
const {lock, unlock} = useAudioLock();
const {window, duration} = useAudioFile();
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

      {{ window?.file.Path }}
    </NGi>
  </NGrid>

  <NGrid
    v-if="currentIntervalIndex !== null"
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

      {{ intervals[currentIntervalIndex].sites.join(STRING_DELIMITER) }}
    </NGi>
  </NGrid>

  <NGrid
    v-if="currentIntervalIndex !== null"
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
    <NGi v-if="config !== null">
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
