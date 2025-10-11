<script lang="ts" setup>
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import {SuspenseCase} from 'src/app/draggable/use-app-draggable-suspense';
import AppDraggableSidebar from 'src/app/draggable-sidebar/app-draggable-sidebar.vue';
import AppHeatmap from 'src/app/heatmap/app-heatmap.vue';
import FilteringInfo from 'src/components/filtering-info/filtering-info.vue';
import {DraggableKey} from 'src/composables/use-draggables';
import {useExportName} from 'src/composables/use-export-name';
import DraggableHeatmapsMenu from 'src/draggables/heatmaps/draggable-heatmaps-menu.vue';
import {useDraggableHeatmaps} from 'src/draggables/heatmaps/use-draggable-heatmaps';
import {useDraggableHeatmapsChart} from 'src/draggables/heatmaps/use-draggable-heatmaps-chart';
import {useDraggableHeatmapsColor} from 'src/draggables/heatmaps/use-draggable-heatmaps-color';
import {useDraggableHeatmapsLifecycles} from 'src/draggables/heatmaps/use-draggable-heatmaps-lifecycles';
import {useDraggableHeatmapsRange} from 'src/draggables/heatmaps/use-draggable-heatmaps-range';

const {metricSlug, isReadyAndSelected, isPairing} = useDraggableHeatmaps();
const {flavor} = useDraggableHeatmapsColor();
const {range} = useDraggableHeatmapsRange();
const {title, x, y, series} = useDraggableHeatmapsChart();
const {generate} = useExportName();

useDraggableHeatmapsLifecycles();
</script>

<template>
  <AppDraggable
    :class="$style.container"
    :draggable-key="DraggableKey.enum.heatmaps"
    :suspense="SuspenseCase.enum.NO_METRICS"
  >
    <AppDraggableSidebar>
      <FilteringInfo />
    </AppDraggableSidebar>

    <DraggableHeatmapsMenu />

    <div :class="$style.wrapper">
      <AppHeatmap
        v-if="isReadyAndSelected"
        :colorscale="flavor"
        :export-name="generate('heatmap', metricSlug ?? '')"
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
@use 'src/styles/sizes';
@use 'src/styles/scrolls';

.container {
  width: sizes.$s2;
}

.wrapper {
  @include scrolls.plot-wrapper;
}
</style>
