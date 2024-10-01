<script lang="ts" setup="">
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import AppHeatmap from 'src/app/heatmap/app-heatmap.vue';
import {PLOTLY_SIZE} from 'src/constants';
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

useDraggableHeatmapsLifecycles();
</script>

<template>
  <AppDraggable draggable-key="heatmaps">
    <DraggableHeatmapsMenu
      :style="{minWidth: `${PLOTLY_SIZE}px`}"
      class="menu"
    />

    <AppHeatmap
      v-if="isReadyAndSelected"
      :colorscale="flavor"
      :export-name="digesterName ?? ''"
      :range="range"
      :title="title"
      :values="series"
      :x="x"
      :y="isPairing ? y : x"
    />
  </AppDraggable>
</template>
