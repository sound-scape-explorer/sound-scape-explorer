<script lang="ts" setup>
import {NGi, NGrid, NSlider, NTag} from 'naive-ui';
import {useConfig} from 'src/composables/use-config';
import {useDate} from 'src/composables/use-date';
import {useInterval} from 'src/composables/use-interval';
import {PLAYBACK_RATE, STRING_DELIMITER} from 'src/constants';
import {useAudioFourier} from 'src/draggables/audio/use-audio-component';
import {useAudioFile} from 'src/draggables/audio/use-audio-file';
import {useAudioGain} from 'src/draggables/audio/use-audio-gain';
import {useAudioLock} from 'src/draggables/audio/use-audio-lock';
import {useAudioRate} from 'src/draggables/audio/use-audio-rate';

const {size} = useAudioFourier();
const {config} = useConfig();
const {currentInterval} = useInterval();
const {convertTimestampToDate, convertTimestampToIsoDate} = useDate();
const {currentIndex} = useInterval();
const {rate, readable} = useAudioRate();
const {lock, unlock} = useAudioLock();
const {window, duration} = useAudioFile();
const {gain} = useAudioGain();
</script>

<template>
  <div v-if="currentInterval && currentIndex">
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

        {{ currentInterval.sites.join(STRING_DELIMITER) }}
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
          Interval Index
        </NTag>

        {{ currentIndex }}
      </NGi>
      <NGi>
        <NTag
          :bordered="false"
          size="small"
        >
          Start
        </NTag>

        {{ convertTimestampToIsoDate(currentInterval.start) }}
      </NGi>
      <NGi>
        <NTag
          :bordered="false"
          size="small"
        >
          End
        </NTag>

        {{ convertTimestampToIsoDate(currentInterval.end) }}
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
  </div>
</template>
