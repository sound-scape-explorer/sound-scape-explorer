<script lang="ts" setup="">
const appTitle = 'SSE';
const appVersion = import.meta.env.VITE_SSE_VERSION || '';
</script>

<template>
  <div class="container">
    <div class="row">
      <span>{{ appTitle }}</span>
      <span>{{ appVersion }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  position: absolute;
  bottom: 0;

  width: 100%;
  padding: 0.1rem 0.3rem;

  font-size: 0.7rem;
  user-select: none;
}

.row {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
</style>
