<script lang="ts" setup="">
import {NGi, NGrid, NSlider, NTag} from 'naive-ui';
import AppTooltip from 'src/app/app-tooltip.vue';
import {useScatterCamera} from 'src/components/scatter/use-scatter-camera';
import {PLAYBACK_RATE} from 'src/constants';
import {useAudioSamplingRate} from 'src/draggables/audio/use-audio-sampling-rate';
import {ref} from 'vue';

const {rate, readable, reset} = useAudioSamplingRate();
const {lock, unlock} = useScatterCamera();

const isSemitones = ref<boolean>(false);

const toggle = () => (isSemitones.value = !isSemitones.value);
</script>

<template>
  <span>Playback</span>
  <NGrid
    cols="2"
    x-gap="4"
  >
    <NGi
      v-if="!isSemitones"
      :class="$style.clickable"
      @click="toggle"
    >
      <NTag
        :bordered="false"
        :class="$style.clickable"
        size="small"
      >
        Speed %
      </NTag>

      {{ readable.percentage }}
    </NGi>
    <NGi
      v-else
      :class="$style.clickable"
      @click="toggle"
    >
      <NTag
        :bordered="false"
        :class="$style.clickable"
        size="small"
      >
        Semitones
      </NTag>

      {{ readable.semitones }}
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
