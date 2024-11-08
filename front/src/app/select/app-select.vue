<script lang="ts" setup>
import {NSelect, NSpace} from 'naive-ui';
import AppTooltip from 'src/app/app-tooltip.vue';
import {InjectionKey} from 'src/common/injection-key';
import {useRefInject} from 'src/composables/use-ref-inject';
import {type NaiveSize} from 'src/types';
import {convertToNaiveSelectOptions} from 'src/utils/naive';
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
const hasTooltip = computed<boolean>(() => typeof props?.tooltip === 'string');
</script>

<template>
  <NSpace vertical>
    <AppTooltip
      v-if="hasTooltip"
      :placement="props.tooltipPlacement"
    >
      <template #body>
        <NSelect
          v-model:value="model"
          :default-value="props.options[defaultOptionIndex ?? 0]"
          :disabled="props.disabled"
          :options="options"
          :placeholder="props.placeholder ?? undefined"
          :size="props.size"
        />
      </template>
      <template #tooltip>{{ props.tooltip }}</template>
    </AppTooltip>

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
