<script lang="ts" setup>
import {useThemeColors} from 'src/composables/use-theme-colors';

interface Props {
  isWait?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isWait: false,
});

const {colors} = useThemeColors();
</script>

<template>
  <div :class="[$style.container, {[$style.wait]: props.isWait}]">
    <slot />
  </div>
</template>

<style lang="scss" module>
@use 'src/styles/layers';
@use 'src/styles/sizes';

.container {
  position: fixed;
  z-index: layers.$app-modal-layer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-bottom: sizes.$p0;
  padding: 0 sizes.$p0;
  user-select: none;
  animation: fade-in 0.6s ease-in-out;
  background: v-bind('colors.baseColor');
}

.wait {
  cursor: wait;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes fade-out {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>
