<script lang="ts" setup>
import {IonIcon} from '@ionic/vue';
import {downloadOutline, repeatOutline} from 'ionicons/icons';
import {NSelect} from 'naive-ui';
import AppButton from 'src/app/app-button.vue';
import AppDraggableMenuPlotSizes from 'src/app/app-draggable-menu-plot-sizes.vue';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import {useAppHeatmapSize} from 'src/app/heatmap/use-app-heatmap-size';
import AppSelect from 'src/app/select/app-select.vue';
import {InjectionKey} from 'src/common/injection-key';
import {useLabelSets} from 'src/composables/use-label-sets';
import {useRefProvide} from 'src/composables/use-ref-provide';
import {useDraggableHeatmaps} from 'src/draggables/heatmaps/use-draggable-heatmaps';
import {useDraggableHeatmapsColor} from 'src/draggables/heatmaps/use-draggable-heatmaps-color';
import {useDraggableHeatmapsExport} from 'src/draggables/heatmaps/use-draggable-heatmaps-export';
import {useDraggableHeatmapsLabels} from 'src/draggables/heatmaps/use-draggable-heatmaps-labels';
import {useDraggableHeatmapsRange} from 'src/draggables/heatmaps/use-draggable-heatmaps-range';

const {
  metricSlug,
  options: digesterOptions,
  isReadyForSelection,
  isReadyAndSelected,
  isPairing,
} = useDraggableHeatmaps();

const {a, b, swap: swapLabels} = useDraggableHeatmapsLabels();
const {options: rangeOptions, index: rangeIndex} = useDraggableHeatmapsRange();
const {width, height} = useAppHeatmapSize();
const {flavor, flavors} = useDraggableHeatmapsColor();
const {handleClick: handleExportClick} = useDraggableHeatmapsExport();
const {actual} = useLabelSets();

useRefProvide(InjectionKey.METRIC_NAME, metricSlug);
useRefProvide(InjectionKey.METRIC_LABEL_A, a);
useRefProvide(InjectionKey.METRIC_LABEL_B, b);
useRefProvide(InjectionKey.METRIC_COLOR_FLAVOR, flavor);
useRefProvide(InjectionKey.HEATMAPS_PLOT_WIDTH, width);
useRefProvide(InjectionKey.HEATMAPS_PLOT_HEIGHT, height);
</script>

<template>
  <AppDraggableMenu>
    <h2>Select</h2>

    <AppSelect
      :injection-key="InjectionKey.METRIC_NAME"
      :options="digesterOptions"
      placeholder="Metric..."
      size="small"
    />

    <h2>Over</h2>

    <div :class="$style.labels">
      <AppSelect
        :injection-key="InjectionKey.METRIC_LABEL_A"
        :options="Object.keys(actual) ?? []"
        placeholder="Label A..."
        size="small"
      />

      <AppButton
        :disabled="!isReadyForSelection || !isPairing"
        :handle-click="swapLabels"
        size="small"
      >
        <IonIcon :icon="repeatOutline" />
      </AppButton>

      <AppSelect
        :disabled="!isReadyForSelection || !isPairing"
        :injection-key="InjectionKey.METRIC_LABEL_B"
        :options="Object.keys(actual) ?? []"
        placeholder="Label B..."
        size="small"
      />
    </div>

    <h2>Colors</h2>

    <div :class="$style.colors">
      <AppSelect
        :disabled="!isReadyAndSelected"
        :injection-key="InjectionKey.METRIC_COLOR_FLAVOR"
        :options="flavors"
        placeholder="Color flavor..."
        size="small"
      />

      <h2 style="justify-content: center">Range</h2>

      <div>
        <NSelect
          v-model:value="rangeIndex"
          :disabled="!isReadyAndSelected"
          :options="rangeOptions"
          placeholder="Range..."
          size="small"
        />
      </div>
    </div>

    <h2>Plot</h2>

    <div :class="$style.plot">
      <AppDraggableMenuPlotSizes
        :disabled="!isReadyAndSelected"
        :height="InjectionKey.HEATMAPS_PLOT_HEIGHT"
        :width="InjectionKey.HEATMAPS_PLOT_WIDTH"
      />

      <AppButton
        :disabled="!isReadyAndSelected"
        :handle-click="handleExportClick"
        size="small"
        tooltip="Export .csv"
        tooltip-placement="bottom"
      >
        <IonIcon :icon="downloadOutline" />
      </AppButton>
    </div>
  </AppDraggableMenu>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';

.labels {
  display: grid;
  grid-template-columns: 1fr sizes.$p0 * 7 1fr;
  gap: sizes.$p0;
}

.colors {
  display: grid;
  grid-template-columns: 1fr sizes.$p0 * 7 1fr;
  gap: sizes.$p0;
}

.plot {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.text {
  font-size: 0.9em;
}
</style>
