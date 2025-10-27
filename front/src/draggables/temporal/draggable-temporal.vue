<script lang="ts" setup>
import AppCandles from 'src/app/candles/app-candles.vue';
import AppDraggable from 'src/app/draggable/app-draggable.vue';
import {SuspenseCase} from 'src/app/draggable/use-app-draggable-suspense';
import AppPlot from 'src/app/plot/app-plot.vue';
import {DraggableKey} from 'src/composables/use-draggables';
import {useExportName} from 'src/composables/use-export-name';
import {ExportType} from 'src/constants';
import DraggableTemporalMenu from 'src/draggables/temporal/draggable-temporal-menu.vue';
import DraggableTemporalSidebar from 'src/draggables/temporal/draggable-temporal-sidebar.vue';
import {useDraggableTemporal} from 'src/draggables/temporal/use-draggable-temporal';
import {useDraggableTemporalLifecycles} from 'src/draggables/temporal/use-draggable-temporal-lifecycles';
import {useTemporalCandles} from 'src/draggables/temporal/use-temporal-candles';
import {useTemporalChart} from 'src/draggables/temporal/use-temporal-chart';
import {computed} from 'vue';

const {extractorSlug, isCandles, isCondensed, isDisplay, display, isExpanded} =
  useDraggableTemporal();
const {candles, plot} = useTemporalChart();
const {period} = useTemporalCandles();
const {generate} = useExportName();

const plotTitle = computed<string>(
  () => `${extractorSlug.value} - ${display.value.toLowerCase()}`,
);

useDraggableTemporalLifecycles();
</script>

<template>
  <AppDraggable
    :class="[$style.container, {[$style.expand]: isExpanded}]"
    :draggable-key="DraggableKey.enum.temporal"
    :suspense="SuspenseCase.enum.VIEW"
  >
    <DraggableTemporalSidebar />
    <DraggableTemporalMenu />

    <div
      v-if="isDisplay"
      :class="$style.plot"
    >
      <AppPlot
        v-if="!isCandles && plot !== null"
        :colors="plot.colors"
        :export-filename="generate(ExportType.enum.temporal, extractorSlug)"
        :is-expanded="isExpanded"
        :labels="plot.labels"
        :title="plotTitle"
        :values="plot.values"
        :y-title="extractorSlug"
        click-enabled
      />

      <AppCandles
        v-if="isCandles && candles !== null"
        :close="candles.close"
        :condensed="isCondensed"
        :export-filename="generate(ExportType.enum.temporal, extractorSlug)"
        :high="candles.high"
        :is-expanded="isExpanded"
        :labels="candles.labels"
        :low="candles.low"
        :open="candles.open"
        :timestamps="candles.timestamps"
        :title="`${plotTitle} - ${period.name}`"
        :y-title="extractorSlug"
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
  height: 100%;
  overflow: visible;
  width: 100%;
}
</style>
