<script lang="ts" setup>
import {useThemeColors} from 'src/composables/use-theme-colors';
import {computed} from 'vue';

const {colors} = useThemeColors();

interface Props {
  color?: 'actionColor' | 'pressedColor' | 'errorColor';
}

const props = withDefaults(defineProps<Props>(), {
  color: 'actionColor',
});

const color = computed(() => `${colors.value[props.color]}`);
</script>

<template>
  <div :class="$style.container">
    <slot />
  </div>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';

.container {
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  padding: sizes.$g0 sizes.$p0;
  border-radius: sizes.$g0;
  background: v-bind('color');
}
</style>
