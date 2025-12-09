<template>
  <div :class="$style.container">
    <slot />
  </div>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';

.container {
  display: grid;
  gap: sizes.$p0;
  grid-template-columns: sizes.$p0 * 11 1fr;
  width: 100%;
}

h2 {
  align-items: center;
  display: flex;
  font-size: 0.98em;
  justify-content: flex-start;
}
</style>
