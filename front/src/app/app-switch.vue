<script lang="ts" setup>
import {NSwitch} from 'naive-ui';

interface Props {
  checked: string;
  unchecked: string;
  disabled?: boolean;
  native?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  native: false,
});

const model = defineModel<boolean>();
</script>

<template>
  <NSwitch
    v-model:value="model"
    :class="{[$style.custom]: !props.native}"
    :disabled="props.disabled"
    size="small"
  >
    <template #checked>{{ checked }}</template>
    <template #unchecked>{{ unchecked }}</template>
  </NSwitch>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';

$t: 0.76;

.custom {
  margin-right: -(sizes.$g0) - sizes.$p0;
  transform: translate3d(-(sizes.$p0) + 2px, 0, 0) scale3d($t, $t, $t);
}
</style>
