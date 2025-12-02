<script lang="ts" setup>
import {NDatePicker} from 'naive-ui';
import {useTimezone} from 'src/composables/use-timezone';
import {computed} from 'vue';

interface Props {
  handleClick: (newValue: number) => void;
}

const props = defineProps<Props>();
const model = defineModel<number>();

const {tz} = useTimezone();

const displayValue = computed(() => {
  if (!model.value) {
    return model.value;
  }

  const utcDate = new Date(model.value);

  const localDateString = utcDate.toLocaleString('en-US', {
    timeZone: tz.value,
  });
  const localDate = new Date(localDateString);

  const offset = localDate.getTime() - utcDate.getTime();
  return model.value + offset;
});

const handleUpdate = (newValue: number | null) => {
  if (newValue === null) {
    return;
  }

  const localDate = new Date(newValue);

  // Interpret the selected timestamp as being in the target timezone
  const localDateString = localDate.toLocaleString('en-US', {
    timeZone: tz.value,
  });
  const interpretedLocal = new Date(localDateString);

  // Calculate offset and convert to UTC
  const offset = interpretedLocal.getTime() - localDate.getTime();
  const utcTimestamp = newValue - offset;

  props.handleClick(utcTimestamp);
};
</script>

<template>
  <NDatePicker
    :class="$style.date"
    :on-update:value="handleUpdate"
    :value="displayValue"
    size="tiny"
    type="datetime"
  />
</template>

<style lang="scss" module>
.date {
  width: 100%;
}
</style>
