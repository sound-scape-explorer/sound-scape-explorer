<script lang="ts" setup="">
import {DownloadOutline} from '@vicons/ionicons5';
import {NButton, NButtonGroup, NSwitch, NTreeSelect} from 'naive-ui';
import AppButton from 'src/app/app-button.vue';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import AppSelect from 'src/app/select/app-select.vue';
import {useGlobalKeyboard} from 'src/composables/use-global-keyboard';
import {useRefProvide} from 'src/composables/use-ref-provide';
import DraggableTemporalMenuFilters from 'src/draggables/temporal/draggable-temporal-menu-filters.vue';
import {useDraggableTemporal} from 'src/draggables/temporal/use-draggable-temporal';
import {useTemporalCandles} from 'src/draggables/temporal/use-temporal-candles';
import {useTemporalSites} from 'src/draggables/temporal/use-temporal-sites';
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
} = useDraggableTemporal();

const {
  current: currentSites,
  options: siteOptions,
  update: updateSites,
  selectAll,
} = useTemporalSites();

const {periods, update: updatePeriod} = useTemporalCandles();
const {lock, unlock} = useGlobalKeyboard();

useRefProvide('indicators/list', indicator);
useRefProvide('indicators/selection', selection);
useRefProvide('indicators/display', display);

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
      <DraggableTemporalMenuFilters />
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

$s: 0.9;
.toggle {
  transform: scale3d($s, $s, $s);
}
</style>
