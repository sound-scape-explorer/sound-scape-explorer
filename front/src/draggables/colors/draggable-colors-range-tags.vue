<script lang="ts" setup="">
import AppButton from 'src/app/app-button.vue';
import AppIcon from 'src/app/app-icon.vue';
import AppInput from 'src/app/input/app-input.vue';
import {useColorType} from 'src/draggables/colors/use-color-type';
import {useColoringState} from 'src/draggables/colors/use-coloring-state';
import {useTagNumeric} from 'src/draggables/tags/use-tag-numeric';
import {onBeforeUnmount} from 'vue';

const {
  isNumericModeEnabled,
  numericRangeMin,
  numericRangeMax,
  detectNumericRange,
} = useColoringState();
const {isTagNumeric} = useColorType();
const {toggle, disable} = useTagNumeric();

onBeforeUnmount(disable);
</script>

<template>
  <h2
    v-if="isTagNumeric"
    :class="$style.buttons"
  >
    <AppButton
      :active="isNumericModeEnabled"
      :handle-click="toggle"
      :tooltip="`Act as numeric range ${isNumericModeEnabled ? 'enabled' : 'disabled'}`"
      size="small"
      tooltip-placement="bottom"
    >
      <AppIcon
        icon="calculator"
        size="small"
      />
    </AppButton>

    <AppButton
      :disabled="!isNumericModeEnabled"
      :handle-click="detectNumericRange"
      size="small"
      tooltip="Detect range"
      tooltip-placement="bottom"
    >
      <AppIcon
        icon="detect"
        size="small"
      />
    </AppButton>
  </h2>

  <div
    v-if="isTagNumeric"
    :class="$style.flex"
  >
    <AppInput
      v-model="numericRangeMin"
      :disabled="!isNumericModeEnabled"
      placeholder="Min..."
      size="small"
      type="number"
    />

    <AppInput
      v-model="numericRangeMax"
      :disabled="!isNumericModeEnabled"
      placeholder="Max..."
      size="small"
      type="number"
    />
  </div>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';

.buttons {
  gap: sizes.$g0;
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
