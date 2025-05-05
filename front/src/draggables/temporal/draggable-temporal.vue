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
import {computed} from 'vue';

const {indicator, isCandles, isCondensed, isDisplay, display, isExpanded} =
  useDraggableTemporal();
const {candles, plot} = useTemporalChart();
const {period} = useTemporalCandles();
const {generate} = useExportName();

const plotTitle = computed<string>(
  () => `${indicator.value} - ${display.value.toLowerCase()}`,
);

useDraggableTemporalLifecycles();
</script>

<template>
  <AppDraggable
    :class="[$style.container, {[$style.expand]: isExpanded}]"
    draggable-key="temporal"
    suspense="view"
  >
    <DraggableTemporalSidebar />
    <DraggableTemporalMenu :class="$style.menu" />

    <div
      v-if="isDisplay"
      :class="$style.plot"
    >
      <AppPlot
        v-if="!isCandles && plot !== null"
        :colors="plot.colors"
        :export-filename="generate('indicators', indicator)"
        :is-expanded="isExpanded"
        :labels="plot.labels"
        :title="plotTitle"
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
        :is-expanded="isExpanded"
        :labels="candles.labels"
        :low="candles.low"
        :open="candles.open"
        :timestamps="candles.timestamps"
        :title="`${plotTitle} - ${period.name}`"
        :y-title="indicator"
      />
    </div>
  </AppDraggable>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';

.container {
  width: sizes.$s2;
}

.expand {
  width: sizes.$w-max;
}

.plot {
  overflow: visible;
  width: 100%;
  height: 100%;
}
</style>
