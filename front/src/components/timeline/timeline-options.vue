<script lang="ts" setup="">
import {NDatePicker} from 'naive-ui';
import AppButton from 'src/app/app-button.vue';
import AppDraggableMenu from 'src/app/draggable-menu/app-draggable-menu.vue';
import AppSelect from 'src/app/select/app-select.vue';
import {InjectionKey} from 'src/common/injection-key';
import {useTimelineRange} from 'src/components/timeline/use-timeline-range';
import {useTimelineRecenter} from 'src/components/timeline/use-timeline-recenter';
import {useIntervalSelector} from 'src/composables/use-interval-selector';
import {useRefProvide} from 'src/composables/use-ref-provide';
import {useStorageRanges} from 'src/composables/use-storage-ranges';
import {generateUniqueRangeSlug} from 'src/utils/config';
import {computed, onMounted, ref, watch} from 'vue';

// todo: refactor me
const {start, end, left, right, updateLeft, updateRight} = useTimelineRange();
const {ranges} = useStorageRanges();
const names = computed(
  () => ranges.value?.map((r) => generateUniqueRangeSlug(r)) ?? [],
);
const {handleRecenter} = useTimelineRecenter();
const {currentIntervalIndex} = useIntervalSelector();

const name = ref<string>();
const RANGE_SKIP = '**CUSTOM**';

const handleRangeUpdate = () => {
  if (name.value === RANGE_SKIP) {
    return;
  }

  if (ranges.value === null) {
    return;
  }

  const results = ranges.value.filter(
    (r) => generateUniqueRangeSlug(r) === name.value,
  );

  if (results.length !== 1) {
    return;
  }

  const result = results[0];

  start.value = result.start;
  end.value = result.end;
  updateLeft(start.value);
  updateRight(end.value);
};

const handleOverdrive = () => {
  start.value = left.value;
  end.value = right.value;
  name.value = RANGE_SKIP;
};

useRefProvide(InjectionKey.calendarRange, name);

onMounted(handleRangeUpdate);
watch(name, handleRangeUpdate);
watch(names, () => {
  if (!names.value || name.value) {
    return;
  }

  name.value = names.value[0];
});
</script>

<template>
  <AppDraggableMenu>
    <span>Range</span>
    <div :class="$style.row">
      <AppSelect
        :class="$style.select"
        :injection-key="InjectionKey.calendarRange"
        :options="names"
      />

      <AppButton
        :handle-click="handleOverdrive"
        tooltip="set window limits as range"
        tooltip-placement="top"
      >
        overdrive
      </AppButton>

      <AppButton
        :disabled="currentIntervalIndex === null"
        :handle-click="handleRecenter"
        tooltip="to selected interval"
        tooltip-placement="top"
      >
        recenter
      </AppButton>
    </div>

    <span>Dates</span>
    <div :class="$style.row">
      <NDatePicker
        :class="$style.date"
        :on-update:value="updateLeft"
        :value="left"
        size="tiny"
        type="datetime"
      />

      <NDatePicker
        :class="$style.date"
        :on-update:value="updateRight"
        :value="right"
        size="tiny"
        type="datetime"
      />
    </div>
  </AppDraggableMenu>
</template>

<style lang="scss" module>
.row {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: $p0;
}

.select {
  width: 100%;
}

.date {
  width: 100%;
}
</style>
