<script lang="ts" setup="">
import {scatterSelectedStore} from '../Scatter/scatterStore';
</script>

<template>
  <div
    v-if="scatterSelectedStore.index === null"
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
