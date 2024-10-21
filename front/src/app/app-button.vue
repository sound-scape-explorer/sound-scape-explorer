<script lang="ts" setup="">
import {NButton, NIcon, NTooltip} from 'naive-ui';
import {type NaiveSize} from 'src/types';
import {computed} from 'vue';

interface Props {
  size?: NaiveSize;
  handleClick: () => void;
  tooltip?: string;
  tooltipPlacement?: 'right' | 'left' | 'top' | 'bottom';
  disabled?: boolean;
  icon?: boolean;
  grow?: boolean;
  growCol?: boolean;
  active?: boolean;
  error?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'tiny',
  disable: false,
  icon: false,
  grow: false,
  growCol: false,
  active: false,
  error: false,
});

const hasTooltip = computed(() => typeof props?.tooltip === 'string');

const handleFocus = (e: FocusEvent) => {
  const target = e.target as HTMLButtonElement;
  target.blur();
};
</script>

<template>
  <NTooltip
    v-if="hasTooltip"
    :placement="props.tooltipPlacement"
    trigger="hover"
  >
    <!--suppress VueUnrecognizedSlot -->
    <template #trigger>
      <NButton
        :class="{
          [$style.grow]: props.grow,
          [$style['grow-col']]: props.growCol,
          [$style.active]: props.active,
          [$style.error]: props.error,
        }"
        :disabled="props.disabled"
        :size="props.size"
        @click="props.handleClick"
        @focus="handleFocus"
      >
        <NIcon v-if="props.icon">
          <slot />
        </NIcon>
        <slot v-if="!props.icon" />
      </NButton>
    </template>
    <span>{{ props.tooltip }}</span>
  </NTooltip>

  <NButton
    v-if="!hasTooltip"
    :class="{
      [$style.grow]: props.grow,
      [$style['grow-col']]: props.growCol,
      [$style.active]: props.active,
      [$style.error]: props.error,
    }"
    :disabled="props.disabled"
    :size="props.size"
    @click="props.handleClick"
    @focus="handleFocus"
  >
    <NIcon v-if="props.icon">
      <slot />
    </NIcon>
    <slot v-if="!props.icon" />
  </NButton>
</template>

<style lang="scss" module>
.grow {
  flex: 1;
}

.grow-col {
  width: 100%;
}

.error {
  background: $red;
}

.active {
  background: $olive;
}
</style>
