<script lang="ts" setup="">
import AppButton from 'src/app/app-button.vue';
import AppIcon from 'src/app/app-icon.vue';
import AppInput from 'src/app/input/app-input.vue';
import {useAcousticRange} from 'src/composables/use-acoustic-range';
import {useColorByAcoustic} from 'src/draggables/colors/use-color-by-acoustic';
import {useColorState} from 'src/draggables/colors/use-color-state';

const {isAcoustic} = useColorState();

const {min, max} = useColorByAcoustic();
const {detect: detectAcousticRange, swap} = useAcousticRange();
</script>

<template>
  <h2
    v-if="isAcoustic"
    :class="$style.buttons"
  >
    <AppButton
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
  </h2>

  <div
    v-if="isAcoustic"
    :class="$style.flex"
  >
    <AppInput
      v-model="min"
      placeholder="Min..."
      size="small"
      type="number"
    />

    <AppInput
      v-model="max"
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
