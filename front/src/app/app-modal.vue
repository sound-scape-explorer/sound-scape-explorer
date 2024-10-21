<script lang="ts" setup>
interface Props {
  isWait?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isWait: false,
});
</script>

<template>
  <div :class="[$style.container, {[$style.wait]: props.isWait}]">
    <slot />
  </div>
</template>

<style lang="scss" module>
.container {
  position: fixed;
  z-index: $app-modal-layer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-bottom: $p0;
  padding: 0 $p0;
  user-select: none;
  animation: fade-in 0.6s ease-in-out;
  background: $black;
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
