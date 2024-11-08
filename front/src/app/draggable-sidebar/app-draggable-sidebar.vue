<script lang="ts" setup=""></script>

<template>
  <div :class="$style.container">
    <slot />
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
  height: 0;
  margin-left: -$p0 * 4;
  transform: translate3d(0, -$g0, 0);
  gap: $g0;
}
</style>
