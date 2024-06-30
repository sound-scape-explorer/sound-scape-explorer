<script lang="ts" setup="">
import {DownloadOutline} from '@vicons/ionicons5';
import {NButton, NButtonGroup, NIcon, NSwitch, NTreeSelect} from 'naive-ui';
import AppButtonNew from 'src/app/app-button-new.vue';
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
  selectAll: selectAllSites,
} = useTemporalSites();

const {count} = useTemporalInfo();

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
  <AppDraggableMenu>
    <span>Select</span>

    <div>
      <AppSelect
        :options="indicators"
        injection-key="indicators/list"
      />
    </div>

    <NButton
      :disabled="!isSites"
      size="tiny"
      @click="selectAllSites"
    >
      All
    </NButton>

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
        size="tiny"
        @blur="unlock"
        @focus="lock"
        @update:value="updateSites"
      />
    </div>

    <span>Display</span>

    <div class="row">
      <div>
        <AppSelect
          :options="selections"
          injection-key="indicators/selection"
          style="width: 9em"
        />

        <AppSelect
          :options="displays"
          injection-key="indicators/display"
          style="width: 9em"
        />

        <NButtonGroup v-if="isCandles">
          <NButton
            v-for="p in periods"
            :disabled="!isCandles"
            size="tiny"
            @click="updatePeriod(p)"
          >
            {{ p.name }}
          </NButton>
        </NButtonGroup>

        <NSwitch
          v-if="isCandles"
          v-model:value="isCondensed"
          :disabled="!isCandles"
          class="toggle"
          size="small"
        >
          <template #unchecked>Full</template>
          <template #checked>Trim</template>
        </NSwitch>
      </div>

      <NButton
        size="tiny"
        @click="handleExportClick"
      >
        <template #icon>
          <NIcon>
            <DownloadOutline />
          </NIcon>
        </template>
        Export raw .csv
      </NButton>
    </div>

    <span>Filter</span>

    <div class="row">
      <div>
        <AppInput
          :disabled="!hasIndicator"
          :step="0.1"
          injection-key="indicators/filterFrom"
          placeholder="From"
          style="width: 9em"
          tooltip="From"
          type="number"
        />

        <AppInput
          :disabled="!hasIndicator"
          injection-key="indicators/filterTo"
          placeholder="To"
          style="width: 9em"
          tooltip="To"
          type="number"
        />

        <AppButtonNew
          :disabled="!hasIndicator"
          :handle-click="filter"
        >
          Apply
        </AppButtonNew>

        <AppButtonNew
          :disabled="!hasIndicator"
          :handle-click="reset"
        >
          Reset
        </AppButtonNew>

        <div
          v-if="hasIndicator"
          class="info"
        >
          <b>{{ count }}</b>
          points filtered
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

  & > b {
    color: rgba(23, 159, 87, 1);
  }
}
</style>
