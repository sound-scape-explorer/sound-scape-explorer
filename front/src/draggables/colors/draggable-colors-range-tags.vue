<script lang="ts" setup="">
import AppButton from 'src/app/app-button.vue';
import AppIcon from 'src/app/app-icon.vue';
import AppInput from 'src/app/input/app-input.vue';
import {useColorByTag} from 'src/draggables/colors/use-color-by-tag';
import {useColorState} from 'src/draggables/colors/use-color-state';
import {useTagNumeric} from 'src/draggables/tags/use-tag-numeric';
import {onBeforeUnmount} from 'vue';

const {isTagNumeric} = useColorState();
const {min, max} = useColorByTag();
const {detect} = useColorByTag();
const {isEnabled, toggle, disable} = useTagNumeric();

onBeforeUnmount(disable);
</script>

<template>
  <h2
    v-if="isTagNumeric"
    :class="$style.buttons"
  >
    <AppButton
      :active="isEnabled"
      :handle-click="toggle"
      :tooltip="`Act as numeric range ${isEnabled ? 'on' : 'off'}`"
      size="small"
      tooltip-placement="bottom"
    >
      <AppIcon
        icon="calculator"
        size="small"
      />
    </AppButton>

    <AppButton
      :disabled="!isEnabled"
      :handle-click="detect"
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
      v-model="min"
      :disabled="!isEnabled"
      placeholder="Min..."
      size="small"
      type="number"
    />

    <AppInput
      v-model="max"
      :disabled="!isEnabled"
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
}
</style>
