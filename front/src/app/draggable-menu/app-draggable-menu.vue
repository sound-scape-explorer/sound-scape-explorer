<template>
  <div :class="$style.container">
    <slot />
  </div>
</template>

<style lang="scss" module>
.container {
  display: grid;
  width: 100%;
  gap: $p0;
  grid-template-columns: $p0 * 11 1fr;
}

h2 {
  font-size: 0.98em;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>
