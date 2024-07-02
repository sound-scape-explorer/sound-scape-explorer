<script lang="ts" setup="">
import {FlashOutline, RepeatOutline} from '@vicons/ionicons5';
import AppButton from 'src/app/app-button.vue';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import AppInput from 'src/app/input/app-input.vue';
import AppSelect from 'src/app/select/app-select.vue';
import {useColorSelection} from 'src/components/scatter/use-color-selection';
import {useScatterColorAlpha} from 'src/components/scatter/use-scatter-color-alpha';
import {useScatterLoading} from 'src/components/scatter/use-scatter-loading';
import {useIndicatorLimits} from 'src/composables/use-indicator-limits';
import {useRefProvide} from 'src/composables/use-ref-provide';
import {COLOR_FLAVORS} from 'src/constants';
import ColorsGradients from 'src/draggables/colors/draggable-colors-gradients.vue';
import {useColorByIndicator} from 'src/draggables/colors/use-color-by-indicator';

const {isLoading} = useScatterLoading();
const {criteria, criterias, category, categories, isIndicators} =
  useColorSelection();
const {flavor} = useColorSelection();
const {low, high} = useScatterColorAlpha();
const {min, max} = useColorByIndicator();
const {detect, swap} = useIndicatorLimits();

useRefProvide('colors/criteria', criteria);
useRefProvide('colors/category', category);
useRefProvide('colors/flavor', flavor);
useRefProvide('colors/alphaExcluded', low);
useRefProvide('colors/alphaIncluded', high);
useRefProvide('colors/indicatorMin', min);
useRefProvide('colors/indicatorMax', max);
</script>

<template>
  <AppDraggable draggable-key="colors">
    <AppDraggableMenu
      class="menu"
      size="medium"
    >
      <span>With</span>

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

      <span
        v-if="isIndicators"
        class="indicator-buttons"
      >
        <AppButton
          :handle-click="detect"
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
      </span>

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

      <span>Opacity</span>
      <div class="two">
        <AppInput
          :disabled="isLoading"
          :max="1"
          :min="0.005"
          :step="0.005"
          align="left"
          injection-key="colors/alphaExcluded"
          size="small"
          tooltip="Opacity for filtered points"
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

      <span>Map</span>
      <ColorsGradients />

      <span>Flavor</span>
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
</style>
