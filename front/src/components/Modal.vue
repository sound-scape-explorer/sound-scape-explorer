<script lang="ts" setup>
//
</script>

<template>
  <div class="container">
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

  padding: 0 1rem;
  margin-bottom: 1rem;

  z-index: 100;

  background: rgba(0, 0, 0, 0.7);

  user-select: none;

  animation: FadeIn 1s ease-in-out;
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
