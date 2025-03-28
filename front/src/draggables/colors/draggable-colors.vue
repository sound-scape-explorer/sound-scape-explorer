<script lang="ts" setup="">
import {IonIcon} from '@ionic/vue';
import {flashOutline, repeatOutline} from 'ionicons/icons';
import AppButton from 'src/app/app-button.vue';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import AppInput from 'src/app/input/app-input.vue';
import AppSelect from 'src/app/select/app-select.vue';
import {InjectionKey} from 'src/common/injection-key';
import {useScatterColorAlpha} from 'src/components/scatter/use-scatter-color-alpha';
import {useScatterLoading} from 'src/components/scatter/use-scatter-loading';
import {useColorInvert} from 'src/composables/use-color-invert';
import {useIndicatorLimits} from 'src/composables/use-indicator-limits';
import {useRefProvide} from 'src/composables/use-ref-provide';
import {COLOR_FLAVORS} from 'src/constants';
import ColorsGradients from 'src/draggables/colors/draggable-colors-gradients.vue';
import DraggableColorsLabelNumeric from 'src/draggables/colors/draggable-colors-label-numeric.vue';
import {useColorByIndicator} from 'src/draggables/colors/use-color-by-indicator';
import {useColorByLabel} from 'src/draggables/colors/use-color-by-label';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {useColorState} from 'src/draggables/colors/use-color-state';
import {useLabelNumeric} from 'src/draggables/labels/use-label-numeric';

const {isLoading} = useScatterLoading();
const {flavor, criteria, criterias, category, categories} = useColorSelection();
const {isIndicators, isLabels, isLabelNumeric} = useColorState();

const {low, high} = useScatterColorAlpha();
const {min: indicatorRangeMin, max: indicatorRangeMax} = useColorByIndicator();
const {min: labelRangeMin, max: labelRangeMax} = useColorByLabel();
const {detect: detectIndicatorRange, swap} = useIndicatorLimits();
const {invert, isReversible} = useColorInvert();
const {isEnabled} = useLabelNumeric();

useRefProvide(InjectionKey.colorsCriteria, criteria);
useRefProvide(InjectionKey.colorsCategory, category);
useRefProvide(InjectionKey.colorsFlavor, flavor);
useRefProvide(InjectionKey.colorsAlphaExcluded, low);
useRefProvide(InjectionKey.colorsAlphaIncluded, high);
useRefProvide(InjectionKey.colorsIndicatorMin, indicatorRangeMin);
useRefProvide(InjectionKey.colorsIndicatorMax, indicatorRangeMax);
useRefProvide(InjectionKey.colorsLabelRangeMin, labelRangeMin);
useRefProvide(InjectionKey.colorsLabelRangeMax, labelRangeMax);
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
          :disabled="isLoading"
          :injection-key="InjectionKey.colorsCategory"
          :options="categories"
          placeholder="Category..."
          size="small"
        />

        <AppSelect
          :disabled="isLoading"
          :injection-key="InjectionKey.colorsCriteria"
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
          :injection-key="InjectionKey.colorsIndicatorMin"
          placeholder="Min..."
          size="small"
          type="number"
        />

        <AppInput
          :injection-key="InjectionKey.colorsIndicatorMax"
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
          :disabled="!isEnabled"
          :injection-key="InjectionKey.colorsLabelRangeMin"
          placeholder="Min..."
          size="small"
          type="number"
        />

        <AppInput
          :disabled="!isEnabled"
          :injection-key="InjectionKey.colorsLabelRangeMax"
          placeholder="Max..."
          size="small"
          type="number"
        />
      </div>

      <h2>Opacity</h2>

      <div :class="$style.two">
        <AppInput
          :disabled="isLoading"
          :injection-key="InjectionKey.colorsAlphaExcluded"
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
          :disabled="isLoading"
          :injection-key="InjectionKey.colorsAlphaIncluded"
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
        :disabled="isLoading"
        :injection-key="InjectionKey.colorsFlavor"
        :options="COLOR_FLAVORS"
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
.two {
  display: flex;
  align-items: center;
  justify-content: center;
  width: $s0;
  gap: $p0;

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
  gap: $p0;
}

.gradients {
  transform: translateY(-2px);
}
</style>
