<script lang="ts" setup>
import {NInput, NInputNumber, NSpace} from 'naive-ui';
import AppTooltip from 'src/app/app-tooltip.vue';
import {useGlobalKeyboard} from 'src/composables/use-global-keyboard';
import {TIMEOUT} from 'src/constants';
import {type NaiveSize} from 'src/types';
import {computed} from 'vue';

interface Props {
  placeholder?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  align?: 'center' | 'left' | 'right';
  size?: NaiveSize;
  tooltip?: string;
  tooltipPlacement?: 'right' | 'left' | 'top' | 'bottom';
  handleEnter?: () => void;
  throttle?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  disabled: false,
  align: 'center',
  size: 'tiny',
  handleEnter: () => undefined,
  throttle: false,
});

const {lock, unlock} = useGlobalKeyboard();
const hasTooltip = computed(() => typeof props?.tooltip === 'string');
const model = defineModel<string | number | null>();

let t: null | number = null;

const handleChange = <T>(newInput: T) => {
  if (t) {
    clearTimeout(t);
    t = null;
  }

  if (typeof newInput !== 'number' || typeof newInput !== 'string') {
    return;
  }

  const timeout = props.throttle ? TIMEOUT : 0;

  t = window.setTimeout(() => {
    model.value = newInput;
  }, timeout);
};
</script>

<template>
  <NSpace vertical>
    <AppTooltip
      v-if="hasTooltip"
      :placement="props.tooltipPlacement"
    >
      <template #body>
        <NInputNumber
          v-if="typeof model === 'number'"
          v-model:value="model"
          :class="{
            [$style.center]: props.align === 'center',
            [$style.left]: props.align === 'left',
            [$style.right]: props.align === 'right',
          }"
          :disabled="props.disabled"
          :max="props.max"
          :min="props.min"
          :on-update:value="handleChange"
          :placeholder="props.placeholder"
          :size="props.size"
          :step="props.step"
          @blur="unlock"
          @focus="lock"
          @keyup.enter="props.handleEnter"
        />
        <NInput
          v-if="typeof model === 'string'"
          v-model:value="model"
          :class="{
            [$style.center]: props.align === 'center',
            [$style.left]: props.align === 'left',
            [$style.right]: props.align === 'right',
          }"
          :disabled="props.disabled"
          :placeholder="props.placeholder"
          :size="props.size"
          @blur="unlock"
          @focus="lock"
          @update:value="handleChange"
          @keyup.enter="props.handleEnter"
        />
      </template>

      <template #tooltip>
        <span>{{ props.tooltip ?? '' }}</span>
      </template>
    </AppTooltip>

    <NInputNumber
      v-if="typeof model === 'number' && !hasTooltip"
      v-model:value="model"
      :class="{
        [$style.center]: props.align === 'center',
        [$style.left]: props.align === 'left',
        [$style.right]: props.align === 'right',
      }"
      :disabled="props.disabled"
      :max="props.max"
      :min="props.min"
      :placeholder="props.placeholder"
      :size="props.size"
      :step="props.step ?? 1"
      @blur="unlock"
      @focus="lock"
      @update:value="handleChange"
      @keyup.enter="props.handleEnter"
    />

    <NInput
      v-if="typeof model === 'string' && !hasTooltip"
      v-model:value="model"
      :class="{
        [$style.center]: props.align === 'center',
        [$style.left]: props.align === 'left',
        [$style.right]: props.align === 'right',
      }"
      :disabled="props.disabled"
      :placeholder="props.placeholder"
      :size="props.size"
      @blur="unlock"
      @focus="lock"
      @update:value="handleChange"
      @keyup.enter="props.handleEnter"
    />
  </NSpace>
</template>

<style lang="scss" module>
.center {
  text-align: center;
}

.left {
  text-align: left;
}

.right {
  text-align: right;
}
</style>
