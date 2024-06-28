<script lang="ts" setup>
import {NInput, NInputNumber, NSpace, NTooltip} from 'naive-ui';
import {type InjectionKey} from 'src/common/injection-key';
import {useKeyboard} from 'src/composables/keyboard';
import {useRefInject} from 'src/composables/ref-inject';
import {computed, withDefaults} from 'vue';

interface Props {
  placeholder?: string;
  step?: number;
  tooltip?: string;
  type?: 'number' | 'string';
  injectionKey: InjectionKey;
}

const props = withDefaults(defineProps<Props>(), {type: 'string'});
const model = useRefInject(props.injectionKey);

const {lock, unlock} = useKeyboard();
const hasTooltip = computed(() => typeof props.tooltip !== 'undefined');
const isNumber = computed(() => props.type === 'number');
</script>

<template>
  <NSpace vertical>
    <NTooltip
      v-if="hasTooltip"
      trigger="hover"
    >
      <!--suppress VueUnrecognizedSlot -->
      <template #trigger>
        <NInputNumber
          v-if="isNumber"
          v-model:value="model"
          :placeholder="props.placeholder ?? ''"
          :step="props.step ?? 1"
          size="tiny"
          @blur="unlock"
          @focus="lock"
        />
        <NInput
          v-if="!isNumber"
          v-model:value="model"
          :placeholder="props.placeholder ?? ''"
          size="tiny"
          @blur="unlock"
          @focus="lock"
        />
      </template>
      <span>{{ props.tooltip ?? '' }}</span>
    </NTooltip>

    <NInputNumber
      v-if="!hasTooltip && isNumber"
      v-model:value="model"
      :placeholder="props.placeholder ?? ''"
      :step="props.step ?? 1"
      size="tiny"
      @blur="unlock"
      @focus="lock"
    />

    <NInput
      v-if="!hasTooltip && !isNumber"
      v-model:value="model"
      :placeholder="props.placeholder ?? ''"
      size="tiny"
      @blur="unlock"
      @focus="lock"
    />
  </NSpace>
</template>

<style lang="scss" scoped>
.input {
  text-align: center;
}
</style>
