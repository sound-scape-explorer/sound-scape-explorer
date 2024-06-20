<script lang="ts" setup="">
import {DownloadOutline} from '@vicons/ionicons5';
import {
  NButton,
  NButtonGroup,
  NIcon,
  NSelect,
  NSwitch,
  NTreeSelect,
} from 'naive-ui';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import {useKeyboard} from 'src/composables/keyboard';
import {useDraggableIndicators} from 'src/draggables/indicators/draggable-indicators';
import {useIndicators} from 'src/draggables/indicators/indicators';
import {useIndicatorsCandles} from 'src/draggables/indicators/indicators-candles';
import {useIndicatorsSites} from 'src/draggables/indicators/indicators-sites';
import {watch} from 'vue';

const {
  indicatorOptions,
  currentIndicator,
  isContinuous,
  isSelection,
  isCondensed,
  handleExportClick,
  parseIndex,
} = useDraggableIndicators();

const {
  current: currentSites,
  options: siteOptions,
  update: updateSites,
  selectAll: selectAllSites,
} = useIndicatorsSites();

const {periods, update: updatePeriod} = useIndicatorsCandles();
const {selectIndicator} = useIndicators();
const {lock, unlock} = useKeyboard();

watch(currentIndicator, () => {
  selectIndicator(parseIndex(currentIndicator.value));
});
</script>

<template>
  <AppDraggableMenu>
    <span>Select</span>

    <NSelect
      v-model:value="currentIndicator"
      :options="indicatorOptions"
      placeholder="Indicator..."
      size="tiny"
    />

    <span>For</span>

    <div class="draggable-indicators-menu__sites-row">
      <NTreeSelect
        v-model:value="currentSites"
        :clear-filter-after-select="false"
        :disabled="isSelection"
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

      <NButton
        :disabled="isSelection"
        class="swap-button"
        size="tiny"
        @click="selectAllSites"
      >
        All
      </NButton>
    </div>

    <span />

    <div class="draggable-indicators-menu__options-row">
      <div>
        <NSwitch
          v-model:value="isSelection"
          class="toggle"
          size="small"
        >
          <template #unchecked>Sites</template>
          <template #checked>Scatter</template>
        </NSwitch>

        <NSwitch
          v-model:value="isContinuous"
          class="toggle"
          size="small"
        >
          <template #unchecked>Candles</template>
          <template #checked>Continu.</template>
        </NSwitch>

        <NSwitch
          v-model:value="isCondensed"
          :disabled="isContinuous"
          class="toggle"
          size="small"
        >
          <template #unchecked>Full</template>
          <template #checked>Trim</template>
        </NSwitch>

        <NButtonGroup>
          <NButton
            v-for="p in periods"
            :disabled="isContinuous"
            size="tiny"
            @click="updatePeriod(p)"
          >
            {{ p.name }}
          </NButton>
        </NButtonGroup>
      </div>

      <div>
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
    </div>
  </AppDraggableMenu>
</template>

<style lang="scss" scoped>
.draggable-indicators-menu__sites-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
}

.draggable-indicators-menu__options-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5em;

  > div {
    display: flex;
    align-items: center;
    gap: 0.5em;
  }

  > div:first-child {
    justify-content: flex-start;
  }

  > div:last-child {
    justify-content: flex-end;
  }
}
</style>
