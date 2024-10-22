<script lang="ts" setup="">
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import AppHeatmap from 'src/app/heatmap/app-heatmap.vue';
import {useExportName} from 'src/composables/use-export-name';
import DraggableHeatmapsMenu from 'src/draggables/heatmaps/draggable-heatmaps-menu.vue';
import {useDraggableHeatmaps} from 'src/draggables/heatmaps/use-draggable-heatmaps';
import {useDraggableHeatmapsChart} from 'src/draggables/heatmaps/use-draggable-heatmaps-chart';
import {useDraggableHeatmapsColor} from 'src/draggables/heatmaps/use-draggable-heatmaps-color';
import {useDraggableHeatmapsLifecycles} from 'src/draggables/heatmaps/use-draggable-heatmaps-lifecycles';
import {useDraggableHeatmapsRange} from 'src/draggables/heatmaps/use-draggable-heatmaps-range';

const {digesterName, isReadyAndSelected, isPairing} = useDraggableHeatmaps();
const {flavor} = useDraggableHeatmapsColor();
const {range} = useDraggableHeatmapsRange();
const {title, x, y, series} = useDraggableHeatmapsChart();
const {generate} = useExportName();

useDraggableHeatmapsLifecycles();
</script>

<template>
  <AppDraggable
    :class="$style.container"
    draggable-key="heatmaps"
  >
    <DraggableHeatmapsMenu />

    <div :class="$style.wrapper">
      <AppHeatmap
        v-if="isReadyAndSelected"
        :colorscale="flavor"
        :export-name="generate('heatmap', digesterName ?? '')"
        :range="range"
        :title="title"
        :values="series"
        :x="x"
        :y="isPairing ? y : x"
      />
    </div>
  </AppDraggable>
</template>

<style lang="scss" module>
.container {
  width: $s2;
}

.wrapper {
  overflow: auto;
  max-height: $s2;

  @include hide-scrollbar;
}
</style>
