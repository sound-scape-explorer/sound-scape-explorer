<script lang="ts" setup="">
import {IonIcon} from '@ionic/vue';
import {downloadOutline} from 'ionicons/icons';
import {NCascader} from 'naive-ui';
import AppButton from 'src/app/app-button.vue';
import AppDraggableMenuPlotSizes from 'src/app/app-draggable-menu-plot-sizes.vue';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import {InjectionKey} from 'src/common/injection-key';
import {useScatterLoading} from 'src/components/scatter/use-scatter-loading';
import {useRefProvide} from 'src/composables/use-ref-provide';
import {useDraggableRelativeTrajectories} from 'src/draggables/relative-trajectories/use-draggable-relative-trajectories';
import {useRelativeTrajectoriesData} from 'src/draggables/relative-trajectories/use-relative-trajectories-data';
import {useRelativeTrajectoriesExport} from 'src/draggables/relative-trajectories/use-relative-trajectories-export';
import {useRelativeTrajectoriesPlotSize} from 'src/draggables/relative-trajectories/use-relative-trajectories-plot-size';

const {value, options} = useDraggableRelativeTrajectories();
const {handleUpdate} = useRelativeTrajectoriesData();
const {isLoading} = useScatterLoading();
const {handleExportClick} = useRelativeTrajectoriesExport();
const {height} = useRelativeTrajectoriesPlotSize();

useRefProvide(InjectionKey.relativeTrajectoriesPlotHeight, height);
</script>

<template>
  <AppDraggableMenu>
    <h2>Select</h2>

    <div :class="$style['first-row']">
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
    </div>

    <h2>Plot height</h2>

    <div :class="$style['last-row']">
      <AppDraggableMenuPlotSizes
        :disabled="false"
        :height="InjectionKey.relativeTrajectoriesPlotHeight"
        only-factors
      />

      <AppButton
        :handle-click="handleExportClick"
        size="small"
        tooltip="Export .csv"
        tooltip-placement="bottom"
      >
        <IonIcon :icon="downloadOutline" />
      </AppButton>
    </div>
  </AppDraggableMenu>
</template>

<style lang="scss" module>
.first-row {
  display: flex;
  align-items: center;
  justify-content: flex-start;

  & > div {
    flex: 1;
    width: 15em;
  }
}

.last-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.export {
  width: 100%;
}
</style>
