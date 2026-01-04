<script lang="ts" setup="">
import {NSlider} from 'naive-ui';
import AppButton from 'src/app/app-button.vue';
import AppIcon from 'src/app/app-icon.vue';
import {useScatterCamera} from 'src/components/scatter/use-scatter-camera';
import {useScatterDimensions} from 'src/components/scatter/use-scatter-dimensions';
import {SELECTION_ANGLE_STEP, SELECTION_RANGE_STEP} from 'src/constants';
import {useSelectionBoundaries} from 'src/draggables/selection/use-selection-boundaries';
import {useSelectionBoxes} from 'src/draggables/selection/use-selection-boxes';
import {computed} from 'vue';

const {getCurrentBox, resetBoxAngles, shrinkBox, expandBox} =
  useSelectionBoxes();
const box = computed(() => getCurrentBox());
const {lock, unlock} = useScatterCamera();
const {is3d} = useScatterDimensions();

const {boundaries} = useSelectionBoundaries();
</script>

<template>
  <span />

  <div
    v-if="box"
    :class="$style.container"
  >
    <div>
      <span>Ranges</span>

      <AppButton
        :disabled="!box || !box.isRendering"
        :handle-click="shrinkBox"
        tooltip="Shrink"
        tooltip-placement="top"
      >
        <AppIcon
          icon="shrink"
          size="small"
        />
      </AppButton>

      <AppButton
        :disabled="!box || !box.isRendering"
        :handle-click="expandBox"
        tooltip="Expand"
        tooltip-placement="top"
      >
        <AppIcon
          icon="expand"
          size="small"
        />
      </AppButton>
    </div>
    <div>
      <span>Angle</span>
      <AppButton
        :handle-click="resetBoxAngles"
        tooltip="Reset angles"
        tooltip-placement="top"
      >
        <AppIcon
          icon="reset"
          size="small"
        />
      </AppButton>
    </div>
  </div>

  <h2
    v-if="box"
    :class="$style.title"
  >
    x
  </h2>

  <div
    v-if="box"
    :class="$style.container"
  >
    <NSlider
      v-model:value="box.ranges.x"
      :max="boundaries.x[1]"
      :min="boundaries.x[0]"
      :step="SELECTION_RANGE_STEP"
      range
      @mousedown="lock"
      @mouseup="unlock"
    />

    <NSlider
      v-model:value="box.angles.x"
      :disabled="!is3d"
      :max="90"
      :min="-90"
      :step="SELECTION_ANGLE_STEP"
      @mousedown="lock"
      @mouseup="unlock"
    />
  </div>

  <h2
    v-if="box"
    :class="$style.title"
  >
    y
  </h2>

  <div
    v-if="box"
    :class="$style.container"
  >
    <NSlider
      v-model:value="box.ranges.y"
      :max="boundaries.y[1]"
      :min="boundaries.y[0]"
      :step="SELECTION_RANGE_STEP"
      range
      @mousedown="lock"
      @mouseup="unlock"
    />

    <NSlider
      v-model:value="box.angles.y"
      :disabled="!is3d"
      :max="90"
      :min="-90"
      :step="SELECTION_ANGLE_STEP"
      @mousedown="lock"
      @mouseup="unlock"
    />
  </div>

  <h2
    v-if="box"
    :class="$style.title"
  >
    z
  </h2>

  <div
    v-if="box"
    :class="$style.container"
  >
    <NSlider
      v-model:value="box.ranges.z"
      :disabled="!is3d"
      :max="boundaries.z[1]"
      :min="boundaries.z[0]"
      :step="SELECTION_RANGE_STEP"
      range
      @mousedown="lock"
      @mouseup="unlock"
    />

    <NSlider
      v-model:value="box.angles.z"
      :max="90"
      :min="-90"
      :step="SELECTION_ANGLE_STEP"
      @mousedown="lock"
      @mouseup="unlock"
    />
  </div>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';

.title {
  align-items: center;
  display: flex;
  justify-content: flex-end;
  padding-right: sizes.$p0;
}

.container {
  display: grid;
  gap: sizes.$p0;
  grid-template-columns: 3fr 1fr;
  justify-items: center;

  & > div {
    display: flex;
    gap: sizes.$g0;
    justify-content: center;
    transform: translate3d(0, 2px, 0);
    width: 100%;
  }
}
</style>
