<script lang="ts" setup="">
import {DownloadOutline, RepeatOutline, ResizeOutline} from '@vicons/ionicons5';
import {NButtonGroup, NIcon, NSelect} from 'naive-ui';
import AppButton from 'src/app/app-button.vue';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import {useAppHeatmapSize} from 'src/app/heatmap/use-app-heatmap-size';
import AppSelect from 'src/app/select/app-select.vue';
import {useRefProvide} from 'src/composables/use-ref-provide';
import {useStorageDigested} from 'src/composables/use-storage-digested';
import {useStorageLabels} from 'src/composables/use-storage-labels';
import {useDraggableHeatmapDigester} from 'src/draggables/heatmaps/use-draggable-heatmap-digester';
import {useDraggableHeatmapsColor} from 'src/draggables/heatmaps/use-draggable-heatmaps-color';
import {useDraggableHeatmapsExport} from 'src/draggables/heatmaps/use-draggable-heatmaps-export';
import {useDraggableHeatmapsLabels} from 'src/draggables/heatmaps/use-draggable-heatmaps-labels';
import {useDraggableHeatmapsRange} from 'src/draggables/heatmaps/use-draggable-heatmaps-range';
import {computed, watch} from 'vue';

const {digested} = useStorageDigested();
const {labelProperties} = useStorageLabels();
const {options: rangeOptions, index: rangeIndex} = useDraggableHeatmapsRange();
const {resize1by1, resize4by3, resize16by10, resize16by9} = useAppHeatmapSize();
const {flavors: colorFlavors} = useDraggableHeatmapsColor();
const {handleClick: handleExportClick} = useDraggableHeatmapsExport();
const {swap: swapLabels} = useDraggableHeatmapsLabels();
const {
  digester,
  options: digesterOptions,
  handleChange: handleDigesterChange,
} = useDraggableHeatmapDigester();

const isSingle = computed(() => !digested.value?.isPairing);

useRefProvide('digested/digester', digester);

watch(digester, handleDigesterChange);
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
        :disabled="isSingle"
        :handle-click="swapLabels"
        icon
        size="small"
      >
        <RepeatOutline />
      </AppButton>

      <AppSelect
        :disabled="isSingle"
        :options="labelProperties ?? []"
        injection-key="digested/labelB"
        placeholder="Label B..."
        size="small"
      />
    </div>

    <h2>Colors</h2>

    <div class="colors">
      <AppSelect
        :options="colorFlavors"
        injection-key="digested/colorFlavor"
        placeholder="Color flavor..."
        size="small"
      />

      <h2 style="justify-content: center">Range</h2>

      <div>
        <NSelect
          v-model:value="rangeIndex"
          :options="rangeOptions"
          placeholder="Range..."
          size="small"
        />
      </div>
    </div>

    <h2>Window</h2>

    <div class="window">
      <NButtonGroup>
        <AppButton :handle-click="resize1by1">
          <NIcon> <ResizeOutline /> </NIcon>&nbsp;1:1
        </AppButton>
        <AppButton :handle-click="resize4by3">
          <NIcon> <ResizeOutline /> </NIcon>&nbsp;4:3
        </AppButton>
        <AppButton :handle-click="resize16by10">
          <NIcon> <ResizeOutline /> </NIcon>&nbsp;16:10
        </AppButton>
        <AppButton :handle-click="resize16by9">
          <NIcon> <ResizeOutline /> </NIcon>&nbsp;16:9
        </AppButton>
      </NButtonGroup>

      <AppButton
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
