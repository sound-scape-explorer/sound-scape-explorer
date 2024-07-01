<script lang="ts" setup>
import {DownloadOutline} from '@vicons/ionicons5';
import {NCascader, NSwitch, NTooltip} from 'naive-ui';
import AppButtonNew from 'src/app/app-button-new.vue';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import {useScatterLoading} from 'src/components/scatter/use-scatter-loading';
import {useScatterTraces} from 'src/components/scatter/use-scatter-traces';
import {useTrajectoriesData} from 'src/composables/use-trajectories-data';
import {useTrajectoriesSelection} from 'src/composables/use-trajectories-selection';
import TrajectoriesColorScale from 'src/draggables/trajectories/draggable-trajectories-gradient.vue';
import {useDraggableTrajectories} from 'src/draggables/trajectories/use-draggable-trajectories';
import {useDraggableTrajectoriesExport} from 'src/draggables/trajectories/use-draggable-trajectories-export';
import {watch} from 'vue';

const {select} = useTrajectoriesSelection();
const {isFused} = useTrajectoriesData();
const {isLoading} = useScatterLoading();
const {options, isFuseable, selection} = useDraggableTrajectories();
const {handleClick} = useDraggableTrajectoriesExport();

const handleUpdateValue = async (names: string[]) => {
  await select(names);
};

const {renderTraces} = useScatterTraces();

watch(isFused, renderTraces);
</script>

<template>
  <AppDraggable draggable-key="trajectories">
    <AppDraggableMenu size="medium">
      <span class="text">Trajectories</span>

      <div class="selection">
        <NCascader
          v-model:value="selection"
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
          size="tiny"
          @update:value="handleUpdateValue"
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

      <span class="text">Colormap</span>

      <TrajectoriesColorScale />

      <span />

      <div class="last-line">
        <AppButtonNew
          :handle-click="handleClick"
          icon
          tooltip="Export"
          tooltip-placement="bottom"
        >
          <DownloadOutline />
        </AppButtonNew>
      </div>
    </AppDraggableMenu>
  </AppDraggable>
</template>

<style lang="scss" scoped>
.text {
  font-size: 0.9em;
}

.selection {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
}

.switch {
  width: 6em;
  font-size: 0.9em;
}

.last-line {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.cascader {
  width: 15em;
}
</style>
