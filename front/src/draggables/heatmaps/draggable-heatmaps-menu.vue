<script lang="ts" setup="">
import {IonIcon} from '@ionic/vue';
import {downloadOutline, repeatOutline} from 'ionicons/icons';
import {NSelect} from 'naive-ui';
import AppButton from 'src/app/app-button.vue';
import AppDraggableMenuPlotSizes from 'src/app/app-draggable-menu-plot-sizes.vue';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import {useAppHeatmapSize} from 'src/app/heatmap/use-app-heatmap-size';
import AppSelect from 'src/app/select/app-select.vue';
import {InjectionKey} from 'src/common/injection-key';
import {useRefProvide} from 'src/composables/use-ref-provide';
import {useStorageLabels} from 'src/composables/use-storage-labels';
import {useDraggableHeatmaps} from 'src/draggables/heatmaps/use-draggable-heatmaps';
import {useDraggableHeatmapsColor} from 'src/draggables/heatmaps/use-draggable-heatmaps-color';
import {useDraggableHeatmapsExport} from 'src/draggables/heatmaps/use-draggable-heatmaps-export';
import {useDraggableHeatmapsLabels} from 'src/draggables/heatmaps/use-draggable-heatmaps-labels';
import {useDraggableHeatmapsRange} from 'src/draggables/heatmaps/use-draggable-heatmaps-range';

const {
  digesterName,
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
const {labelPropertiesActual} = useStorageLabels();

useRefProvide(InjectionKey.digestedDigester, digesterName);
useRefProvide(InjectionKey.digestedLabelA, a);
useRefProvide(InjectionKey.digestedLabelB, b);
useRefProvide(InjectionKey.digestedColorFlavor, flavor);
useRefProvide(InjectionKey.heatmapsPlotWidth, width);
useRefProvide(InjectionKey.heatmapsPlotHeight, height);
</script>

<template>
  <AppDraggableMenu>
    <h2>Select</h2>

    <AppSelect
      :injection-key="InjectionKey.digestedDigester"
      :options="digesterOptions"
      placeholder="Digester..."
      size="small"
    />

    <h2>Over</h2>

    <div :class="$style.labels">
      <AppSelect
        :injection-key="InjectionKey.digestedLabelA"
        :options="labelPropertiesActual ?? []"
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
        :injection-key="InjectionKey.digestedLabelB"
        :options="labelPropertiesActual ?? []"
        placeholder="Label B..."
        size="small"
      />
    </div>

    <h2>Colors</h2>

    <div :class="$style.colors">
      <AppSelect
        :disabled="!isReadyAndSelected"
        :injection-key="InjectionKey.digestedColorFlavor"
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
        :height="InjectionKey.heatmapsPlotHeight"
        :width="InjectionKey.heatmapsPlotWidth"
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
.labels {
  display: grid;
  grid-template-columns: 1fr $p0 * 7 1fr;
  gap: $p0;
}

.colors {
  display: grid;
  grid-template-columns: 1fr $p0 * 7 1fr;
  gap: $p0;
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
