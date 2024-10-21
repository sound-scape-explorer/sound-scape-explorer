<script lang="ts" setup>
import {DownloadOutline} from '@vicons/ionicons5';
import {NCascader, NSwitch, NTooltip} from 'naive-ui';
import AppButton from 'src/app/app-button.vue';
import AppDraggableSidebarHistory from 'src/app/app-draggable-sidebar-history.vue';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import AppDraggableSidebar from 'src/app/draggable-sidebar/app-draggable-sidebar.vue';
import {InjectionKey} from 'src/common/injection-key';
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

useRefProvide(InjectionKey.trajectoriesFuse, isFused);
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

        <NTooltip
          :show-arrow="false"
          placement="top-start"
          trigger="hover"
        >
          <!--suppress VueUnrecognizedSlot -->
          <template #trigger>
            <NSwitch
              v-model:value="isFused"
              :class="$style.switch"
              :disabled="!isFuseable"
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

      <div :class="$style['last-line']">
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

<style lang="scss" module>
.menu {
  width: $s0;
}

.selection {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $p0;
}

.switch {
  font-size: 0.9em;
  width: $p0 * 8;
}

.last-line {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-top: $p0;
}

.cascader {
  flex: 1;
  width: 15em;
}
</style>
