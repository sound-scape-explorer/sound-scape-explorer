<script lang="ts" setup>
import {NButtonGroup} from 'naive-ui';
import AppButton from 'src/app/app-button.vue';
import AppIcon from 'src/app/app-icon.vue';
import AppSwitch from 'src/app/app-switch.vue';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import AppSelect from 'src/app/select/app-select.vue';
import {useAcousticExtractors} from 'src/composables/use-acoustic-extractors';
import DraggableTemporalMenuFilters from 'src/draggables/temporal/draggable-temporal-menu-filters.vue';
import {
  TemporalDisplay,
  useDraggableTemporal,
} from 'src/draggables/temporal/use-draggable-temporal';
import {useTemporalCandles} from 'src/draggables/temporal/use-temporal-candles';
import {useTemporalExport} from 'src/draggables/temporal/use-temporal-export';
import {
  TemporalStrategy,
  useTemporalStrategy,
} from 'src/draggables/temporal/use-temporal-strategy';

const {extractorSlug, display, isCandles, isCondensed} = useDraggableTemporal();
const {acousticSlugs} = useAcousticExtractors();
const {strategy} = useTemporalStrategy();
const {period, periods, update: updatePeriod} = useTemporalCandles();
const {handleClick: handleExportClick} = useTemporalExport();
</script>

<template>
  <AppDraggableMenu>
    <h2>Select</h2>

    <div :class="$style.first">
      <AppSelect
        v-model="extractorSlug"
        :options="acousticSlugs"
        placeholder="Extractor..."
        size="small"
      />

      <AppSelect
        v-model="strategy"
        :options="TemporalStrategy.options"
        size="small"
        tooltip="Aggregation strategy"
        tooltip-placement="right"
      />
    </div>

    <h2>Filter</h2>

    <div :class="$style.row">
      <DraggableTemporalMenuFilters />
    </div>

    <h2>Display</h2>

    <div :class="$style.row">
      <div>
        <AppSelect
          v-model="display"
          :class="$style.display"
          :options="TemporalDisplay.options"
          size="small"
        />

        <NButtonGroup v-if="isCandles">
          <AppButton
            v-for="p in periods"
            :active="p.seconds === period.seconds"
            :disabled="!isCandles"
            :handle-click="() => updatePeriod(p)"
            size="tiny"
          >
            {{ p.name }}
          </AppButton>
        </NButtonGroup>

        <AppSwitch
          v-if="isCandles"
          v-model="isCondensed"
          :disabled="!isCandles"
          checked="Trim"
          unchecked="Full"
        />
      </div>

      <AppButton
        :handle-click="handleExportClick"
        size="small"
        tooltip="Export raw .csv"
        tooltip-placement="bottom"
      >
        <AppIcon
          icon="download"
          size="small"
        />
      </AppButton>
    </div>
  </AppDraggableMenu>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';

.row {
  align-items: center;
  display: flex;
  justify-content: space-between;
  overflow: hidden;

  > div {
    align-items: center;
    display: flex;
    gap: sizes.$g0;
  }
}

.first {
  align-items: center;
  display: grid;
  gap: sizes.$g0;
  grid-template-columns: 1fr calc(9em + 7px);
}

.selection {
  width: sizes.$p0 * 13;
}

.display {
  width: sizes.$p0 * 16;
}
</style>
