<script lang="ts" setup="">
import {clickedRef} from '.././Scatter/useScatterClick';
</script>

<template>
  <div
    v-if="clickedRef.value === null"
    class="suspense"
  >
    Please select a point.
  </div>
</template>

<style lang="scss" scoped>
.suspense {
  font-style: italic;
}
</style>
