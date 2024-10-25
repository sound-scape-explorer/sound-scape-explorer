<script lang="ts" setup="">
import {NDatePicker} from 'naive-ui';
import AppSelect from 'src/app/select/app-select.vue';
import {InjectionKey} from 'src/common/injection-key';
import {useCalendarRange} from 'src/components/timeline/use-calendar-range';
import {useRefProvide} from 'src/composables/use-ref-provide';
import {useStorageRanges} from 'src/composables/use-storage-ranges';
import {generateUniqueRangeSlug} from 'src/utils/generate-unique-range-slug';
import {computed, onMounted, ref, watch} from 'vue';

const {start, end, left, right} = useCalendarRange();
const {ranges} = useStorageRanges();
const names = computed(
  () => ranges.value?.map((r) => generateUniqueRangeSlug(r)) ?? [],
);

const name = ref<string>(names.value[0]);

const handleRangeUpdate = () => {
  if (ranges.value === null) {
    return;
  }

  const results = ranges.value.filter(
    (r) => generateUniqueRangeSlug(r) === name.value,
  );

  if (results.length !== 1) {
    throw new Error('Could not find range');
  }

  const result = results[0];

  start.value = result.start;
  end.value = result.end;
  left.value = start.value;
  right.value = end.value;
};

const setLeft = (e) => {
  left.value = e;
};

const setRight = (e) => {
  right.value = e;
};

useRefProvide(InjectionKey.calendarRange, name);

onMounted(handleRangeUpdate);
watch(name, handleRangeUpdate);
</script>

<template>
  <div :class="$style.container">
    <AppSelect
      :class="$style.select"
      :injection-key="InjectionKey.calendarRange"
      :options="names"
    />

    <NDatePicker
      :class="$style.date"
      :on-update:value="setLeft"
      :value="left"
      size="tiny"
      type="datetime"
    />

    <NDatePicker
      :class="$style.date"
      :on-update:value="setRight"
      :value="right"
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
  width: 100%;
  gap: $p0;
}

.select {
  width: 100%;
}

.date {
  width: max($p0 * 48, 40%);
}
</style>
