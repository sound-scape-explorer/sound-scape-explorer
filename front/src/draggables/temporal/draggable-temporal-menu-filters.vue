<script lang="ts" setup="">
import AppButton from 'src/app/app-button.vue';
import AppInput from 'src/app/input/app-input.vue';
import {InjectionKey} from 'src/common/injection-key';
import {useScatterFilterTemporal} from 'src/components/scatter/use-scatter-filter-temporal';
import {useRefProvide} from 'src/composables/use-ref-provide';
import {useDraggableTemporal} from 'src/draggables/temporal/use-draggable-temporal';
import {useTemporalThresholds} from 'src/draggables/temporal/use-temporal-thresholds';

const {hasIndicator} = useDraggableTemporal();
const {filter, reset} = useScatterFilterTemporal();
const {from, to} = useTemporalThresholds();

useRefProvide(InjectionKey.indicatorsFilterFrom, from);
useRefProvide(InjectionKey.indicatorsFilterTo, to);
</script>

<template>
  <div>
    <AppInput
      :class="$style.input"
      :disabled="!hasIndicator"
      :handle-enter="filter"
      :injection-key="InjectionKey.indicatorsFilterFrom"
      :step="0.1"
      placeholder="From"
      size="small"
      type="number"
    />

    <AppInput
      :class="$style.input"
      :disabled="!hasIndicator"
      :handle-enter="filter"
      :injection-key="InjectionKey.indicatorsFilterTo"
      placeholder="To"
      size="small"
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
  </div>
</template>

<style lang="scss" module>
.input {
  width: 9em;
}
</style>
