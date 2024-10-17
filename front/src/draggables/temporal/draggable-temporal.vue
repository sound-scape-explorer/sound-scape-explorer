<script lang="ts" setup>
import AppCandles from 'src/app/candles/app-candles.vue';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import AppPlot from 'src/app/plot/app-plot.vue';
import {useExportName} from 'src/composables/use-export-name';
import DraggableTemporalMenu from 'src/draggables/temporal/draggable-temporal-menu.vue';
import DraggableTemporalSidebar from 'src/draggables/temporal/draggable-temporal-sidebar.vue';
import {useDraggableTemporal} from 'src/draggables/temporal/use-draggable-temporal';
import {useDraggableTemporalLifecycles} from 'src/draggables/temporal/use-draggable-temporal-lifecycles';
import {useTemporalCandles} from 'src/draggables/temporal/use-temporal-candles';
import {useTemporalChart} from 'src/draggables/temporal/use-temporal-chart';

const {indicator, isCandles, isCondensed, isDisplay} = useDraggableTemporal();
const {candles, plot} = useTemporalChart();
const {period} = useTemporalCandles();
const {generate} = useExportName();

useDraggableTemporalLifecycles();
</script>

<template>
  <AppDraggable
    class="draggableTemporalContainer"
    draggable-key="temporal"
    suspense="view"
  >
    <DraggableTemporalSidebar />
    <DraggableTemporalMenu />

    <div
      v-if="isDisplay"
      class="plotContainer"
    >
      <AppPlot
        v-if="!isCandles && plot !== null"
        :colors="plot.colors"
        :export-filename="generate('indicators', indicator)"
        :labels="plot.labels"
        :title="period.name"
        :values="plot.values"
        :y-title="indicator"
        click-enabled
      />

      <AppCandles
        v-if="isCandles && candles !== null"
        :close="candles.close"
        :condensed="isCondensed"
        :export-filename="generate('indicators', indicator)"
        :high="candles.high"
        :labels="candles.labels"
        :low="candles.low"
        :open="candles.open"
        :timestamps="candles.timestamps"
        :title="period.name"
        :y-title="indicator"
      />
    </div>
  </AppDraggable>
</template>

<style lang="scss" scoped>
.draggableTemporalContainer {
  width: $s2;
}

.plotContainer {
  width: 100%;
  height: 100%;
  overflow: visible;
}
</style>
