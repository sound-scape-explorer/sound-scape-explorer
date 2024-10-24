<script lang="ts" setup="">
import {NDatePicker} from 'naive-ui';
import {useTimelineRange} from 'src/components/timeline/use-timeline-range';

const {start, end} = useTimelineRange();

const handleStart = () => {
  console.log('handle start');
};
</script>

<template>
  <div :class="$style.container">
    <NDatePicker
      :on-update:value="handleStart"
      :value="start"
      size="tiny"
      type="datetime"
    />

    <NDatePicker
      :on-update:value="handleStart"
      :value="end"
      size="tiny"
      type="datetime"
    />
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $p0;
}
</style>
