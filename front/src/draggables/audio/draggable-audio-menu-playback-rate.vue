<script lang="ts" setup="">
import {NGi, NGrid, NSlider, NTag} from 'naive-ui';
import AppTooltip from 'src/app/app-tooltip.vue';
import {useScatterCamera} from 'src/components/scatter/use-scatter-camera';
import {useAppDisplay} from 'src/composables/use-app-display';
import {PLAYBACK_RATE} from 'src/constants';
import {useAudioPlaybackRate} from 'src/draggables/audio/use-audio-playback-rate';

const {rate, readable, reset} = useAudioPlaybackRate();
const {lock, unlock} = useScatterCamera();

const {cycle, display, Display} = useAppDisplay(
  'value',
  'percentage',
  'semitones',
);
</script>

<template>
  <span>Playback</span>
  <NGrid
    cols="2"
    x-gap="4"
  >
    <NGi
      v-if="display === Display.enum.percentage"
      :class="$style.clickable"
      @click="cycle"
    >
      <NTag
        :bordered="false"
        :class="$style.clickable"
        size="small"
      >
        Speed
      </NTag>

      {{ readable.percentage }} %
    </NGi>

    <NGi
      v-if="display === Display.enum.value"
      :class="$style.clickable"
      @click="cycle"
    >
      <NTag
        :bordered="false"
        :class="$style.clickable"
        size="small"
      >
        Absolute
      </NTag>

      {{ rate }}
    </NGi>

    <NGi
      v-if="display === Display.enum.semitones"
      :class="$style.clickable"
      @click="cycle"
    >
      <NTag
        :bordered="false"
        :class="$style.clickable"
        size="small"
      >
        Chromatic
      </NTag>

      {{ readable.semitones }} st
    </NGi>
    <NGi :class="$style['slider-container']">
      <AppTooltip>
        <template #tooltip>Reset playback rate</template>
        <template #body>
          <NTag
            :bordered="false"
            :class="$style.clickable"
            size="small"
            @click="reset"
          >
            Rate
          </NTag>
        </template>
      </AppTooltip>

      <NSlider
        v-model:value="rate"
        :formatTooltip="() => readable.hertz"
        :max="PLAYBACK_RATE.max"
        :min="PLAYBACK_RATE.min"
        :step="PLAYBACK_RATE.step"
        @mousedown="lock"
        @mouseup="unlock"
      />
    </NGi>
  </NGrid>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';

.clickable {
  cursor: pointer;
}

.slider-container {
  align-items: center;
  display: flex;
  gap: sizes.$g0;
}
</style>
