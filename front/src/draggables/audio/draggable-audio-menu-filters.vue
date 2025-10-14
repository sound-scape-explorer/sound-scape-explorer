<script lang="ts" setup="">
import {watchThrottled} from '@vueuse/core';
import {NGi, NGrid, NInputNumber, NTag} from 'naive-ui';
import AppButton from 'src/app/app-button.vue';
import AppIcon from 'src/app/app-icon.vue';
import AppTooltip from 'src/app/app-tooltip.vue';
import {useConfig} from 'src/composables/use-config';
import {useViewSelection} from 'src/composables/use-view-selection';
import {useAudioFilterFollow} from 'src/draggables/audio/use-audio-filter-follow';
import {useAudioFilters} from 'src/draggables/audio/use-audio-filters';
import {useAudioPlaybackRate} from 'src/draggables/audio/use-audio-playback-rate';
import {onMounted} from 'vue';

const {nyquist} = useConfig();
const {band} = useViewSelection();
const {readable, rate} = useAudioPlaybackRate();
const {hpfReadable, lpfReadable, update, reset} = useAudioFilters();
const {isFollowing, toggle} = useAudioFilterFollow();

onMounted(() => {
  if (band.value === null) {
    return;
  }

  hpfReadable.value = band.value.low;
  lpfReadable.value = band.value.high;
});

watchThrottled(
  readable,
  () => {
    if (!isFollowing.value || band.value === null) {
      return;
    }

    const low = band.value.low * rate.value;
    const high = band.value.high * rate.value;

    hpfReadable.value = low > nyquist.value ? nyquist.value : low;
    lpfReadable.value = high > nyquist.value ? nyquist.value : high;

    update('hpf', low);
    update('lpf', high);
  },
  {throttle: 500},
);
</script>

<template>
  <div :class="$style.flex">
    <span>Filters</span>
    <AppTooltip>
      <template #tooltip>
        <span v-if="isFollowing">Following playback rate</span>
        <span v-if="!isFollowing">Custom</span>
      </template>
      <template #body>
        <AppButton :handle-click="toggle">
          <AppIcon
            v-if="isFollowing"
            color="active"
            icon="link"
          />
          <AppIcon
            v-if="!isFollowing"
            icon="unlink"
          />
        </AppButton>
      </template>
    </AppTooltip>
  </div>
  <div :class="$style.flex">
    <NGrid
      cols="2"
      x-gap="4"
    >
      <NGi :class="$style.flex">
        <AppTooltip>
          <template #tooltip>Reset high pass filter</template>
          <template #body>
            <NTag
              :bordered="false"
              :class="$style.hover"
              :disabled="isFollowing"
              size="small"
              @click="() => reset('hpf')"
            >
              HPF
            </NTag>
          </template>
        </AppTooltip>

        <NInputNumber
          v-model:value="hpfReadable"
          :disabled="isFollowing"
          :max="nyquist"
          :min="0"
          size="tiny"
          @update:value="() => update('hpf', hpfReadable)"
        />
      </NGi>
      <NGi :class="$style.flex">
        <AppTooltip>
          <template #tooltip>Reset low pass filter</template>
          <template #body>
            <NTag
              :bordered="false"
              :class="$style.hover"
              :disabled="isFollowing"
              size="small"
              @click="() => reset('lpf')"
            >
              LPF
            </NTag>
          </template>
        </AppTooltip>

        <NInputNumber
          v-model:value="lpfReadable"
          :disabled="isFollowing"
          :max="nyquist"
          :min="0"
          size="tiny"
          @update:value="() => update('lpf', lpfReadable)"
        />
      </NGi>
    </NGrid>
  </div>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';

.flex {
  display: flex;
  gap: sizes.$g0;
}

.hover {
  &:hover {
    cursor: pointer;
  }
}
</style>
