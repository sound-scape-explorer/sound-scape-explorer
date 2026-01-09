<script lang="ts" setup="">
import AppButton from 'src/app/app-button.vue';
import AppIcon from 'src/app/app-icon.vue';
import AppInput from 'src/app/input/app-input.vue';
import {useAcousticRange} from 'src/composables/use-acoustic-range';
import {useColorByAcoustic} from 'src/draggables/colors/use-color-by-acoustic';
import {useColorType} from 'src/draggables/colors/use-color-type';
import {useColoringState} from 'src/draggables/colors/use-coloring-state';

const {isAcoustic} = useColorType();

const {min, max} = useColorByAcoustic();
const {detect: detectAcousticRange, swap} = useAcousticRange();
const {isAcousticDataLoading} = useColoringState();
</script>

<template>
  <div
    v-if="isAcoustic"
    :class="$style.buttons"
  >
    <div v-if="isAcousticDataLoading">Loading...</div>

    <AppButton
      v-if="!isAcousticDataLoading"
      :disabled="isAcousticDataLoading"
      :handle-click="detectAcousticRange"
      size="small"
      tooltip="Detect range"
      tooltip-placement="bottom"
    >
      <AppIcon
        icon="detect"
        size="small"
      />
    </AppButton>

    <AppButton
      v-if="!isAcousticDataLoading"
      :disabled="isAcousticDataLoading"
      :handle-click="swap"
      size="small"
      tooltip="Swap range"
      tooltip-placement="bottom"
    >
      <AppIcon
        icon="swap"
        size="small"
      />
    </AppButton>
  </div>

  <div
    v-if="isAcoustic"
    :class="$style.flex"
  >
    <AppInput
      v-model="min"
      :disabled="isAcousticDataLoading"
      placeholder="Min..."
      size="small"
      type="number"
    />

    <AppInput
      v-model="max"
      :disabled="isAcousticDataLoading"
      placeholder="Max..."
      size="small"
      type="number"
    />
  </div>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';

.buttons {
  display: flex;
  gap: sizes.$p0;
}

.flex {
  align-items: center;
  display: flex;
  gap: sizes.$g0;
  justify-content: center;

  & > div {
    width: 100%;
  }
}
</style>
