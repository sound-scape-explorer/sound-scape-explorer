<script lang="ts" setup>
import {IonIcon} from '@ionic/vue';
import {downloadOutline} from 'ionicons/icons';
import {NCascader, NSwitch} from 'naive-ui';
import AppButton from 'src/app/app-button.vue';
import AppDraggableSidebarHistory from 'src/app/app-draggable-sidebar-history.vue';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import {SuspenseCase} from 'src/app/draggable/use-app-draggable-suspense';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import AppDraggableSidebar from 'src/app/draggable-sidebar/app-draggable-sidebar.vue';
import AppSelect from 'src/app/select/app-select.vue';
import {useScatterLoading} from 'src/components/scatter/use-scatter-loading';
import {useScatterRender} from 'src/components/scatter/use-scatter-render';
import {
  CyclingPeriod,
  useScatterTrajectoryCyclingPeriod,
} from 'src/components/scatter/use-scatter-trajectory-cycling-period';
import {DraggableKey} from 'src/composables/use-draggables';
import {useTrajectories} from 'src/composables/use-trajectories';
import {useTrajectoriesSelection} from 'src/composables/use-trajectories-selection';
import TrajectoriesColorScale from 'src/draggables/trajectories/draggable-trajectories-gradient.vue';
import {useDraggableTrajectoriesExport} from 'src/draggables/trajectories/use-draggable-trajectories-export';
import {useTrajectoriesOptions} from 'src/draggables/trajectories/use-trajectories-options';
import {watch} from 'vue';

const {current, undo, redo, canUndo, canRedo, update} =
  useTrajectoriesSelection();
const {isFused} = useTrajectories();
const {isLoading} = useScatterLoading();
const {options, isFuseable} = useTrajectoriesOptions();
const {handleClick} = useDraggableTrajectoriesExport();
const {render} = useScatterRender();
const {cyclingPeriod} = useScatterTrajectoryCyclingPeriod();

watch(isFused, render);
watch(current, update);
</script>

<template>
  <AppDraggable
    :class="$style.container"
    :draggable-key="DraggableKey.enum.trajectories"
    :suspense="SuspenseCase.enum.NO_TRAJECTORIES"
  >
    <AppDraggableSidebar>
      <AppDraggableSidebarHistory
        :can-redo="canRedo && !isFused"
        :can-undo="canUndo && !isFused"
        :redo="redo"
        :undo="undo"
        redo-tooltip="Next trajectory"
        undo-tooltip="Previous trajectory"
      />
    </AppDraggableSidebar>

    <AppDraggableMenu :class="$style.menu">
      <h2>Trajectories</h2>

      <div :class="$style.selection">
        <NCascader
          v-model:value="current"
          :cascade="false"
          :class="$style.cascader"
          :clear-filter-after-select="false"
          :disabled="isLoading || isFused"
          :filterable="false"
          :options="options"
          :show-path="false"
          check-strategy="child"
          clearable
          expand-trigger="click"
          max-tag-count="responsive"
          multiple
          placeholder="Select trajectories"
          size="small"
        />
      </div>

      <h2>Average</h2>

      <div :class="$style['average-and-period']">
        <div>
          <NSwitch
            v-model:value="isFused"
            :class="$style.switch"
            :disabled="!isFuseable"
            size="small"
          >
            <template #checked>yes</template>
          </NSwitch>
        </div>

        <h2 style="justify-content: center">Cycling period</h2>

        <AppSelect
          v-model="cyclingPeriod"
          :options="CyclingPeriod.options"
          placeholder="Period..."
          size="small"
        />
      </div>

      <h2>Colormap</h2>

      <TrajectoriesColorScale />

      <span />

      <div :class="$style['last-line']">
        <AppButton
          :handle-click="handleClick"
          size="small"
          tooltip="Export"
          tooltip-placement="bottom"
        >
          <IonIcon :icon="downloadOutline" />
        </AppButton>
      </div>
    </AppDraggableMenu>
  </AppDraggable>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';

.container {
  width: sizes.$s2;
}

.menu {
  width: sizes.$s0;
}

.selection {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: sizes.$p0;
}

.last-line {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-top: sizes.$p0;
}

.cascader {
  flex: 1;
  width: 15em;
}

.average-and-period {
  display: grid;
  grid-template-columns: 1fr sizes.$p0 * 12 1fr;
  gap: sizes.$p0;
}
</style>
