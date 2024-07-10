<script lang="ts" setup="">
import {
  CalculatorOutline,
  FlashOutline,
  RepeatOutline,
} from '@vicons/ionicons5';
import AppButton from 'src/app/app-button.vue';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import AppInput from 'src/app/input/app-input.vue';
import AppSelect from 'src/app/select/app-select.vue';
import {useScatterColorAlpha} from 'src/components/scatter/use-scatter-color-alpha';
import {useScatterLoading} from 'src/components/scatter/use-scatter-loading';
import {useColorInvert} from 'src/composables/use-color-invert';
import {useIndicatorLimits} from 'src/composables/use-indicator-limits';
import {useRefProvide} from 'src/composables/use-ref-provide';
import {COLOR_FLAVORS} from 'src/constants';
import ColorsGradients from 'src/draggables/colors/draggable-colors-gradients.vue';
import {useColorByIndicator} from 'src/draggables/colors/use-color-by-indicator';
import {useColorByLabel} from 'src/draggables/colors/use-color-by-label';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {useColorState} from 'src/draggables/colors/use-color-state';
import {useLabelsNumeric} from 'src/draggables/labels/use-labels-numeric';

const {isLoading} = useScatterLoading();
const {flavor, criteria, criterias, category, categories} = useColorSelection();
const {isIndicators, isLabels, isLabelNumeric} = useColorState();

const {low, high} = useScatterColorAlpha();
const {min: indicatorRangeMin, max: indicatorRangeMax} = useColorByIndicator();
const {
  min: labelRangeMin,
  max: labelRangeMax,
  detect: detectLabelRange,
} = useColorByLabel();
const {detect: detectIndicatorRange, swap} = useIndicatorLimits();
const {invert} = useColorInvert();
const {isEnabled, toggle} = useLabelsNumeric();

useRefProvide('colors/criteria', criteria);
useRefProvide('colors/category', category);
useRefProvide('colors/flavor', flavor);
useRefProvide('colors/alphaExcluded', low);
useRefProvide('colors/alphaIncluded', high);
useRefProvide('colors/indicatorMin', indicatorRangeMin);
useRefProvide('colors/indicatorMax', indicatorRangeMax);
useRefProvide('colors/labelRangeMin', labelRangeMin);
useRefProvide('colors/labelRangeMax', labelRangeMax);
</script>

<template>
  <AppDraggable
    draggable-key="colors"
    hide-separator
  >
    <AppDraggableMenu
      class="menu"
      size="large"
    >
      <h2>With</h2>

      <div class="two grow">
        <AppSelect
          :disabled="isLoading"
          :options="categories"
          injection-key="colors/category"
          placeholder="Category..."
          size="small"
        />

        <AppSelect
          :disabled="isLoading"
          :options="criterias"
          injection-key="colors/criteria"
          placeholder="Criteria..."
          size="small"
        />
      </div>

      <h2
        v-if="isIndicators"
        class="indicator-buttons"
      >
        <AppButton
          :handle-click="detectIndicatorRange"
          icon
          size="small"
          tooltip="Detect range"
          tooltip-placement="bottom"
        >
          <FlashOutline />
        </AppButton>

        <AppButton
          :handle-click="swap"
          icon
          size="small"
          tooltip="Swap range"
          tooltip-placement="bottom"
        >
          <RepeatOutline />
        </AppButton>
      </h2>

      <div
        v-if="isIndicators"
        class="two"
      >
        <AppInput
          injection-key="colors/indicatorMin"
          placeholder="Min..."
          size="small"
          type="number"
        />

        <AppInput
          injection-key="colors/indicatorMax"
          placeholder="Max..."
          size="small"
          type="number"
        />
      </div>

      <h2
        v-if="isLabelNumeric"
        class="indicator-buttons"
      >
        <AppButton
          :active="isEnabled"
          :handle-click="toggle"
          :tooltip="`Coloring by range ${isEnabled ? 'on' : 'off'}`"
          icon
          size="small"
          tooltip-placement="bottom"
        >
          <CalculatorOutline />
        </AppButton>

        <AppButton
          :disabled="!isEnabled"
          :handle-click="detectLabelRange"
          icon
          size="small"
          tooltip="Detect range"
          tooltip-placement="bottom"
        >
          <FlashOutline />
        </AppButton>
      </h2>

      <div
        v-if="isLabelNumeric"
        class="two"
      >
        <AppInput
          :disabled="!isEnabled"
          injection-key="colors/labelRangeMin"
          placeholder="Min..."
          size="small"
          type="number"
        />

        <AppInput
          :disabled="!isEnabled"
          injection-key="colors/labelRangeMax"
          placeholder="Max..."
          size="small"
          type="number"
        />
      </div>

      <h2>Opacity</h2>

      <div class="two">
        <AppInput
          :disabled="isLoading"
          :max="1"
          :min="0.005"
          :step="0.005"
          align="left"
          injection-key="colors/alphaExcluded"
          size="small"
          tooltip="Opacity for excluded points"
          tooltip-placement="bottom"
          type="number"
        />

        <AppInput
          :disabled="isLoading"
          :max="1"
          :min="0"
          :step="0.05"
          align="left"
          injection-key="colors/alphaIncluded"
          size="small"
          tooltip="Opacity for collected points"
          tooltip-placement="bottom"
          type="number"
        />
      </div>

      <h2
        v-if="!isLabels || isEnabled"
        style="display: flex; gap: 8px"
      >
        <span>Map</span>
        <AppButton
          :handle-click="invert"
          icon
          size="tiny"
          tooltip="Revert color map"
          tooltip-placement="bottom"
        >
          <RepeatOutline />
        </AppButton>
      </h2>

      <div
        v-if="!isLabels || isEnabled"
        class="gradients"
      >
        <ColorsGradients />
      </div>

      <h2>Flavor</h2>

      <AppSelect
        :disabled="isLoading"
        :options="COLOR_FLAVORS"
        injection-key="colors/flavor"
        size="small"
      />
    </AppDraggableMenu>
  </AppDraggable>
</template>

<style lang="scss" scoped>
.menu {
  width: 34em;
}

.two {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
}

.grow {
  > div {
    width: 100%;
  }
}

.indicator-buttons {
  display: flex;
  gap: 0.5em;
}

.gradients {
  transform: translateY(-2px);
}
</style>
