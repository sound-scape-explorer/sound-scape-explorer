<script lang="ts" setup>
import {IonIcon} from '@ionic/vue';
import {downloadOutline} from 'ionicons/icons';
import {NButton, NCascader} from 'naive-ui';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import AppPlot from 'src/app/plot/app-plot.vue';
import {useScatterLoading} from 'src/components/scatter/use-scatter-loading';
import {useDraggableRelativeTrajectories} from 'src/draggables/relative-trajectories/use-draggable-relative-trajectories';
import {useRelativeTrajectoriesData} from 'src/draggables/relative-trajectories/use-relative-trajectories-data';
import {useRelativeTrajectoriesExport} from 'src/draggables/relative-trajectories/use-relative-trajectories-export';

// TODO: make zoom unzoom for hd raster exports
// TODO: split app plot for dedicated relative trajectories

const {names, labels, values, colors, exportName, handleUpdate} =
  useRelativeTrajectoriesData();
const {handleExportClick} = useRelativeTrajectoriesExport();
const {value, options} = useDraggableRelativeTrajectories();
const {isLoading} = useScatterLoading();
</script>

<template>
  <AppDraggable
    draggable-key="relativeTrajectories"
    suspense="view"
  >
    <div :class="$style.container">
      <NCascader
        v-model:value="value"
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

      <NButton
        :class="$style.export"
        size="tiny"
        @click="handleExportClick"
      >
        <IonIcon :icon="downloadOutline" />
        Export .csv
      </NButton>

      <div :class="$style.plot">
        <AppPlot
          :colors="colors"
          :export-filename="exportName"
          :labels="labels"
          :names="names"
          :values="values"
          hover-template="relative-trajectories"
          legend
          title="Relative Trajectories"
          xTitle="Relative daytime"
          yTitle="Relative distance from average starting point"
        />
      </div>
    </div>
  </AppDraggable>
</template>

<style lang="scss" module>
.container {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  width: $s2;
  gap: $p0;
}

.export {
  width: 100%;
}

.plot {
  width: 100%;
  height: 100%;
}
</style>
