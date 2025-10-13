<script lang="ts" setup="">
import {useDebounceFn} from '@vueuse/core';
import {NGi, NGrid, NSlider, NTag} from 'naive-ui';
import {useScatterCamera} from 'src/components/scatter/use-scatter-camera';
import {DEBOUNCE_MS, GAIN} from 'src/constants';
import {useAudioFile} from 'src/draggables/audio/use-audio-file';
import {useAudioGain} from 'src/draggables/audio/use-audio-gain';
import {useAudioWaveform} from 'src/draggables/audio/use-audio-waveform';

const {duration} = useAudioFile();
const {gain, apply} = useAudioGain();
const {lock, unlock} = useScatterCamera();
const {render} = useAudioWaveform();

const handleChange = useDebounceFn(() => {
  apply();
  render();
}, DEBOUNCE_MS);
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
        <NTag
          :bordered="false"
          size="small"
        >
          Gain
        </NTag>

        <NSlider
          v-model:value="gain"
          :max="GAIN.max"
          :min="GAIN.min"
          :step="GAIN.step"
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
</style>
