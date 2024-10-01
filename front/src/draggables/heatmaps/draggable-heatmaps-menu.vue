<script lang="ts" setup="">
import {DownloadOutline, RepeatOutline, ResizeOutline} from '@vicons/ionicons5';
import {NButtonGroup, NIcon, NSelect} from 'naive-ui';
import AppButton from 'src/app/app-button.vue';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import {useAppHeatmapSize} from 'src/app/heatmap/use-app-heatmap-size';
import AppSelect from 'src/app/select/app-select.vue';
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
const {resize1by1, resize4by3, resize16by10, resize16by9} = useAppHeatmapSize();
const {flavor, flavors} = useDraggableHeatmapsColor();
const {handleClick: handleExportClick} = useDraggableHeatmapsExport();

const {labelProperties} = useStorageLabels();

useRefProvide('digested/digester', digesterName);
useRefProvide('digested/labelA', a);
useRefProvide('digested/labelB', b);
useRefProvide('digested/colorFlavor', flavor);
</script>

<template>
  <AppDraggableMenu>
    <h2>Select</h2>

    <AppSelect
      :options="digesterOptions"
      injection-key="digested/digester"
      placeholder="Digester..."
      size="small"
    />

    <h2>Over</h2>

    <div class="labels">
      <AppSelect
        :options="labelProperties ?? []"
        injection-key="digested/labelA"
        placeholder="Label A..."
        size="small"
      />

      <AppButton
        :disabled="!isReadyForSelection || !isPairing"
        :handle-click="swapLabels"
        icon
        size="small"
      >
        <RepeatOutline />
      </AppButton>

      <AppSelect
        :disabled="!isReadyForSelection || !isPairing"
        :options="labelProperties ?? []"
        injection-key="digested/labelB"
        placeholder="Label B..."
        size="small"
      />
    </div>

    <h2>Colors</h2>

    <div class="colors">
      <AppSelect
        :disabled="!isReadyAndSelected"
        :options="flavors"
        injection-key="digested/colorFlavor"
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

    <h2>Window</h2>

    <div class="window">
      <NButtonGroup>
        <AppButton
          :disabled="!isReadyAndSelected"
          :handle-click="resize1by1"
        >
          <NIcon> <ResizeOutline /> </NIcon>&nbsp;1:1
        </AppButton>
        <AppButton
          :disabled="!isReadyAndSelected"
          :handle-click="resize4by3"
        >
          <NIcon> <ResizeOutline /> </NIcon>&nbsp;4:3
        </AppButton>
        <AppButton
          :disabled="!isReadyAndSelected"
          :handle-click="resize16by10"
        >
          <NIcon> <ResizeOutline /> </NIcon>&nbsp;16:10
        </AppButton>
        <AppButton
          :disabled="!isReadyAndSelected"
          :handle-click="resize16by9"
        >
          <NIcon> <ResizeOutline /> </NIcon>&nbsp;16:9
        </AppButton>
      </NButtonGroup>

      <AppButton
        :disabled="!isReadyAndSelected"
        :handle-click="handleExportClick"
        icon
        size="small"
        tooltip="Export .csv"
        tooltip-placement="bottom"
      >
        <DownloadOutline />
      </AppButton>
    </div>
  </AppDraggableMenu>
</template>

<style lang="scss" scoped>
.labels {
  display: grid;
  grid-template-columns: 1fr 4rem 1fr;
  gap: 0.5rem;
}

.colors {
  display: grid;
  grid-template-columns: 1fr 4rem 1fr;
  gap: 0.5rem;
}

.window {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 0.9em;
}
</style>
