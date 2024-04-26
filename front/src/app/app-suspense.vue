<script lang="ts" setup="">
import {useScatterClick} from 'src/scatter/scatter-click';

const {hasClicked} = useScatterClick();
</script>

<template>
  <div
    v-if="!hasClicked"
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
