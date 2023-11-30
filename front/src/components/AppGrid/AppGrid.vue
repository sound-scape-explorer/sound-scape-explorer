<script lang="ts" setup>
import {NGi, NGrid, NTag} from 'naive-ui';

interface AppGridItem {
  tag: string;
  value: string;
  color?: string;
}

interface AppGridProps {
  columns: number;
  items: AppGridItem[];
}

const props = defineProps<AppGridProps>();
</script>

<template>
  <n-grid
    :cols="props.columns"
    x-gap="12"
  >
    <n-gi
      v-for="item in props.items"
      class="gi"
    >
      <n-tag
        :bordered="false"
        :style="{backgroundColor: item.color ?? ''}"
        size="small"
      >
        {{ item.tag }}
      </n-tag>
      {{ item.value }}
    </n-gi>
  </n-grid>
</template>

<style lang="scss" scoped>
.gi {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
}
</style>
