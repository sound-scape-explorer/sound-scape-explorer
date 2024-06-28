<script lang="ts" setup>
import AppCandles from 'src/app/candles/app-candles.vue';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import AppPlot from 'src/app/plot/app-plot.vue';
import {useIntervalFilter} from 'src/composables/interval-filter';
import {useDraggableIndicators} from 'src/draggables/indicators/draggable-indicators';
import DraggableIndicatorsMenu from 'src/draggables/indicators/draggable-indicators-menu.vue';
import {useIndicators} from 'src/draggables/indicators/indicators';
import {useIndicatorsCandles} from 'src/draggables/indicators/indicators-candles';
import {useIndicatorsChart} from 'src/draggables/indicators/indicators-chart';
import {useIndicatorsSites} from 'src/draggables/indicators/indicators-sites';
import {watch} from 'vue';

const {currentIndicator, isSelection, isCandles, isCondensed} =
  useDraggableIndicators();
const {data: indicatorData} = useIndicators();
const {candles, plot, render} = useIndicatorsChart();
const {period} = useIndicatorsCandles();
const {current: currentSites} = useIndicatorsSites();
const {filtered} = useIntervalFilter();

watch(
  [
    // currentIndicator, // redundant with below entry
    indicatorData,
    currentSites,
    isSelection,
    isCandles,
    period,
    filtered,
  ],
  render,
);

// todo: add colouring to candles and continuous
// todo: improve performance
// todo: fix when loading scatter selection before building data
</script>

<template>
  <AppDraggable
    class="draggable-indicators__container"
    draggable-key="indicators"
  >
    <DraggableIndicatorsMenu />

    <div class="draggable-indicators__plot">
      <AppPlot
        v-if="!isCandles && plot !== null"
        :colors="plot.colors"
        :labels="plot.labels"
        :values="plot.values"
        :y-title="currentIndicator"
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
        :y-title="currentIndicator"
        export-filename="indicators"
      />
    </div>
  </AppDraggable>
</template>

<style lang="scss" scoped>
$width: 54em;

.draggable-indicators__container {
  width: $width;
}

.draggable-indicators__plot {
  display: flex;
}
</style>
