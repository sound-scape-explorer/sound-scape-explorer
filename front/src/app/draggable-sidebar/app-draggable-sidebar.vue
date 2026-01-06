<script lang="ts" setup></script>

<template>
  <div :class="$style.container">
    <slot />
  </div>
</template>

<style lang="scss" module>
@use 'src/styles/sizes';

.container {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
  height: 0;
  margin-left: -(sizes.$p0) * 4;
  transform: translate3d(0, -(sizes.$g0), 0);
  gap: sizes.$g0;
}
</style>
