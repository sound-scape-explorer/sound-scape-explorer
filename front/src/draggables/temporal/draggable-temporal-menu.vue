<script lang="ts" setup="">
import {DownloadOutline} from '@vicons/ionicons5';
import {NButton, NButtonGroup, NSwitch, NTreeSelect} from 'naive-ui';
import AppButton from 'src/app/app-button.vue';
import AppTooltip from 'src/app/app-tooltip.vue';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import AppInput from 'src/app/input/app-input.vue';
import AppSelect from 'src/app/select/app-select.vue';
import {useScatterFilterTemporal} from 'src/components/scatter/use-scatter-filter-temporal';
import {useKeyboard} from 'src/composables/use-keyboard';
import {useRefProvide} from 'src/composables/use-ref-provide';
import {useDraggableTemporal} from 'src/draggables/temporal/use-draggable-temporal';
import {useTemporalCandles} from 'src/draggables/temporal/use-temporal-candles';
import {useTemporalInfo} from 'src/draggables/temporal/use-temporal-info';
import {useTemporalSites} from 'src/draggables/temporal/use-temporal-sites';
import {useTemporalThresholds} from 'src/draggables/temporal/use-temporal-thresholds';
import {watch} from 'vue';

const {
  selection,
  selections,
  indicator,
  indicators,
  display,
  displays,
  isSites,
  isCandles,
  isCondensed,
  handleExportClick,
  update,
  hasIndicator,
} = useDraggableTemporal();

const {
  current: currentSites,
  options: siteOptions,
  update: updateSites,
  selectAll,
} = useTemporalSites();

const {filteredCount, collectedCount} = useTemporalInfo();

const {periods, update: updatePeriod} = useTemporalCandles();
const {lock, unlock} = useKeyboard();
const {from, to} = useTemporalThresholds();
const {filter, reset} = useScatterFilterTemporal();

useRefProvide('indicators/list', indicator);
useRefProvide('indicators/selection', selection);
useRefProvide('indicators/display', display);
useRefProvide('indicators/filterFrom', from);
useRefProvide('indicators/filterTo', to);

watch(indicator, update);
</script>

<template>
  <AppDraggableMenu size="medium">
    <h2>Select</h2>

    <div>
      <AppSelect
        :options="indicators"
        injection-key="indicators/list"
        size="small"
      />
    </div>

    <h2>
      <AppButton
        :disabled="!isSites"
        :handle-click="selectAll"
        grow
        size="small"
        tooltip="Select all sites"
        tooltip-placement="top"
      >
        All
      </AppButton>
    </h2>

    <div class="row">
      <NTreeSelect
        v-model:value="currentSites"
        :clear-filter-after-select="false"
        :disabled="!isSites"
        :max-tag-count="1"
        :options="siteOptions"
        checkable
        clearable
        filterable
        multiple
        placeholder="Sites..."
        size="small"
        @blur="unlock"
        @focus="lock"
        @update:value="updateSites"
      />
    </div>

    <h2>Display</h2>

    <div class="row">
      <div>
        <AppSelect
          :options="selections"
          injection-key="indicators/selection"
          size="small"
          style="width: 9em"
          tooltip="Current selection"
          tooltip-placement="top"
        />

        <AppSelect
          :options="displays"
          injection-key="indicators/display"
          size="small"
          style="width: 9em"
          tooltip="Rendering style"
          tooltip-placement="top"
        />

        <NButtonGroup v-if="isCandles">
          <NButton
            v-for="p in periods"
            :disabled="!isCandles"
            size="small"
            @click="updatePeriod(p)"
          >
            {{ p.name }}
          </NButton>
        </NButtonGroup>

        <NSwitch
          v-if="isCandles"
          v-model:value="isCondensed"
          :disabled="!isCandles"
          size="small"
        >
          <template #unchecked>Full</template>
          <template #checked>Trim</template>
        </NSwitch>
      </div>

      <AppButton
        :handle-click="handleExportClick"
        icon
        size="small"
        tooltip="Export raw .csv"
        tooltip-placement="bottom"
      >
        <DownloadOutline />
      </AppButton>
    </div>

    <h2>Filter</h2>

    <div class="row">
      <div>
        <AppInput
          :disabled="!hasIndicator"
          :step="0.1"
          injection-key="indicators/filterFrom"
          placeholder="From"
          size="small"
          style="width: 9em"
          tooltip="From"
          tooltip-placement="bottom"
          type="number"
        />

        <AppInput
          :disabled="!hasIndicator"
          injection-key="indicators/filterTo"
          placeholder="To"
          size="small"
          style="width: 9em"
          tooltip="To"
          tooltip-placement="bottom"
          type="number"
        />

        <AppButton
          :disabled="!hasIndicator"
          :handle-click="filter"
          size="small"
        >
          Apply
        </AppButton>

        <AppButton
          :disabled="!hasIndicator"
          :handle-click="reset"
          size="small"
        >
          Reset
        </AppButton>

        <div
          v-if="hasIndicator"
          class="info"
        >
          <AppTooltip
            :tooltip="`${collectedCount} points collected`"
            placement="bottom"
          >
            <div>
              <b>{{ filteredCount }}</b>
              points excluded
            </div>
          </AppTooltip>
        </div>
      </div>
    </div>
  </AppDraggableMenu>
</template>

<style lang="scss" scoped>
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div {
    display: flex;
    align-items: center;
    gap: 0.5em;
  }
}

.info {
  font-size: 0.9em;

  b {
    color: rgba(23, 159, 87, 1);
  }
}

$s: 0.9;
.toggle {
  transform: scale3d($s, $s, $s);
}
</style>
