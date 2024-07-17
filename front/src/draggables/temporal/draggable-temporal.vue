<script lang="ts" setup>
import AppCandles from 'src/app/candles/app-candles.vue';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import AppPlot from 'src/app/plot/app-plot.vue';
import {useIntervalFilter} from 'src/composables/use-interval-filter';
import DraggableTemporalMenu from 'src/draggables/temporal/draggable-temporal-menu.vue';
import DraggableTemporalSidebar from 'src/draggables/temporal/draggable-temporal-sidebar.vue';
import {useDraggableTemporal} from 'src/draggables/temporal/use-draggable-temporal';
import {useTemporal} from 'src/draggables/temporal/use-temporal';
import {useTemporalCandles} from 'src/draggables/temporal/use-temporal-candles';
import {useTemporalChart} from 'src/draggables/temporal/use-temporal-chart';
import {useTemporalSites} from 'src/draggables/temporal/use-temporal-sites';
import {watch} from 'vue';

const {indicator, isScatter, isCandles, isCondensed, isDisplay} =
  useDraggableTemporal();
const {data: indicatorData} = useTemporal();
const {candles, plot, render} = useTemporalChart();
const {period} = useTemporalCandles();
const {current: currentSites, handleFirstLoad} = useTemporalSites();
const {filtered} = useIntervalFilter();

watch(
  [
    // currentIndicator, // redundant with below entry
    indicatorData,
    currentSites,
    isScatter,
    isCandles,
    period,
    filtered,
  ],
  render,
);

watch(indicator, handleFirstLoad);

// todo: add colouring to candles and continuous
</script>

<template>
  <AppDraggable
    class="draggable-temporal__container"
    draggable-key="temporal"
    suspense="view"
  >
    <DraggableTemporalSidebar />
    <DraggableTemporalMenu />

    <div
      v-if="isDisplay"
      class="draggable-temporal__plot"
    >
      <AppPlot
        v-if="!isCandles && plot !== null"
        :colors="plot.colors"
        :labels="plot.labels"
        :values="plot.values"
        :y-title="indicator"
        click-enabled
        export-filename="indicators"
        hide-x-legend
      />

      <AppCandles
        v-if="isCandles && candles !== null"
        :close="candles.close"
        :condensed="isCondensed"
        :high="candles.high"
        :labels="candles.labels"
        :low="candles.low"
        :open="candles.open"
        :timestamps="candles.timestamps"
        :title="period.name"
        :y-title="indicator"
        export-filename="indicators"
      />
    </div>
  </AppDraggable>
</template>

<style lang="scss" scoped>
.draggable-temporal__container {
  width: 54em;
}

.draggable-temporal__plot {
  display: flex;
  margin-top: 10px;
}
</style>
