<script lang="ts" setup="">
import {NTooltip} from 'naive-ui';
import {TIMEOUT} from 'src/constants';
import {ref} from 'vue';
// @ts-expect-error underlying dependency of naive-ui
// noinspection TypeScriptCheckImport
import {type Placement} from 'vueuc/lib/binder/src/interface';

interface Props {
  placement?: Placement;
}

let t: number | null = null;

const props = withDefaults(defineProps<Props>(), {placement: 'left'});

const show = ref<boolean>(false);

const handleMouseEnter = () => {
  clear();

  t = setTimeout(() => {
    show.value = true;
  }, TIMEOUT * 2);
};

const handleMouseLeave = () => {
  clear();
  show.value = false;
};

const clear = () => {
  if (t) {
    clearTimeout(t);
    t = null;
  }
};
</script>

<template>
  <NTooltip
    :placement="props.placement"
    :show="show"
    trigger="manual"
  >
    <!--suppress VueUnrecognizedSlot -->
    <template #trigger>
      <div
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <slot name="body" />
      </div>
    </template>

    <slot name="tooltip" />
  </NTooltip>
</template>
