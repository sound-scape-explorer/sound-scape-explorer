<script lang="ts" setup>
import {NInput, NInputNumber, NSpace, NTooltip} from 'naive-ui';
import {type InjectionKey} from 'src/common/injection-key';
import {useGlobalKeyboard} from 'src/composables/use-global-keyboard';
import {useRefInject} from 'src/composables/use-ref-inject';
import {TIMEOUT} from 'src/constants';
import {type NaiveSize} from 'src/types';
import {computed, onMounted, ref, watch} from 'vue';

interface Props {
  placeholder?: string;
  type?: 'number' | 'string';
  injectionKey: InjectionKey;
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
  type: 'string',
  placeholder: '',
  disabled: false,
  align: 'center',
  size: 'tiny',
  handleEnter: () => undefined,
  throttle: false,
});

const {lock, unlock} = useGlobalKeyboard();
const hasTooltip = computed(() => typeof props?.tooltip === 'string');
const isNumber = computed(() => props.type === 'number');
const isString = computed(() => props.type === 'string');
const model = useRefInject(props.injectionKey);
const copy = ref();

let t: null | number = null;

const handleChange = (newInput: number | null) => {
  if (t) {
    clearTimeout(t);
    t = null;
  }

  if (newInput === null) {
    return;
  }

  const timeout = props.throttle ? TIMEOUT : 0;

  t = setTimeout(() => {
    model.value = newInput;
  }, timeout);
};

const sync = () => {
  if (model.value === copy.value) {
    return;
  }

  copy.value = model.value;
};

onMounted(sync);
watch(model, sync);
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
        <NInputNumber
          v-if="isNumber"
          v-model:value="copy"
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
          :step="props.step"
          @blur="unlock"
          @focus="lock"
          @update:value="handleChange as unknown"
          @keyup.enter="props.handleEnter"
        />
        <NInput
          v-if="isString"
          v-model:value="copy"
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
          @update:value="handleChange as unknown"
          @keyup.enter="props.handleEnter"
        />
      </template>
      <span>{{ props.tooltip ?? '' }}</span>
    </NTooltip>

    <NInputNumber
      v-if="!hasTooltip && isNumber"
      v-model:value="copy"
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
      @update:value="handleChange as unknown"
      @keyup.enter="props.handleEnter"
    />

    <NInput
      v-if="!hasTooltip && isString"
      v-model:value="copy"
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
      @update:value="handleChange as unknown"
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
