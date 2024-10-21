<script lang="ts" setup="">
import {ref} from 'vue';

const start = ref<HTMLInputElement>();
const end = ref<HTMLInputElement>();
</script>

<template>
  <div :class="$style.container">
    <input
      ref="start"
      placeholder="start"
    />
    <input
      ref="end"
      placeholder="end"
    />
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: $p0;
  gap: $g0;

  & > input {
    width: $p0 * 14;
    text-align: center;
    border: 1px solid $olive;
    background: $white-opaque;
  }
}
</style>
