<script lang="ts" setup="">
import {NSwitch} from 'naive-ui';
import {type InjectionKey} from 'src/common/injection-key';
import {useRefInject} from 'src/composables/use-ref-inject';

interface Props {
  injectionKey: InjectionKey;
  checked: string;
  unchecked: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const model = useRefInject(props.injectionKey);
</script>

<template>
  <NSwitch
    v-model:value="model"
    :disabled="props.disabled"
    class="switch"
    size="small"
  >
    <template #checked>{{ checked }}</template>
    <template #unchecked>{{ unchecked }}</template>
  </NSwitch>
</template>

<style lang="scss" scoped>
$t: 0.76;
.switch {
  transform: translate3d(-$p0 + 2px, 0, 0) scale3d($t, $t, $t);
  margin-right: -$g0 - $p0;
}
</style>
