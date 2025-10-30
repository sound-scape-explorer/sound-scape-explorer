<script lang="ts" setup>
import AppButton from 'src/app/app-button.vue';
import AppIcon from 'src/app/app-icon.vue';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import {SuspenseCase} from 'src/app/draggable/use-app-draggable-suspense';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import AppInput from 'src/app/input/app-input.vue';
import AppSelect from 'src/app/select/app-select.vue';
import {useScatterLoading} from 'src/components/scatter/use-scatter-loading';
import {useAcousticRange} from 'src/composables/use-acoustic-range';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useColorInvert} from 'src/composables/use-color-invert';
import {DraggableKey} from 'src/composables/use-draggables';
import {ColorCategory, ColorFlavor} from 'src/constants';
import ColorsGradients from 'src/draggables/colors/draggable-colors-gradients.vue';
import DraggableColorsTagNumeric from 'src/draggables/colors/draggable-colors-tag-numeric.vue';
import {useColorByAcoustic} from 'src/draggables/colors/use-color-by-acoustic';
import {useColorByTag} from 'src/draggables/colors/use-color-by-tag';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {useColorState} from 'src/draggables/colors/use-color-state';
import {useTagNumeric} from 'src/draggables/tags/use-tag-numeric';

const {isLoading} = useScatterLoading();
const {flavor, option, options, category} = useColorSelection();
const {isAcoustic, isTag, isTagNumeric} = useColorState();

const {colorsAlphaLow: low, colorsAlphaHigh: high} = useClientSettings();
const {min: acousticMin, max: acousticMax} = useColorByAcoustic();
const {min: tagMin, max: tagMax} = useColorByTag();
const {detect: detectAcousticRange, swap} = useAcousticRange();
const {invert, isReversible} = useColorInvert();
const {isEnabled} = useTagNumeric();
</script>

<template>
  <AppDraggable
    :draggable-key="DraggableKey.enum.colors"
    :suspense="SuspenseCase.enum.VIEW"
  >
    <AppDraggableMenu>
      <h2>With</h2>

      <div :class="[$style.two, $style.grow]">
        <AppSelect
          v-model="category"
          :disabled="isLoading"
          :options="ColorCategory.options"
          placeholder="Category..."
          size="small"
        />

        <AppSelect
          v-model="option"
          :disabled="isLoading"
          :options="options"
          placeholder="Option..."
          size="small"
        />
      </div>

      <h2
        v-if="isAcoustic"
        :class="$style['acoustic-buttons']"
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
        :class="$style.two"
      >
        <AppInput
          v-model="acousticMin"
          placeholder="Min..."
          size="small"
          type="number"
        />

        <AppInput
          v-model="acousticMax"
          placeholder="Max..."
          size="small"
          type="number"
        />
      </div>

      <h2
        v-if="isTagNumeric"
        :class="$style['acoustic-buttons']"
      >
        <DraggableColorsTagNumeric />
      </h2>

      <div
        v-if="isTagNumeric"
        :class="$style.two"
      >
        <AppInput
          v-model="tagMin"
          :disabled="!isEnabled"
          placeholder="Min..."
          size="small"
          type="number"
        />

        <AppInput
          v-model="tagMax"
          :disabled="!isEnabled"
          placeholder="Max..."
          size="small"
          type="number"
        />
      </div>

      <h2>Opacity</h2>

      <div :class="$style.two">
        <AppInput
          v-model="low"
          :disabled="isLoading"
          :max="1"
          :min="0.001"
          :step="0.001"
          align="left"
          size="small"
          tooltip="Opacity for excluded points"
          tooltip-placement="bottom"
          type="number"
        />

        <AppInput
          v-model="high"
          :disabled="isLoading"
          :max="1"
          :min="0"
          :step="0.05"
          align="left"
          size="small"
          tooltip="Opacity for collected points"
          tooltip-placement="bottom"
          type="number"
        />
      </div>

      <h2>Flavor</h2>

      <AppSelect
        v-model="flavor"
        :disabled="isLoading"
        :options="ColorFlavor.options"
        size="small"
      />

      <h2
        v-if="!isTag || isEnabled"
        style="display: flex; gap: 8px"
      >
        <span>Map</span>
        <AppButton
          :disabled="!isReversible"
          :handle-click="invert"
          size="tiny"
          tooltip="Revert color map"
          tooltip-placement="bottom"
        >
          <AppIcon
            icon="swap"
            size="small"
          />
        </AppButton>
      </h2>

      <div
        v-if="!isTag || isEnabled"
        :class="$style.gradients"
      >
        <ColorsGradients />
      </div>
    </AppDraggableMenu>
  </AppDraggable>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';

.two {
  align-items: center;
  display: flex;
  gap: sizes.$p0;
  justify-content: center;
  width: sizes.$s0;

  & > * {
    width: 100%;
  }
}

.grow {
  > div {
    width: 100%;
  }
}

.acoustic-buttons {
  display: flex;
  gap: sizes.$p0;
}

.gradients {
  transform: translateY(-2px);
}
</style>
