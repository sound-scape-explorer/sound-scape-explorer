<script lang="ts" setup="">
import {DownloadOutline} from '@vicons/ionicons5';
import {NButton, NButtonGroup, NIcon, NSwitch, NTreeSelect} from 'naive-ui';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import AppSelect from 'src/app/select/app-select.vue';
import {useKeyboard} from 'src/composables/keyboard';
import {useRefProvide} from 'src/composables/ref-provide';
import {useDraggableIndicators} from 'src/draggables/indicators/draggable-indicators';
import {useIndicatorsCandles} from 'src/draggables/indicators/indicators-candles';
import {useIndicatorsSites} from 'src/draggables/indicators/indicators-sites';
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
} = useDraggableIndicators();

const {
  current: currentSites,
  options: siteOptions,
  update: updateSites,
  selectAll: selectAllSites,
} = useIndicatorsSites();

const {periods, update: updatePeriod} = useIndicatorsCandles();
const {lock, unlock} = useKeyboard();

useRefProvide('indicators/list', indicator);
useRefProvide('indicators/selection', selection);
useRefProvide('indicators/display', display);

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
      class="swap-button"
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
