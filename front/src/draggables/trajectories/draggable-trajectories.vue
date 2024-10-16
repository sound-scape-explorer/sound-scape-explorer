<script lang="ts" setup>
import {DownloadOutline} from '@vicons/ionicons5';
import {NCascader, NSwitch, NTooltip} from 'naive-ui';
import AppButton from 'src/app/app-button.vue';
import AppDraggableSidebarHistory from 'src/app/app-draggable-sidebar-history.vue';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import AppDraggableSidebar from 'src/app/draggable-sidebar/app-draggable-sidebar.vue';
import {useScatterLoading} from 'src/components/scatter/use-scatter-loading';
import {useScatterTraces} from 'src/components/scatter/use-scatter-traces';
import {useRefProvide} from 'src/composables/use-ref-provide';
import {useTrajectoriesData} from 'src/composables/use-trajectories-data';
import {useTrajectoriesSelection} from 'src/composables/use-trajectories-selection';
import TrajectoriesColorScale from 'src/draggables/trajectories/draggable-trajectories-gradient.vue';
import {useDraggableTrajectoriesExport} from 'src/draggables/trajectories/use-draggable-trajectories-export';
import {useTrajectoriesOptions} from 'src/draggables/trajectories/use-trajectories-options';
import {watch} from 'vue';

const {current, undo, redo, canUndo, canRedo, update} =
  useTrajectoriesSelection();
const {isFused} = useTrajectoriesData();
const {isLoading} = useScatterLoading();
const {options, isFuseable} = useTrajectoriesOptions();
const {handleClick} = useDraggableTrajectoriesExport();
const {renderTraces} = useScatterTraces();

watch(isFused, renderTraces);
watch(current, update);

useRefProvide('trajectories/fuse', isFused);
</script>

<template>
  <AppDraggable draggable-key="trajectories">
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

    <AppDraggableMenu class="draggableTrajectoriesMenu">
      <h2>Trajectories</h2>

      <div class="selection">
        <NCascader
          v-model:value="current"
          :cascade="false"
          :clear-filter-after-select="false"
          :disabled="isLoading || isFused"
          :filterable="false"
          :options="options"
          :show-path="false"
          check-strategy="child"
          class="cascader"
          clearable
          expand-trigger="click"
          max-tag-count="responsive"
          multiple
          placeholder="Select trajectories"
          size="small"
        />

        <NTooltip
          :show-arrow="false"
          placement="top-start"
          trigger="hover"
        >
          <!--suppress VueUnrecognizedSlot -->
          <template #trigger>
            <NSwitch
              v-model:value="isFused"
              :disabled="!isFuseable"
              class="switch"
              size="small"
            >
              <template #checked> fuse</template>
            </NSwitch>
          </template>
          Fuse trajectories
        </NTooltip>
      </div>

      <h2>Colormap</h2>

      <TrajectoriesColorScale />

      <span />

      <div class="last-line">
        <AppButton
          :handle-click="handleClick"
          icon
          size="small"
          tooltip="Export"
          tooltip-placement="bottom"
        >
          <DownloadOutline />
        </AppButton>
      </div>
    </AppDraggableMenu>
  </AppDraggable>
</template>

<style lang="scss" scoped>
.draggableTrajectoriesMenu {
  width: $s0;
}

.selection {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: $p0;
}

.switch {
  width: $p0 * 8;
  font-size: 0.9em;
}

.last-line {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: $p0;
}

.cascader {
  width: 15em;
  flex: 1;
}
</style>
