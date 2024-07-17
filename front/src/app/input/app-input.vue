<script lang="ts" setup>
import {NInput, NInputNumber, NSpace, NTooltip} from 'naive-ui';
import {type InjectionKey} from 'src/common/injection-key';
import {useGlobalKeyboard} from 'src/composables/use-global-keyboard';
import {useRefInject} from 'src/composables/use-ref-inject';
import {computed} from 'vue';

interface Props {
  placeholder?: string;
  type?: 'number' | 'string';
  injectionKey: InjectionKey;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  align?: 'center' | 'left' | 'right';
  size?: 'tiny' | 'small';
  tooltip?: string;
  tooltipPlacement?: 'right' | 'left' | 'top' | 'bottom';
  handleEnter?: () => void;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'string',
  placeholder: '',
  disabled: false,
  align: 'center',
  size: 'tiny',
  handleEnter: () => undefined,
});

const {lock, unlock} = useGlobalKeyboard();
const hasTooltip = computed(() => typeof props?.tooltip === 'string');
const isNumber = computed(() => props.type === 'number');
const isString = computed(() => props.type === 'string');
const model = useRefInject(props.injectionKey);

const classNames = computed<string>(() => {
  switch (props.align) {
    case 'center': {
      return 'app-input__center';
    }
    case 'left': {
      return 'app-input__left';
    }
    case 'right': {
      return 'app-input__right';
    }
  }
});
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
          v-model:value="model"
          :class="classNames"
          :disabled="props.disabled"
          :max="props.max"
          :min="props.min"
          :placeholder="props.placeholder"
          :size="props.size"
          :step="props.step"
          @blur="unlock"
          @focus="lock"
          @keyup.enter="props.handleEnter"
        />
        <NInput
          v-if="isString"
          v-model:value="model"
          :class="classNames"
          :disabled="props.disabled"
          :placeholder="props.placeholder"
          :size="props.size"
          @blur="unlock"
          @focus="lock"
          @keyup.enter="props.handleEnter"
        />
      </template>
      <span>{{ props.tooltip ?? '' }}</span>
    </NTooltip>

    <NInputNumber
      v-if="!hasTooltip && isNumber"
      v-model:value="model"
      :class="classNames"
      :disabled="props.disabled"
      :max="props.max"
      :min="props.min"
      :placeholder="props.placeholder"
      :size="props.size"
      :step="props.step ?? 1"
      @blur="unlock"
      @focus="lock"
      @keyup.enter="props.handleEnter"
    />

    <NInput
      v-if="!hasTooltip && isString"
      v-model:value="model"
      :class="classNames"
      :disabled="props.disabled"
      :placeholder="props.placeholder"
      :size="props.size"
      @blur="unlock"
      @focus="lock"
      @keyup.enter="props.handleEnter"
    />
  </NSpace>
</template>

<style lang="scss" scoped>
.app-input__center {
  text-align: center;
}

.app-input__left {
  text-align: left;
}

.app-input__right {
  text-align: right;
}
</style>
