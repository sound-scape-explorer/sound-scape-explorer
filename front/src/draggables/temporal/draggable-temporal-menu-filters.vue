<script lang="ts" setup>
import AppButton from 'src/app/app-button.vue';
import AppInput from 'src/app/input/app-input.vue';
import {useScatterFilterTemporal} from 'src/components/scatter/use-scatter-filter-temporal';
import {useDraggableTemporal} from 'src/draggables/temporal/use-draggable-temporal';
import {useTemporalThresholds} from 'src/draggables/temporal/use-temporal-thresholds';

const {hasIndicator} = useDraggableTemporal();
const {filter, reset} = useScatterFilterTemporal();
const {from, to} = useTemporalThresholds();
</script>

<template>
  <div>
    <AppInput
      v-model="from"
      :class="$style.input"
      :disabled="!hasIndicator"
      :handle-enter="filter"
      :step="0.1"
      placeholder="From"
      size="small"
    />

    <AppInput
      v-model="to"
      :class="$style.input"
      :disabled="!hasIndicator"
      :handle-enter="filter"
      placeholder="To"
      size="small"
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
