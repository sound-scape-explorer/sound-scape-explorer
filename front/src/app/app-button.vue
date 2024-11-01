<script lang="ts" setup="">
import {NButton} from 'naive-ui';
import AppTooltip from 'src/app/app-tooltip.vue';
import {type NaiveSize} from 'src/types';
import {computed} from 'vue';

interface Props {
  size?: NaiveSize;
  handleClick: () => void;
  tooltip?: string;
  tooltipPlacement?: 'right' | 'left' | 'top' | 'bottom';
  disabled?: boolean;
  grow?: boolean;
  growCol?: boolean;
  active?: boolean;
  error?: boolean;
  smallTooltip?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'tiny',
  disable: false,
  grow: false,
  growCol: false,
  active: false,
  error: false,
  smallTooltip: false,
});

const hasTooltip = computed(() => typeof props?.tooltip === 'string');

const handleFocus = (e: FocusEvent) => {
  const target = e.target as HTMLButtonElement;
  target.blur();
};
</script>

<template>
  <AppTooltip
    v-if="hasTooltip"
    :class="{[$style.tooltip]: props.smallTooltip}"
    :placement="props.tooltipPlacement"
  >
    <template #body>
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
        <slot />
      </NButton>
    </template>

    <template #tooltip>
      <span :class="{[$style.small]: props.smallTooltip}">{{
        props.tooltip
      }}</span>
    </template>
  </AppTooltip>

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
    <slot />
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

.tooltip {
  padding: $p0 !important;
}

.small {
  font-size: 0.9em;
}
</style>
