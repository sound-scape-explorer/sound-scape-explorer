<template>
  <h2 :class="$style.title">
    <slot />
  </h2>
</template>

<style lang="scss" module>
.title {
  font-weight: bold;
}
</style>
