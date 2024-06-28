<script lang="ts" setup>
import {NInput, NInputNumber, NSpace, NTooltip} from 'naive-ui';
import {useKeyboard} from 'src/composables/keyboard';
import {computed, withDefaults} from 'vue';

interface Props {
  placeholder?: string;
  step?: number;
  tooltip?: string;
  type: 'number' | 'string';
}

const props = withDefaults(defineProps<Props>(), {type: 'number'});

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
          :placeholder="props.placeholder ?? ''"
          :step="props.step ?? 1"
          size="tiny"
          @blur="unlock"
          @focus="lock"
        />
        <NInput
          v-if="!isNumber"
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
      :placeholder="props.placeholder ?? ''"
      :step="props.step ?? 1"
      size="tiny"
      @blur="unlock"
      @focus="lock"
    />

    <NInput
      v-if="!hasTooltip && !isNumber"
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
