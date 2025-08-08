<script lang="ts" setup>
import {NSlider, NSpace} from 'naive-ui';
import AppSwitch from 'src/app/app-switch.vue';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import AppDraggableSidebar from 'src/app/draggable-sidebar/app-draggable-sidebar.vue';
import FilteringInfo from 'src/components/filtering-info/filtering-info.vue';
import {useScatterFilterSpatial} from 'src/components/scatter/use-scatter-filter-spatial';
import {DraggableKey} from 'src/composables/use-draggables';
import {useScatterGlobalFilter} from 'src/composables/use-scatter-global-filter';
import {useDraggableSelection} from 'src/draggables/selection/use-draggable-selection';
import {useSelectionProps} from 'src/draggables/selection/use-selection-props';
import {watch} from 'vue';

const {isActive, isFiltering, isWireframe} = useDraggableSelection();
const {filter} = useScatterFilterSpatial();
const {update} = useScatterGlobalFilter();

const {
  xRange,
  yRange,
  zRange,
  xBounds,
  yBounds,
  zBounds,
  tiltAngleX,
  tiltAngleY,
  tiltAngleZ,
  stepRange,
  stepAngle,
  resetRanges,
  expandRanges,
} = useSelectionProps();

watch(
  [isFiltering, xRange, yRange, zRange, tiltAngleX, tiltAngleY, tiltAngleZ],
  () => {
    filter();
    update();
  },
);
</script>

<template>
  <AppDraggable :draggable-key="DraggableKey.enum.selection">
    <AppDraggableSidebar>
      <FilteringInfo />
    </AppDraggableSidebar>

    <AppDraggableMenu :class="$style.menu">
      <h2>Wireframe</h2>

      <div>
        <AppSwitch
          v-model="isWireframe"
          checked="Yes"
          native
          unchecked="No"
        />
      </div>

      <h2>Display</h2>

      <div>
        <AppSwitch
          v-model="isActive"
          checked="Yes"
          native
          unchecked="No"
        />
      </div>

      <h2>Filtering</h2>

      <div>
        <AppSwitch
          v-model="isFiltering"
          checked="Yes"
          native
          unchecked="No"
        />
      </div>

      <h2>buttons</h2>

      <div>
        <button @click="resetRanges">reset</button>
        <button @click="expandRanges">expand</button>
      </div>

      <h2>xRange</h2>

      <div>
        <NSpace vertical>
          <NSlider
            v-model:value="xRange"
            :max="xBounds[1]"
            :min="xBounds[0]"
            :step="stepRange"
            range
          />
        </NSpace>
      </div>

      <h2>yRange</h2>

      <div>
        <NSpace vertical>
          <NSlider
            v-model:value="yRange"
            :max="yBounds[1]"
            :min="yBounds[0]"
            :step="stepRange"
            range
          />
        </NSpace>
      </div>

      <h2>zRange</h2>

      <div>
        <NSpace vertical>
          <NSlider
            v-model:value="zRange"
            :max="zBounds[1]"
            :min="zBounds[0]"
            :step="stepRange"
            range
          />
        </NSpace>
      </div>

      <h2>Angle X</h2>

      <NSpace vertical>
        <NSlider
          v-model:value="tiltAngleX"
          :max="90"
          :min="-90"
          :step="stepAngle"
        />
      </NSpace>

      <h2>Angle Y</h2>

      <NSpace vertical>
        <NSlider
          v-model:value="tiltAngleY"
          :max="90"
          :min="-90"
          :step="stepAngle"
        />
      </NSpace>

      <h2>Angle Z</h2>

      <NSpace vertical>
        <NSlider
          v-model:value="tiltAngleZ"
          :max="90"
          :min="-90"
          :step="stepAngle"
        />
      </NSpace>
    </AppDraggableMenu>
  </AppDraggable>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';

.menu {
  width: sizes.$s0;
}
</style>
