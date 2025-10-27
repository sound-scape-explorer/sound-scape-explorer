<script lang="ts" setup>
import AppButton from 'src/app/app-button.vue';
import AppInput from 'src/app/input/app-input.vue';
import {useScatterFilterTemporal} from 'src/components/scatter/use-scatter-filter-temporal';
import {useDraggableTemporal} from 'src/draggables/temporal/use-draggable-temporal';
import {useTemporalThresholds} from 'src/draggables/temporal/use-temporal-thresholds';

const {hasExtractor} = useDraggableTemporal();
const {filter, reset} = useScatterFilterTemporal();
const {fromString, toString} = useTemporalThresholds();
</script>

<template>
  <div>
    <AppInput
      v-model="fromString"
      :class="$style.input"
      :disabled="!hasExtractor"
      :handle-enter="filter"
      placeholder="From"
      size="small"
    />

    <AppInput
      v-model="toString"
      :class="$style.input"
      :disabled="!hasExtractor"
      :handle-enter="filter"
      placeholder="To"
      size="small"
    />

    <AppButton
      :disabled="!hasExtractor"
      :handle-click="filter"
      size="small"
    >
      Apply
    </AppButton>

    <AppButton
      :disabled="!hasExtractor"
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
