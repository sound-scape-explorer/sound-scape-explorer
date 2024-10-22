<script lang="ts" setup="">
import {NSwitch} from 'naive-ui';
import {type InjectionKey} from 'src/common/injection-key';
import {useRefInject} from 'src/composables/use-ref-inject';

interface Props {
  injectionKey: InjectionKey;
  checked: string;
  unchecked: string;
  disabled?: boolean;
  native?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  native: false,
});

const model = useRefInject(props.injectionKey);
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
$t: 0.76;

.custom {
  margin-right: -$g0 - $p0;
  transform: translate3d(-$p0 + 2px, 0, 0) scale3d($t, $t, $t);
}
</style>
