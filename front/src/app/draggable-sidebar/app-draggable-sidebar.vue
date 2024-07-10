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

  gap: 2px;

  height: 0;

  margin-left: -2rem;

  transform: translate3d(0, -10px, 0);
}
</style>
