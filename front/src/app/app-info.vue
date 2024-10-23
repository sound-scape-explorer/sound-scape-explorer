<script lang="ts" setup="">
import AppTooltip from 'src/app/app-tooltip.vue';

interface Props {
  tooltip: string;
  color?: 'default' | 'active';
  handleClick?: () => void;
}

const props = withDefaults(defineProps<Props>(), {
  color: 'default',
});
</script>

<template>
  <AppTooltip :tooltip="props.tooltip">
    <div
      :class="[
        $style.info,
        {
          [$style.active]: props.color === 'active',
          [$style.clickable]: props?.handleClick,
        },
      ]"
      @click="props?.handleClick"
    >
      <slot />
    </div>
  </AppTooltip>
</template>

<style lang="scss" module>
.info {
  font-size: 0.9em;
  width: $p0 * 3;
  height: $p0 * 3;
  text-align: center;
}

.active {
  color: $emerald;
}

.clickable {
  cursor: pointer;
}
</style>
