<script lang="ts" setup="">
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import AppInput from 'src/app/input/app-input.vue';
import AppSelect from 'src/app/select/app-select.vue';
import {useColorSelection} from 'src/components/scatter/use-color-selection';
import {useScatterColorAlpha} from 'src/components/scatter/use-scatter-color-alpha';
import {useScatterLoading} from 'src/components/scatter/use-scatter-loading';
import {useRefProvide} from 'src/composables/use-ref-provide';
import {COLOR_FLAVORS} from 'src/constants';
import ColorsGradients from 'src/draggables/colors/draggable-colors-gradients.vue';
import {useColorType} from 'src/draggables/colors/use-color-type';

const {isLoading} = useScatterLoading();
const {type} = useColorSelection();
const {options} = useColorType();
const {flavor} = useColorSelection();
const {low, high} = useScatterColorAlpha();

useRefProvide('colors/flavor', flavor);
useRefProvide('colors/type', type);
useRefProvide('colors/alphaExcluded', low);
useRefProvide('colors/alphaIncluded', high);
</script>

<template>
  <AppDraggable draggable-key="colors">
    <AppDraggableMenu
      class="menu"
      size="medium"
    >
      <span>Criteria</span>
      <AppSelect
        :disabled="isLoading"
        :options="options"
        injection-key="colors/type"
        placeholder="Color type..."
        size="small"
      />

      <span>Opacity</span>
      <div class="opacity">
        <AppInput
          :disabled="isLoading"
          :max="1"
          :min="0.005"
          :step="0.005"
          align="left"
          class="input"
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
          class="input"
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
  width: 30em;
}

.opacity {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}
</style>
