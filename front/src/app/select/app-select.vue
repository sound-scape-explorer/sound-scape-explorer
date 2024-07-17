<script lang="ts" setup>
import {NSelect, NSpace, NTooltip} from 'naive-ui';
import type {InjectionKey} from 'src/common/injection-key';
import {useRefInject} from 'src/composables/use-ref-inject';
import type {NaiveSize} from 'src/types';
import {convertToNaiveSelectOptions} from 'src/utils/convert-to-naive-select-options';
import {computed} from 'vue';

interface Props {
  injectionKey: InjectionKey;
  options: string[];
  defaultOptionIndex?: number;
  size?: NaiveSize;
  tooltip?: string;
  tooltipPlacement?: 'right' | 'left' | 'top' | 'bottom';
  disabled?: boolean;
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'tiny',
  disabled: false,
});

const model = useRefInject(props.injectionKey);
const options = computed(() => convertToNaiveSelectOptions(props.options));
const hasTooltip = computed<boolean>(() => typeof props.tooltip === 'string');
</script>

<template>
  <NSpace vertical>
    <NTooltip
      v-if="hasTooltip"
      :placement="props.tooltipPlacement"
      trigger="hover"
    >
      <!--suppress VueUnrecognizedSlot -->
      <template #trigger>
        <NSelect
          v-model:value="model"
          :default-value="props.options[defaultOptionIndex ?? 0]"
          :disabled="props.disabled"
          :options="options"
          :placeholder="props.placeholder ?? undefined"
          :size="props.size"
        />
      </template>
      <span>{{ props.tooltip }}</span>
    </NTooltip>

    <NSelect
      v-if="!hasTooltip"
      v-model:value="model"
      :default-value="props.options[defaultOptionIndex ?? 0]"
      :disabled="props.disabled"
      :options="options"
      :placeholder="props.placeholder ?? undefined"
      :size="props.size"
    />
  </NSpace>
</template>
