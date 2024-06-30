<script lang="ts" setup>
import AppCandles from 'src/app/candles/app-candles.vue';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import AppPlot from 'src/app/plot/app-plot.vue';
import {useIntervalFilter} from 'src/composables/use-interval-filter';
import DraggableTemporalMenu from 'src/draggables/temporal/draggable-temporal-menu.vue';
import {useDraggableTemporal} from 'src/draggables/temporal/use-draggable-temporal';
import {useTemporal} from 'src/draggables/temporal/use-temporal';
import {useTemporalCandles} from 'src/draggables/temporal/use-temporal-candles';
import {useTemporalChart} from 'src/draggables/temporal/use-temporal-chart';
import {useTemporalSites} from 'src/draggables/temporal/use-temporal-sites';
import {watch} from 'vue';

const {indicator, isLabels, isCandles, isCondensed} = useDraggableTemporal();
const {data: indicatorData} = useTemporal();
const {candles, plot, render} = useTemporalChart();
const {period} = useTemporalCandles();
const {current: currentSites} = useTemporalSites();
const {filtered} = useIntervalFilter();

watch(
  [
    // currentIndicator, // redundant with below entry
    indicatorData,
    currentSites,
    isLabels,
    isCandles,
    period,
    filtered,
  ],
  render,
);

// todo: add colouring to candles and continuous
// todo: improve performance
// todo: fix when loading scatter selection before building data
// todo: add filtering with threshold
</script>

<template>
  <AppDraggable
    class="draggable-temporal__container"
    draggable-key="temporal"
  >
    <DraggableTemporalMenu />

    <div class="draggable-temporal__plot">
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
$width: 54em;

.draggable-temporal__container {
  width: $width;
}

.draggable-temporal__plot {
  display: flex;
}
</style>
