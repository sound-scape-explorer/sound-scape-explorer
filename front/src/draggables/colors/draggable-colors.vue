<script lang="ts" setup>
import {IonIcon} from '@ionic/vue';
import {flashOutline, repeatOutline} from 'ionicons/icons';
import AppButton from 'src/app/app-button.vue';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import AppInput from 'src/app/input/app-input.vue';
import AppSelect from 'src/app/select/app-select.vue';
import {useScatterLoading} from 'src/components/scatter/use-scatter-loading';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useColorInvert} from 'src/composables/use-color-invert';
import {useIndexLimits} from 'src/composables/use-index-limits';
import {ColorCategory, ColorFlavor} from 'src/constants';
import ColorsGradients from 'src/draggables/colors/draggable-colors-gradients.vue';
import DraggableColorsLabelNumeric from 'src/draggables/colors/draggable-colors-label-numeric.vue';
import {useColorByIndex} from 'src/draggables/colors/use-color-by-index';
import {useColorByTag} from 'src/draggables/colors/use-color-by-tag';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {useColorState} from 'src/draggables/colors/use-color-state';
import {useTagNumeric} from 'src/draggables/tags/use-tag-numeric';

const {isLoading} = useScatterLoading();
const {flavor, criteria, criterias, category} = useColorSelection();
const {isIndicators, isLabels, isLabelNumeric} = useColorState();

const {colorsAlphaLow: low, colorsAlphaHigh: high} = useClientSettings();
const {min: indicatorRangeMin, max: indicatorRangeMax} = useColorByIndex();
const {min: labelRangeMin, max: labelRangeMax} = useColorByTag();
const {detect: detectIndicatorRange, swap} = useIndexLimits();
const {invert, isReversible} = useColorInvert();
const {isEnabled} = useTagNumeric();
</script>

<template>
  <AppDraggable
    draggable-key="colors"
    suspense="view"
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
          v-model="criteria"
          :disabled="isLoading"
          :options="criterias"
          placeholder="Criteria..."
          size="small"
        />
      </div>

      <h2
        v-if="isIndicators"
        :class="$style['indicator-buttons']"
      >
        <AppButton
          :handle-click="detectIndicatorRange"
          size="small"
          tooltip="Detect range"
          tooltip-placement="bottom"
        >
          <IonIcon :icon="flashOutline" />
        </AppButton>

        <AppButton
          :handle-click="swap"
          size="small"
          tooltip="Swap range"
          tooltip-placement="bottom"
        >
          <IonIcon :icon="repeatOutline" />
        </AppButton>
      </h2>

      <div
        v-if="isIndicators"
        :class="$style.two"
      >
        <AppInput
          v-model="indicatorRangeMin"
          placeholder="Min..."
          size="small"
          type="number"
        />

        <AppInput
          v-model="indicatorRangeMax"
          placeholder="Max..."
          size="small"
          type="number"
        />
      </div>

      <h2
        v-if="isLabelNumeric"
        :class="$style['indicator-buttons']"
      >
        <DraggableColorsLabelNumeric />
      </h2>

      <div
        v-if="isLabelNumeric"
        :class="$style.two"
      >
        <AppInput
          v-model="labelRangeMin"
          :disabled="!isEnabled"
          placeholder="Min..."
          size="small"
          type="number"
        />

        <AppInput
          v-model="labelRangeMax"
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
        v-if="!isLabels || isEnabled"
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
          <IonIcon :icon="repeatOutline" />
        </AppButton>
      </h2>

      <div
        v-if="!isLabels || isEnabled"
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: sizes.$s0;
  gap: sizes.$p0;

  & > * {
    width: 100%;
  }
}

.grow {
  > div {
    width: 100%;
  }
}

.indicator-buttons {
  display: flex;
  gap: sizes.$p0;
}

.gradients {
  transform: translateY(-2px);
}
</style>
