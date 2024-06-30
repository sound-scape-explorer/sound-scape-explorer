<script lang="ts" setup="">
import {DownloadOutline} from '@vicons/ionicons5';
import {NButton, NButtonGroup, NIcon, NSwitch, NTreeSelect} from 'naive-ui';
import AppInput from 'src/app/app-input/app-input.vue';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import AppSelect from 'src/app/select/app-select.vue';
import {useKeyboard} from 'src/composables/keyboard';
import {useRefProvide} from 'src/composables/ref-provide';
import {useDraggableTemporal} from 'src/draggables/temporal/draggable-temporal';
import {useTemporalCandles} from 'src/draggables/temporal/temporal-candles';
import {useTemporalSites} from 'src/draggables/temporal/temporal-sites';
import {ref, watch} from 'vue';

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
  selectAll: selectAllSites,
} = useTemporalSites();

const {periods, update: updatePeriod} = useTemporalCandles();
const {lock, unlock} = useKeyboard();
const above = ref<number>();
const below = ref<number>();

useRefProvide('indicators/list', indicator);
useRefProvide('indicators/selection', selection);
useRefProvide('indicators/display', display);
useRefProvide('indicators/filterAbove', above);
useRefProvide('indicators/filterBelow', below);

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
          :step="0.1"
          injection-key="indicators/filterBelow"
          placeholder="Below"
          style="width: 9em"
          tooltip="Below"
          type="number"
        />

        <AppInput
          injection-key="indicators/filterAbove"
          placeholder="Above"
          style="width: 9em"
          tooltip="Above"
          type="number"
        />

        <NButton
          size="tiny"
          @click="() => console.log('apply')"
        >
          Apply
        </NButton>

        <NButton
          size="tiny"
          @click="() => console.log('reset')"
        >
          Reset
        </NButton>
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
</style>
