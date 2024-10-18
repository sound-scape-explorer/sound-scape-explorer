<template>
  <div class="appDraggableMenuContainer">
    <slot />
  </div>
</template>

<style lang="scss">
.appDraggableMenuContainer {
  display: grid;
  gap: $p0;
  width: 100%;
  grid-template-columns: $p0 * 11 1fr;
}

h2 {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.98em;
}
</style>
