<script lang="ts" setup="">
import {DownloadOutline} from '@vicons/ionicons5';
import {NButton, NButtonGroup, NTreeSelect} from 'naive-ui';
import AppButton from 'src/app/app-button.vue';
import AppSwitch from 'src/app/app-switch.vue';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import AppSelect from 'src/app/select/app-select.vue';
import {InjectionKey} from 'src/common/injection-key';
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

useRefProvide(InjectionKey.indicatorsList, indicator);
useRefProvide(InjectionKey.indicatorsSelection, selection);
useRefProvide(InjectionKey.indicatorsDisplay, display);
useRefProvide(InjectionKey.temporalTrim, isCondensed);

watch(indicator, update);
</script>

<template>
  <AppDraggableMenu>
    <h2>Select</h2>

    <div>
      <AppSelect
        :injection-key="InjectionKey.indicatorsList"
        :options="indicators"
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

    <div :class="$style.row">
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

    <div :class="$style.row">
      <div>
        <AppSelect
          :class="$style.selection"
          :injection-key="InjectionKey.indicatorsSelection"
          :options="selections"
          size="small"
          tooltip="Current selection"
          tooltip-placement="top"
        />

        <AppSelect
          :injection-key="InjectionKey.indicatorsDisplay"
          :options="displays"
          size="small"
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

        <AppSwitch
          v-if="isCandles"
          :disabled="!isCandles"
          :injection-key="InjectionKey.temporalTrim"
          checked="Trim"
          unchecked="Full"
        />
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

    <div :class="$style.row">
      <DraggableTemporalMenuFilters />
    </div>
  </AppDraggableMenu>
</template>

<style lang="scss" module>
.row {
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: space-between;

  > div {
    display: flex;
    align-items: center;
    gap: $p0;
  }
}

.selection {
  width: $p0 * 13;
}
</style>
