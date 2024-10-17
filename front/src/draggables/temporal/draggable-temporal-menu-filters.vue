<script lang="ts" setup="">
import AppButton from 'src/app/app-button.vue';
import AppTooltip from 'src/app/app-tooltip.vue';
import AppInput from 'src/app/input/app-input.vue';
import {useScatterFilterTemporal} from 'src/components/scatter/use-scatter-filter-temporal';
import {useRefProvide} from 'src/composables/use-ref-provide';
import {useDraggableTemporal} from 'src/draggables/temporal/use-draggable-temporal';
import {useTemporalInfo} from 'src/draggables/temporal/use-temporal-info';
import {useTemporalThresholds} from 'src/draggables/temporal/use-temporal-thresholds';

const {hasIndicator} = useDraggableTemporal();
const {filter, reset} = useScatterFilterTemporal();
const {filteredCount, collectedCount} = useTemporalInfo();
const {from, to} = useTemporalThresholds();

useRefProvide('indicators/filterFrom', from);
useRefProvide('indicators/filterTo', to);
</script>

<template>
  <div>
    <AppInput
      :disabled="!hasIndicator"
      :handle-enter="filter"
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
      :handle-enter="filter"
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
          <b>{{ filteredCount }}</b> excluded
        </div>
      </AppTooltip>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.info {
  font-size: 0.78em;
  width: $p0 * 4;
  text-wrap: nowrap;

  b {
    color: $emerald;
  }
}
</style>
