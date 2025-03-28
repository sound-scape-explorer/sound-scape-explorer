<script lang="ts" setup="">
import {IonIcon} from '@ionic/vue';
import {downloadOutline} from 'ionicons/icons';
import {NButtonGroup} from 'naive-ui';
import AppButton from 'src/app/app-button.vue';
import AppSwitch from 'src/app/app-switch.vue';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import AppSelect from 'src/app/select/app-select.vue';
import {InjectionKey} from 'src/common/injection-key';
import {useRefProvide} from 'src/composables/use-ref-provide';
import DraggableTemporalMenuFilters from 'src/draggables/temporal/draggable-temporal-menu-filters.vue';
import {useDraggableTemporal} from 'src/draggables/temporal/use-draggable-temporal';
import {useTemporalCandles} from 'src/draggables/temporal/use-temporal-candles';
import {watch} from 'vue';

const {
  indicator,
  indicators,
  display,
  displays,
  isCandles,
  isCondensed,
  handleExportClick,
  update,
} = useDraggableTemporal();

const {period, periods, update: updatePeriod} = useTemporalCandles();

useRefProvide(InjectionKey.indicatorsList, indicator);
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

    <h2>Filter</h2>

    <div :class="$style.row">
      <DraggableTemporalMenuFilters />
    </div>

    <h2>Display</h2>

    <div :class="$style.row">
      <div>
        <AppSelect
          :class="$style.display"
          :injection-key="InjectionKey.indicatorsDisplay"
          :options="displays"
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
          :disabled="!isCandles"
          :injection-key="InjectionKey.temporalTrim"
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
        <IonIcon
          :class="$style.export"
          :icon="downloadOutline"
        />
      </AppButton>
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

.export {
  width: $p0 * 3;
}

.display {
  width: $p0 * 16;
}
</style>
