<script lang="ts" setup="">
import {NGi, NGrid, NInputNumber, NTag} from 'naive-ui';
import AppTooltip from 'src/app/app-tooltip.vue';
import {useViewSelection} from 'src/composables/use-view-selection';
import {useAudioFilters} from 'src/draggables/audio/use-audio-filters';
import {onMounted} from 'vue';

// TODO: useful to clamp the values to samplingRate/2 ?
const {band} = useViewSelection();
const {hpfReadable, lpfReadable, update, reset} = useAudioFilters();

onMounted(() => {
  if (band.value === null) {
    return;
  }

  hpfReadable.value = band.value.low;
  lpfReadable.value = band.value.high;
});
</script>

<template>
  <span>Filters</span>
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
              size="small"
              @click="() => reset('hpf')"
            >
              HPF
            </NTag>
          </template>
        </AppTooltip>

        <NInputNumber
          v-model:value="hpfReadable"
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
              size="small"
              @click="() => reset('lpf')"
            >
              LPF
            </NTag>
          </template>
        </AppTooltip>

        <NInputNumber
          v-model:value="lpfReadable"
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
