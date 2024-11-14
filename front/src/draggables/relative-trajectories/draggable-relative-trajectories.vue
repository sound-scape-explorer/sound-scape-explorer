<script lang="ts" setup>
import {IonIcon} from '@ionic/vue';
import {chevronExpand, downloadOutline} from 'ionicons/icons';
import {NButton, NCascader} from 'naive-ui';
import AppButton from 'src/app/app-button.vue';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import AppDraggableSidebar from 'src/app/draggable-sidebar/app-draggable-sidebar.vue';
import AppPlot from 'src/app/plot/app-plot.vue';
import {useScatterLoading} from 'src/components/scatter/use-scatter-loading';
import {useDraggableRelativeTrajectories} from 'src/draggables/relative-trajectories/use-draggable-relative-trajectories';
import {useRelativeTrajectoriesData} from 'src/draggables/relative-trajectories/use-relative-trajectories-data';
import {useRelativeTrajectoriesExport} from 'src/draggables/relative-trajectories/use-relative-trajectories-export';
import {ref} from 'vue';

// TODO: split app plot for dedicated relative trajectories

const {names, labels, values, colors, exportName, handleUpdate} =
  useRelativeTrajectoriesData();
const {handleExportClick} = useRelativeTrajectoriesExport();
const {value, options} = useDraggableRelativeTrajectories();
const {isLoading} = useScatterLoading();

const isExpanded = ref<boolean>(false);
const toggleExpand = () => (isExpanded.value = !isExpanded.value);
</script>

<template>
  <AppDraggable
    draggable-key="relativeTrajectories"
    suspense="view"
  >
    <AppDraggableSidebar>
      <AppButton
        :handle-click="toggleExpand"
        size="tiny"
        small-tooltip
        tooltip="Expand horizontally"
        tooltip-placement="left"
      >
        <IonIcon
          :class="$style.rotate"
          :icon="chevronExpand"
        />
      </AppButton>
    </AppDraggableSidebar>

    <div :class="[$style.container, {[$style.expanded]: isExpanded}]">
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
          :is-expanded="isExpanded"
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

.expanded {
  width: $w-max;
}

.export {
  width: 100%;
}

.plot {
  width: 100%;
  height: 100%;
}

.rotate {
  @include rotate-90;
}
</style>
