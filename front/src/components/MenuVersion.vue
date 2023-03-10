<script lang="ts" setup="">
const appVersion = import.meta.env.VITE_SSE_VERSION || '';
</script>

<template>
  <div class="container">
    <span>{{ appVersion }}</span>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  bottom: 0;

  width: calc(100% - 3px);
  height: 2rem;

  margin: 0 0 1px 1px;

  font-size: 0.7rem;
  user-select: none;

  outline: 1px solid black;

  span {
    transform: translateY(1px);
  }
}
</style>
