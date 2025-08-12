<script lang="ts" setup>
import {NList, NListItem, NSlider, NSpace} from 'naive-ui';
import AppButton from 'src/app/app-button.vue';
import AppIcon from 'src/app/app-icon.vue';
import AppSwitch from 'src/app/app-switch.vue';
import AppTooltip from 'src/app/app-tooltip.vue';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import AppDraggableSidebar from 'src/app/draggable-sidebar/app-draggable-sidebar.vue';
import AppInput from 'src/app/input/app-input.vue';
import FilteringInfo from 'src/components/filtering-info/filtering-info.vue';
import {useScatterCamera} from 'src/components/scatter/use-scatter-camera';
import {useScatterFilterSpatial} from 'src/components/scatter/use-scatter-filter-spatial';
import {DraggableKey} from 'src/composables/use-draggables';
import {useScatterGlobalFilter} from 'src/composables/use-scatter-global-filter';
import {useThemeColors} from 'src/composables/use-theme-colors';
import {useDraggableSelection} from 'src/draggables/selection/use-draggable-selection';
import {useSelectionState} from 'src/draggables/selection/use-selection-state';
import {useSelectionStorage} from 'src/draggables/selection/use-selection-storage';
import {computed, watch} from 'vue';

const {isActive, isFiltering, isWireframe} = useDraggableSelection();
const {filter} = useScatterFilterSpatial();
const {update} = useScatterGlobalFilter();
const {lock, unlock} = useScatterCamera();
const {colors} = useThemeColors();

const {
  name,
  xRange,
  yRange,
  zRange,
  xBounds,
  yBounds,
  zBounds,
  xAngle,
  yAngle,
  zAngle,
  stepRange,
  stepAngle,
  resetRanges,
  expandRanges,
} = useSelectionState();

const {selections, use, save, remove} = useSelectionStorage();

const nameExists = computed(
  () => selections.value.filter((s) => s.name === name.value).length > 0,
);

watch([isFiltering, xRange, yRange, zRange, xAngle, yAngle, zAngle], () => {
  filter();
  update();
});
</script>

<template>
  <AppDraggable :draggable-key="DraggableKey.enum.selection">
    <AppDraggableSidebar>
      <FilteringInfo />
    </AppDraggableSidebar>

    <AppDraggableMenu :class="$style.menu">
      <span>list</span>

      <div>
        <NList
          clickable
          hoverable
        >
          <NListItem
            v-for="s in selections"
            :class="[
              $style['list-item'],
              {[$style['list-item-active']]: s.name === name},
            ]"
            @click="() => use(s)"
          >
            {{ s.name }}
          </NListItem>
        </NList>
      </div>

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
        <AppButton :handle-click="resetRanges">reset</AppButton>
        <AppButton :handle-click="expandRanges">expand</AppButton>
        <AppButton :handle-click="save">save</AppButton>
        <AppButton :handle-click="remove">delete</AppButton>
      </div>

      <h2 :class="$style.name">
        name
        <AppTooltip placement="bottom">
          <template #body>
            <AppIcon
              v-if="nameExists"
              color="active"
              icon="error"
              size="small"
            />
          </template>

          <template #tooltip>already exists</template>
        </AppTooltip>
      </h2>

      <div>
        <AppInput
          v-model="name"
          align="left"
        />
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
            @mousedown="lock"
            @mouseup="unlock"
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
            @mousedown="lock"
            @mouseup="unlock"
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
            @mousedown="lock"
            @mouseup="unlock"
          />
        </NSpace>
      </div>

      <h2>Angle X</h2>

      <NSpace vertical>
        <NSlider
          v-model:value="xAngle"
          :max="90"
          :min="-90"
          :step="stepAngle"
          @mousedown="lock"
          @mouseup="unlock"
        />
      </NSpace>

      <h2>Angle Y</h2>

      <NSpace vertical>
        <NSlider
          v-model:value="yAngle"
          :max="90"
          :min="-90"
          :step="stepAngle"
          @mousedown="lock"
          @mouseup="unlock"
        />
      </NSpace>

      <h2>Angle Z</h2>

      <NSpace vertical>
        <NSlider
          v-model:value="zAngle"
          :max="90"
          :min="-90"
          :step="stepAngle"
          @mousedown="lock"
          @mouseup="unlock"
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

.name {
  align-items: center;
  display: flex;
  gap: sizes.$g0;
  justify-content: flex-start;

  & > div > svg {
    transform: translate3d(0, 1px, 0);

    & > path {
      fill: red !important;
    }
  }
}

.list-item:hover {
  background: v-bind('colors.primaryColor') !important;
}

.list-item-active {
  background: v-bind('colors.actionColor');
}
</style>
