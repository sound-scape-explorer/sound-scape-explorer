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
import {computed, ref, watch} from 'vue';

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

const {selections, use, save, remove, exportJson, importJson} =
  useSelectionStorage();

const selection = computed(() => {
  return selections.value.find((s) => s.name === name.value);
});

const hasIdenticalSave = computed(() => {
  if (!selection.value) {
    return false;
  }

  return (
    xRange.value === selection.value.xRange &&
    yRange.value === selection.value.yRange &&
    zRange.value === selection.value.zRange &&
    xAngle.value === selection.value.xAngle &&
    yAngle.value === selection.value.yAngle &&
    zAngle.value === selection.value.zAngle
  );
});

const fileInput = ref<HTMLInputElement>();

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileInputChange = (e: Event) => {
  e.preventDefault();
  const target = e.target as HTMLInputElement;

  if (target.files && target.files[0]) {
    const file = target.files[0];
    importJson(file);
  }
};

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
      <h2>Filtering</h2>

      <div :class="$style.toggles">
        <div>
          <AppSwitch
            v-model="isFiltering"
            checked="Yes"
            native
            unchecked="No"
          />
        </div>

        <div>
          <span>Display</span>

          <div>
            <AppSwitch
              v-model="isActive"
              checked="Yes"
              native
              unchecked="No"
            />
          </div>
        </div>

        <div>
          <span>Wireframe</span>

          <div>
            <AppSwitch
              v-model="isWireframe"
              checked="Yes"
              native
              unchecked="No"
            />
          </div>
        </div>
      </div>

      <h2>Quick control</h2>

      <div :class="$style.buttons">
        <AppButton :handle-click="resetRanges">reset</AppButton>
        <AppButton :handle-click="expandRanges">expand</AppButton>
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

      <h2 :class="$style.name">
        Current
        <AppTooltip placement="top">
          <template #tooltip>You have unsaved changes</template>
          <template #body>
            <AppIcon
              v-if="!hasIdenticalSave"
              color="active"
              icon="delta"
              size="small"
            />
          </template>
        </AppTooltip>
      </h2>

      <div :class="$style.input">
        <AppInput
          v-model="name"
          align="left"
        />

        <AppButton
          :disabled="hasIdenticalSave"
          :handle-click="save"
        >
          save
        </AppButton>

        <AppButton
          :disabled="!selection"
          :handle-click="remove"
        >
          delete
        </AppButton>
      </div>

      <div :class="$style.saves">
        Saves

        <div>
          <AppTooltip placement="bottom">
            <template #body>
              <input
                ref="fileInput"
                :class="$style['import']"
                accept="application/json"
                type="file"
                @change="handleFileInputChange"
              />
              <AppButton :handle-click="triggerFileInput">
                <AppIcon
                  icon="import"
                  size="small"
                />
              </AppButton>
            </template>

            <template #tooltip>Import</template>
          </AppTooltip>

          <AppTooltip placement="bottom">
            <template #body>
              <AppButton
                :disabled="selections.length === 0"
                :handle-click="exportJson"
              >
                <AppIcon
                  icon="export"
                  size="small"
                />
              </AppButton>
            </template>

            <template #tooltip>Export</template>
          </AppTooltip>
        </div>
      </div>

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

  & > svg {
    transform: translate3d(0, 1px, 0);
  }
}

.buttons {
  display: flex;
  gap: sizes.$g0;
}

.list-item:hover {
  background: v-bind('colors.primaryColor') !important;
}

.list-item-active {
  background: v-bind('colors.actionColor');
}

.toggles {
  align-items: center;
  display: flex;
  gap: sizes.$g0;
  justify-content: space-between;

  & > div {
    display: flex;
    gap: sizes.$g0 * 2;
  }
}

.input {
  align-items: center;
  display: flex;
  gap: sizes.$g0;

  & > :first-child {
    width: 100%;
  }
}

.saves {
  display: flex;
  flex-direction: column;

  & > div {
    align-items: center;
    display: flex;
    gap: sizes.$g0;
    justify-content: flex-start;

    input {
      display: none;
    }
  }
}
</style>
