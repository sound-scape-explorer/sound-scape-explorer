<script lang="ts" setup=""></script>

<template>
  <div class="app-draggable-sidebar__container">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.app-draggable-sidebar__container {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: $g0;
  height: 0;
  margin-left: -$p0 * 4;
  transform: translate3d(0, -$g0, 0);
}
</style>
