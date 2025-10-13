<script lang="ts" setup="">
import {NInputNumber} from 'naive-ui';
import AppButton from 'src/app/app-button.vue';
import AppIcon from 'src/app/app-icon.vue';
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
  <div :class="$style.container">
    <AppTooltip placement="top-start">
      <template #tooltip>High pass filter (Hz)</template>
      <template #body>
        <NInputNumber
          v-model:value="hpfReadable"
          :min="0"
          size="tiny"
          @update:value="() => update('hpf', hpfReadable)"
        />
      </template>
    </AppTooltip>

    <AppButton
      :handle-click="() => reset('hpf')"
      tooltip="Reset HPF"
    >
      <AppIcon
        icon="reset"
        size="tiny"
      />
    </AppButton>

    <AppTooltip placement="top-start">
      <template #tooltip>Low pass filter (Hz)</template>
      <template #body>
        <NInputNumber
          v-model:value="lpfReadable"
          :min="0"
          size="tiny"
          @update:value="() => update('lpf', lpfReadable)"
        />
      </template>
    </AppTooltip>

    <AppButton
      :handle-click="() => reset('lpf')"
      tooltip="Reset LPF"
    >
      <AppIcon
        icon="reset"
        size="tiny"
      />
    </AppButton>
  </div>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';

.container {
  display: grid;
  gap: sizes.$g0;
  grid-template-columns: 1fr auto 1fr auto;
  place-items: center;

  & > div {
    width: 100%;
  }
}
</style>
