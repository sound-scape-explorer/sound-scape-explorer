<script lang="ts" setup="">
import AppButton from 'src/app/app-button.vue';
import AppIcon from 'src/app/app-icon.vue';
import AppSelect from 'src/app/select/app-select.vue';
import {
  SelectionBoxRenderMode,
  useSelectionBoxes,
} from 'src/draggables/selection/use-selection-boxes';
import {computed} from 'vue';

const {
  getCurrentBox,
  disableBox,
  enableBox,
  hideBox,
  showBox,
  randomizeBoxColor,
} = useSelectionBoxes();
const box = computed(() => getCurrentBox());
</script>

<template>
  <h2>Controls</h2>

  <div :class="$style.container">
    <div :class="$style.buttons">
      <AppButton
        :disabled="!box || box.isFiltering"
        :handle-click="box?.isRendering ? hideBox : showBox"
        :tooltip="`Render: ${box?.isRendering ? 'on' : 'off'}`"
        tooltipPlacement="top"
      >
        <AppIcon
          v-if="box?.isRendering"
          :color="box?.color"
          icon="eyeOn"
          size="small"
        />
        <AppIcon
          v-if="!box?.isRendering"
          icon="eyeOff"
          size="small"
        />
      </AppButton>

      <AppButton
        :disabled="!box || !box.isRendering"
        :handle-click="box?.isFiltering ? disableBox : enableBox"
        :tooltip="`Filter: ${box?.isFiltering ? 'on' : 'off'}`"
        tooltipPlacement="top"
      >
        <AppIcon
          v-if="box?.isFiltering"
          :color="box?.color"
          icon="filterOn"
          size="small"
        />
        <AppIcon
          v-if="!box?.isFiltering"
          icon="filterOff"
          size="small"
        />
      </AppButton>

      <AppButton
        :disabled="!box || !box.isRendering"
        :handle-click="randomizeBoxColor"
        tooltip="Randomize color"
        tooltip-placement="top"
      >
        <AppIcon
          icon="random"
          size="small"
        />
      </AppButton>
    </div>

    <div
      v-if="box"
      :class="$style.mode"
    >
      Mode
      <AppSelect
        v-model="box.renderMode"
        :disabled="!box.isRendering"
        :options="SelectionBoxRenderMode.options"
      />
    </div>
  </div>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';

.container {
  align-items: center;
  display: flex;
  gap: sizes.$g0;
  justify-content: space-between;
}

.buttons {
  align-items: center;
  display: flex;
  gap: sizes.$g0;
  justify-content: flex-start;
}

.mode {
  align-items: center;
  display: flex;
  gap: sizes.$p0;
  justify-content: center;
  justify-self: flex-end;

  & > :last-child {
    min-width: sizes.$p0 * 14;
  }
}
</style>
