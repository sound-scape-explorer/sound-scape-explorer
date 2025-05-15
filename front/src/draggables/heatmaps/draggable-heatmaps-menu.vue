<script lang="ts" setup>
import {IonIcon} from '@ionic/vue';
import {downloadOutline, repeatOutline} from 'ionicons/icons';
import {NSelect} from 'naive-ui';
import AppButton from 'src/app/app-button.vue';
import AppDraggableMenuPlotSizes from 'src/app/app-draggable-menu-plot-sizes.vue';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import {useAppHeatmapSize} from 'src/app/heatmap/use-app-heatmap-size';
import AppSelect from 'src/app/select/app-select.vue';
import {useTagUniques} from 'src/composables/use-tag-uniques';
import {HeatmapScale} from 'src/constants';
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
const {flavor} = useDraggableHeatmapsColor();
const {handleClick: handleExportClick} = useDraggableHeatmapsExport();
const {coreUniques} = useTagUniques();
</script>

<template>
  <AppDraggableMenu>
    <h2>Select</h2>

    <AppSelect
      v-model="metricSlug"
      :options="digesterOptions"
      placeholder="Metric..."
      size="small"
    />

    <h2>Over</h2>

    <div :class="$style.labels">
      <AppSelect
        v-model="a"
        :options="Object.keys(coreUniques) ?? []"
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
        v-model="b"
        :disabled="!isReadyForSelection || !isPairing"
        :options="Object.keys(coreUniques) ?? []"
        placeholder="Label B..."
        size="small"
      />
    </div>

    <h2>Colors</h2>

    <div :class="$style.colors">
      <AppSelect
        v-model="flavor"
        :disabled="!isReadyAndSelected"
        :options="HeatmapScale.options"
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
        v-model:height="height"
        v-model:width="width"
        :disabled="!isReadyAndSelected"
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
