<script lang="ts" setup>
interface Props {
  isWait?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isWait: false,
});
</script>

<template>
  <div
    :class="{wait: props.isWait}"
    class="container"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;

  width: 100%;
  height: 100%;

  padding: 0 $p0;
  margin-bottom: $p0;

  z-index: $appModalLayer;

  background: $black;

  user-select: none;

  animation: FadeIn 0.6s ease-in-out;
}

.wait {
  cursor: wait;
}

@keyframes FadeIn {
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

@keyframes FadeOut {
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
