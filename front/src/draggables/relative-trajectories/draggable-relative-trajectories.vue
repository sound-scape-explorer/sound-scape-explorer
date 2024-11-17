<script lang="ts" setup>
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import AppPlot from 'src/app/plot/app-plot.vue';
import DraggableRelativeTrajectoriesMenu from 'src/draggables/relative-trajectories/draggable-relative-trajectories-menu.vue';
import DraggableRelativeTrajectoriesSidebar from 'src/draggables/relative-trajectories/draggable-relative-trajectories-sidebar.vue';
import {useDraggableRelativeTrajectoriesExpand} from 'src/draggables/relative-trajectories/use-draggable-relative-trajectories-expand';
import {useRelativeTrajectoriesData} from 'src/draggables/relative-trajectories/use-relative-trajectories-data';
import {useRelativeTrajectoriesPlotSize} from 'src/draggables/relative-trajectories/use-relative-trajectories-plot-size';

const {names, labels, values, colors, exportName} =
  useRelativeTrajectoriesData();
const {isExpanded} = useDraggableRelativeTrajectoriesExpand();
const {height} = useRelativeTrajectoriesPlotSize();
</script>

<template>
  <AppDraggable
    :class="[$style.container, {[$style.expanded]: isExpanded}]"
    draggable-key="relativeTrajectories"
    suspense="view"
  >
    <DraggableRelativeTrajectoriesSidebar />
    <DraggableRelativeTrajectoriesMenu />

    <div :class="$style.plot">
      <AppPlot
        :colors="colors"
        :export-filename="exportName"
        :height="height"
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
  </AppDraggable>
</template>

<style lang="scss" module>
.container {
  width: $w2;
}

.expanded {
  width: $w-max;
}

.plot {
  width: 100%;
  height: 100%;

  @include plot-wrapper;
}
</style>
