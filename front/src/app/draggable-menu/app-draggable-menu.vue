<script lang="ts" setup></script>

<template>
  <div class="app-draggable-menu__container">
    <div class="app-draggable-menu__form">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.app-draggable-menu__container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  gap: 0.5rem;

  min-width: 20rem;
}

.app-draggable-menu__form {
  display: grid;
  grid-template-columns: 3rem 1fr;
  gap: 0.5rem;
  width: 100%;
}

.app-draggable-menu__row {
  display: grid;
  grid-template-columns: 1fr 4rem 1fr;
  gap: 0.5rem;
}

.app-draggable-menu__full {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.app-draggable-menu__item {
  display: flex;
  justify-content: center;
}
</style>
