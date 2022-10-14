<script lang="ts" setup>
import {defineProps} from 'vue';
import {NImage, NP} from 'naive-ui';

/**
 * Props
 */

interface Props {
  source?: string;
}

const {source} = defineProps<Props>();
</script>

<template>
  <n-p class="image-container">
    <n-image :src="source" />
  </n-p>
</template>

<style lang="scss" scoped>
.image-container {
  display: flex;
  justify-content: center;
}
</style>
