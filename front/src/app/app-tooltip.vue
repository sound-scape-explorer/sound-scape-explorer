<script lang="ts" setup="">
import {NTooltip} from 'naive-ui';
import {TIMEOUT} from 'src/constants';
import {type NaiveTooltipPlacement} from 'src/types';
import {ref} from 'vue';

interface Props {
  placement?: NaiveTooltipPlacement;
  native?: boolean;
}

let t: number | null = null;

const props = withDefaults(defineProps<Props>(), {
  placement: 'left',
  native: false,
});

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
    :show="props.native ? undefined : show"
    :trigger="props.native ? 'hover' : 'manual'"
  >
    <!--suppress VueUnrecognizedSlot -->
    <template #trigger>
      <div v-if="props.native">
        <slot name="body" />
      </div>

      <div
        v-if="!props.native"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <slot name="body" />
      </div>
    </template>

    <slot name="tooltip" />
  </NTooltip>
</template>
