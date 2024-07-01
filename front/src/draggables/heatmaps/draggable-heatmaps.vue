<script lang="ts" setup="">
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import AppHeatmap from 'src/app/heatmap/app-heatmap.vue';
import AppHeatmap2d from 'src/app/heatmap/app-heatmap-2d.vue';
import {useRefProvide} from 'src/composables/use-ref-provide';
import {useStorageDigested} from 'src/composables/use-storage-digested';
import DraggableHeatmapsMenu from 'src/draggables/heatmaps/draggable-heatmaps-menu.vue';
import {useDraggableHeatmapsChart} from 'src/draggables/heatmaps/use-draggable-heatmaps-chart';
import {useDraggableHeatmapsColor} from 'src/draggables/heatmaps/use-draggable-heatmaps-color';
import {useDraggableHeatmapsLabels} from 'src/draggables/heatmaps/use-draggable-heatmaps-labels';
import {useDraggableHeatmapsRange} from 'src/draggables/heatmaps/use-draggable-heatmaps-range';
import {watchEffect} from 'vue';

const {digested} = useStorageDigested();
const {range} = useDraggableHeatmapsRange();
const {flavor} = useDraggableHeatmapsColor();
const {a, b} = useDraggableHeatmapsLabels();

const {
  title,
  x,
  y,
  values,
  update: updateChart,
  is1d,
  is2d,
} = useDraggableHeatmapsChart();

useRefProvide('digested/labelA', a);
useRefProvide('digested/labelB', b);
useRefProvide('digested/colorFlavor', flavor);

watchEffect(updateChart);
</script>

<template>
  <AppDraggable draggable-key="heatmaps">
    <DraggableHeatmapsMenu />
    <AppHeatmap
      v-if="is1d"
      :colorscale="flavor"
      :export-name="digested?.digester.name"
      :labels="x"
      :range="range"
      :title="title"
      :values="values"
    />
    <AppHeatmap2d
      v-if="is2d"
      :colorscale="flavor"
      :export-name="digested?.digester.name"
      :range="range"
      :title="title"
      :values="values"
      :x="x"
      :y="y"
    />
  </AppDraggable>
</template>
