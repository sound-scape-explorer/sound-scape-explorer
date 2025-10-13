<script lang="ts" setup="">
import {useDebounceFn} from '@vueuse/core';
import {NGi, NGrid, NSlider, NTag} from 'naive-ui';
import AppTooltip from 'src/app/app-tooltip.vue';
import {useScatterCamera} from 'src/components/scatter/use-scatter-camera';
import {AUDIO_GAIN, DEBOUNCE_MS} from 'src/constants';
import {useAudioFile} from 'src/draggables/audio/use-audio-file';
import {useAudioGain} from 'src/draggables/audio/use-audio-gain';
import {useAudioWaveform} from 'src/draggables/audio/use-audio-waveform';

const {duration} = useAudioFile();
const {gain, apply, reset: resetGain} = useAudioGain();
const {lock, unlock} = useScatterCamera();
const {render} = useAudioWaveform();

const handleChange = useDebounceFn(() => {
  apply();
  render();
}, DEBOUNCE_MS);

const reset = () => {
  resetGain();
  render();
};
</script>

<template>
  <span>Audio</span>
  <div :class="$style.container">
    <NGrid
      cols="2"
      x-gap="4"
    >
      <NGi>
        <NTag
          :bordered="false"
          size="small"
        >
          Duration
        </NTag>

        {{ duration.toFixed(2) }} seconds
      </NGi>

      <NGi :class="$style.slider">
        <AppTooltip>
          <template #tooltip>Reset gain</template>
          <template #body>
            <NTag
              :bordered="false"
              :class="$style.hover"
              size="small"
              @click="reset"
            >
              Gain
            </NTag>
          </template>
        </AppTooltip>

        <NSlider
          v-model:value="gain"
          :max="AUDIO_GAIN.max"
          :min="AUDIO_GAIN.min"
          :step="AUDIO_GAIN.step"
          @mousedown="lock"
          @mouseup="unlock"
          @update:value="handleChange"
        />
      </NGi>
    </NGrid>
  </div>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';

.container {
  display: flex;
  gap: sizes.$g0;
}

.slider {
  display: flex;
  gap: sizes.$g0;
}

.hover {
  &:hover {
    cursor: pointer;
  }
}
</style>
