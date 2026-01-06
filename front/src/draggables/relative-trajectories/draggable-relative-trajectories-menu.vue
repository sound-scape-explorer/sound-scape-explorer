<script lang="ts" setup>
import {NCascader} from 'naive-ui';
import AppButton from 'src/app/app-button.vue';
import AppDraggableMenuPlotSizes from 'src/app/app-draggable-menu-plot-sizes.vue';
import AppIcon from 'src/app/app-icon.vue';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import AppSelect from 'src/app/select/app-select.vue';
import {useScatterLoading} from 'src/components/scatter/use-scatter-loading';
import {useDraggableRelativeTrajectories} from 'src/draggables/relative-trajectories/use-draggable-relative-trajectories';
import {useRelativeTrajectoriesData} from 'src/draggables/relative-trajectories/use-relative-trajectories-data';
import {useRelativeTrajectoriesExport} from 'src/draggables/relative-trajectories/use-relative-trajectories-export';
import {useRelativeTrajectoriesPlotSize} from 'src/draggables/relative-trajectories/use-relative-trajectories-plot-size';
import {
  RelativeTrajectoryStrategy,
  useRelativeTrajectoriesStrategy,
} from 'src/draggables/relative-trajectories/use-relative-trajectories-strategy';

const {selected, options} = useDraggableRelativeTrajectories();
const {handleUpdate} = useRelativeTrajectoriesData();
const {isLoading} = useScatterLoading();
const {handleExportClick} = useRelativeTrajectoriesExport();
const {height} = useRelativeTrajectoriesPlotSize();
const {strategy} = useRelativeTrajectoriesStrategy();
</script>

<template>
  <AppDraggableMenu>
    <h2>Select</h2>

    <div :class="$style['first-row']">
      <NCascader
        v-model:value="selected"
        :cascade="false"
        :clear-filter-after-select="false"
        :disabled="isLoading"
        :filterable="false"
        :options="options"
        :show-path="false"
        :virtual-scroll="false"
        check-strategy="child"
        clearable
        expand-trigger="click"
        max-tag-count="responsive"
        multiple
        placeholder="Select relative trajectories"
        size="small"
        @update:value="handleUpdate"
      />
    </div>

    <h2>Display</h2>

    <div :class="$style['last-row']">
      <AppSelect
        v-model="strategy"
        :class="$style.strategy"
        :options="RelativeTrajectoryStrategy.options"
        placeholder="Strategy..."
        size="small"
        @update:model-value="() => handleUpdate(selected)"
      />
    </div>

    <h2>Plot height</h2>

    <div :class="$style['last-row']">
      <AppDraggableMenuPlotSizes
        v-model:height="height"
        :disabled="false"
        only-factors
      />

      <AppButton
        :handle-click="handleExportClick"
        size="small"
        tooltip="Export .csv"
        tooltip-placement="bottom"
      >
        <AppIcon
          icon="download"
          size="small"
        />
      </AppButton>
    </div>
  </AppDraggableMenu>
</template>

<style lang="scss" module>
.first-row {
  align-items: center;
  display: flex;
  justify-content: flex-start;

  & > div {
    flex: 1;
    width: 15em;
  }
}

.last-row {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.export {
  width: 100%;
}

.strategy {
  width: 10em;
}
</style>
