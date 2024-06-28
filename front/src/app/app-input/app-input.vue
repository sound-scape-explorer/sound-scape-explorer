<script lang="ts" setup>
import {NInputNumber, NSpace, NTooltip} from 'naive-ui';
import {useKeyboard} from 'src/composables/keyboard';
import {computed} from 'vue';

interface Props {
  placeholder?: string;
  step?: number;
  tooltip?: string;
}

const props = defineProps<Props>();

const {lock, unlock} = useKeyboard();
const hasTooltip = computed(() => typeof props.tooltip !== 'undefined');
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
          :placeholder="props.placeholder ?? ''"
          :step="props.step ?? 1"
          size="tiny"
          @blur="unlock"
          @focus="lock"
        />
      </template>
      <span>{{ props.tooltip ?? '' }}</span>
    </NTooltip>

    <NInputNumber
      v-if="!hasTooltip"
      :placeholder="props.placeholder ?? ''"
      :step="props.step ?? 1"
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
