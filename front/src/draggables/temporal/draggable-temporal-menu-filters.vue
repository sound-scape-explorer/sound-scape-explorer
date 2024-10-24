<script lang="ts" setup="">
import AppButton from 'src/app/app-button.vue';
import AppTooltip from 'src/app/app-tooltip.vue';
import AppInput from 'src/app/input/app-input.vue';
import {InjectionKey} from 'src/common/injection-key';
import {useScatterFilterTemporal} from 'src/components/scatter/use-scatter-filter-temporal';
import {useRefProvide} from 'src/composables/use-ref-provide';
import {useDraggableTemporal} from 'src/draggables/temporal/use-draggable-temporal';
import {useTemporalInfo} from 'src/draggables/temporal/use-temporal-info';
import {useTemporalThresholds} from 'src/draggables/temporal/use-temporal-thresholds';

const {hasIndicator} = useDraggableTemporal();
const {filter, reset} = useScatterFilterTemporal();
const {filteredCount, collectedCount} = useTemporalInfo();
const {from, to} = useTemporalThresholds();

useRefProvide(InjectionKey.indicatorsFilterFrom, from);
useRefProvide(InjectionKey.indicatorsFilterTo, to);
</script>

<template>
  <div>
    <AppInput
      :disabled="!hasIndicator"
      :handle-enter="filter"
      :injection-key="InjectionKey.indicatorsFilterFrom"
      :step="0.1"
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
      :injection-key="InjectionKey.indicatorsFilterTo"
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
      :class="$style.info"
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

<style lang="scss" module>
.info {
  font-size: 0.78em;
  width: $p0 * 4;
  text-wrap: nowrap;

  b {
    color: $emerald;
  }
}
</style>
